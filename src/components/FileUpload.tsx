
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { File, X, Upload } from 'lucide-react';

interface FileUploadProps {
  label: string;
  accept: string;
  onChange: (file: File | null) => void;
  value: File | null;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  accept,
  onChange,
  value,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (isValidFileType(file, accept)) {
        onChange(file);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onChange(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const isValidFileType = (file: File, acceptTypes: string): boolean => {
    const fileType = file.type;
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
    
    const acceptTypesArray = acceptTypes.split(',').map(type => type.trim());
    
    return acceptTypesArray.some(type => {
      if (type.startsWith('.')) {
        return fileExtension === type;
      } else {
        return fileType.match(new RegExp(type.replace('*', '.*')));
      }
    });
  };

  return (
    <div className={`w-full ${className}`}>
      <p className="text-sm font-medium mb-2">{label}</p>
      
      {!value ? (
        <motion.div
          className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer
            ${isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-secondary/50'}`}
          whileHover={{ scale: 1.005 }}
          whileTap={{ scale: 0.995 }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
          <p className="text-sm font-medium">Drag & drop or click to browse</p>
          <p className="text-xs text-muted-foreground mt-1">
            {accept.split(',').map(type => type.trim()).join(', ')}
          </p>
        </motion.div>
      ) : (
        <motion.div 
          className="border rounded-lg p-4 flex items-center justify-between bg-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center">
            <File className="w-5 h-5 mr-3 text-primary" />
            <div>
              <p className="text-sm font-medium truncate max-w-[200px] sm:max-w-xs">{value.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {(value.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <motion.button
            type="button"
            className="p-1 rounded-full hover:bg-secondary"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleRemove}
          >
            <X className="w-4 h-4" />
          </motion.button>
        </motion.div>
      )}
      
      <input
        type="file"
        accept={accept}
        onChange={handleChange}
        ref={inputRef}
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;
