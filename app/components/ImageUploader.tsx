'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon, X } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
  uploadedImage: string | null;
}

export default function ImageUploader({ onImageUpload, uploadedImage }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setIsUploading(true);

    // Create a preview URL for the uploaded image
    const imageUrl = URL.createObjectURL(file);
    
    // Simulate upload delay
    setTimeout(() => {
      onImageUpload(imageUrl);
      setIsUploading(false);
    }, 1500);
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    maxFiles: 1,
    disabled: isUploading
  });

  const clearImage = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
      onImageUpload('');
    }
  };

  return (
    <div className="space-y-6">
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-4">Upload Product Image</h2>
        <p className="text-text-secondary mb-6">
          Upload a high-quality image of your product to generate AI-powered ad variations.
        </p>

        {!uploadedImage ? (
          <motion.div
            {...getRootProps()}
            className={`dropzone ${isDragActive ? 'active' : ''}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input {...getInputProps()} />
            
            {isUploading ? (
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <p className="mt-4 text-text-secondary">Processing your image...</p>
              </motion.div>
            ) : (
              <>
                <motion.div
                  className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {isDragActive ? (
                    <Upload className="w-8 h-8 text-primary" />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-primary" />
                  )}
                </motion.div>
                
                {isDragActive ? (
                  <p className="text-primary font-medium">Drop your image here!</p>
                ) : (
                  <div className="text-center">
                    <p className="text-text-primary font-medium mb-1">
                      Drag & drop your product image here
                    </p>
                    <p className="text-text-secondary text-sm">
                      or click to browse • PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
              </>
            )}
          </motion.div>
        ) : (
          <motion.div
            className="relative group"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={uploadedImage}
              alt="Uploaded product"
              className="w-full max-w-md mx-auto rounded-lg shadow-card"
            />
            <button
              onClick={clearImage}
              className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-green-800 font-medium">✅ Image uploaded successfully!</p>
              <p className="text-green-600 text-sm mt-1">
                Ready to generate ad variations. Switch to the "Ad Variations" tab to continue.
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Upload Tips */}
      <motion.div 
        className="card bg-blue-50 border-blue-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-blue-900 mb-3">📸 Best Practices</h3>
        <ul className="text-blue-800 text-sm space-y-2">
          <li>• Use high-resolution images (1080x1080px or higher)</li>
          <li>• Ensure good lighting and clear product visibility</li>
          <li>• Avoid cluttered backgrounds for better AI processing</li>
          <li>• Include the full product in frame</li>
        </ul>
      </motion.div>
    </div>
  );
}
