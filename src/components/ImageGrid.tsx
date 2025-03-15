
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import JSZip from 'jszip';

interface ImageGridProps {
  zipFile: File | null;
}

interface ImageItem {
  name: string;
  displayName: string;
  url: string;
  sortOrder: number;
}

const ImageGrid: React.FC<ImageGridProps> = ({ zipFile }) => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!zipFile) {
      setImages([]);
      return;
    }

    const extractImages = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const zip = new JSZip();
        const contents = await zip.loadAsync(zipFile);
        const imageFiles: ImageItem[] = [];
        
        const processFile = async (relativePath: string, file: JSZip.JSZipObject) => {
          const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'];
          const extension = relativePath.split('.').pop()?.toLowerCase() || '';
          
          if (imageExtensions.includes(extension)) {
            const blob = await file.async('blob');
            const url = URL.createObjectURL(blob);
            
            // Get just the filename (after the last slash)
            const fullName = relativePath.split('/').pop() || '';
            
            // Extract the number from the beginning of the filename
            const numberMatch = fullName.match(/^(\d+)-/);
            const sortOrder = numberMatch ? parseInt(numberMatch[1], 10) : 999;
            
            // Create a display name without the directory part
            let displayName = fullName;
            
            // Add the image with all necessary info
            imageFiles.push({ 
              name: fullName, 
              displayName, 
              url, 
              sortOrder 
            });
          }
        };
        
        const promises: Promise<void>[] = [];
        
        contents.forEach((relativePath, file) => {
          if (!file.dir) {
            promises.push(processFile(relativePath, file));
          }
        });
        
        await Promise.all(promises);
        
        // Sort images by the extracted number
        const sortedImages = imageFiles.sort((a, b) => a.sortOrder - b.sortOrder);
        setImages(sortedImages);
      } catch (err) {
        console.error('Error extracting images from zip:', err);
        setError('Failed to extract images from the ZIP file');
      } finally {
        setIsLoading(false);
      }
    };
    
    extractImages();
    
    return () => {
      // Clean up object URLs to prevent memory leaks
      images.forEach(image => URL.revokeObjectURL(image.url));
    };
  }, [zipFile]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-full">Loading images...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (images.length === 0 && !isLoading) {
    return <div className="text-center text-gray-500">No images found in the ZIP file.</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <div className="relative w-full aspect-square bg-gray-100 rounded-md overflow-hidden">
            <img 
              src={image.url} 
              alt={image.displayName}
              className="w-full h-full object-cover" 
            />
            <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
              #{image.sortOrder}
            </div>
          </div>
          <p className="mt-2 text-sm text-center truncate w-full">{image.displayName}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default ImageGrid;
