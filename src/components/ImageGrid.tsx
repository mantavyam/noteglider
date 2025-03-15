
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import JSZip from 'jszip';

interface ImageGridProps {
  zipFile: File | null;
}

interface ImageItem {
  name: string;
  url: string;
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
            const name = relativePath.split('/').pop() || '';
            imageFiles.push({ name, url });
          }
        };
        
        const promises: Promise<void>[] = [];
        
        contents.forEach((relativePath, file) => {
          if (!file.dir) {
            promises.push(processFile(relativePath, file));
          }
        });
        
        await Promise.all(promises);
        setImages(imageFiles);
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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
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
              alt={image.name}
              className="w-full h-full object-cover" 
            />
          </div>
          <p className="mt-2 text-sm text-center truncate w-full">{image.name}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default ImageGrid;
