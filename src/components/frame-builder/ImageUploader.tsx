import React, { useRef, useCallback } from 'react';

interface ImageUploaderProps {
  uploadedImage: string | null;
  setUploadedImage: (image: string | null) => void;
  onImageProcessed?: (imageData: {
    original: string;
    processed: string;
    width: number;
    height: number;
    aspectRatio: number;
  }) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  uploadedImage,
  setUploadedImage,
  onImageProcessed
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string;
        setUploadedImage(imageDataUrl);

        // Process image for canvas
        const img = new Image();
        img.onload = () => {
          // Calculate dimensions
          const width = img.width;
          const height = img.height;
          const aspectRatio = width / height;

          // Call callback with processed data
          if (onImageProcessed) {
            onImageProcessed({
              original: imageDataUrl,
              processed: imageDataUrl,
              width,
              height,
              aspectRatio
            });
          }
        };
        img.src = imageDataUrl;
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing image:', error);
    }
  }, [setUploadedImage, onImageProcessed]);

  const handleRemoveImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <button 
        className="UserGallery---gallery-button---2D-Q__0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        <span className="UserGallery---gallery-button-text---3J1Gr_0 flex items-center space-x-2">
          <i className="fa fa-2x fa-cloud-upload"></i>
          <span>Upload Image</span>
        </span>
      </button>
      
      {uploadedImage && (
        <div className="mt-2">
          <img 
            src={uploadedImage} 
            alt="Uploaded" 
            className="w-20 h-20 object-cover rounded border"
          />
          <button
            onClick={handleRemoveImage}
            className="ml-2 text-red-600 hover:text-red-800 text-sm"
          >
            Remove
          </button>
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/bmp, image/x-windows-bmp, image/tiff, image/gif"
        multiple
        style={{display: 'none'}}
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default ImageUploader;