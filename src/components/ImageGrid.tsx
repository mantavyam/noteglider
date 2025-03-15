
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
  },
