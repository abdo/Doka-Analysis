import React, { useRef, useState } from 'react';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      onImageSelect(selectedFile);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {!preview ? (
        <div
          className={`relative border-4 border-dashed rounded-2xl p-12 text-center transition-all duration-300 backdrop-blur-sm shadow-xl ${
            dragActive
              ? 'border-doka-yellow bg-yellow-50/90'
              : 'border-white/50 hover:border-doka-yellow bg-white/90 hover:bg-white/95'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleChange}
            id="file-upload"
          />
          
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-16 h-16 text-doka-blue mb-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>

            <h3 className="text-xl font-bold text-doka-blue mb-2">
              Upload Construction Image
            </h3>
            <p className="text-gray-600 mb-4">
              Drag and drop your construction drawing, blueprint, or site photo here
            </p>

            <label
              htmlFor="file-upload"
              className="bg-doka-blue hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg cursor-pointer transition-colors duration-200"
            >
              Choose File
            </label>

            <p className="text-sm text-gray-500 mt-4">
              Supports: JPG, PNG, WebP, GIF
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden border-4 border-doka-yellow shadow-2xl backdrop-blur-sm">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-auto max-h-96 object-contain bg-white/95"
            />
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={handleReset}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold px-6 py-3 rounded-lg transition-colors duration-200 shadow-lg"
            >
              Choose Different Image
            </button>
            <button
              onClick={handleUploadClick}
              className="bg-doka-blue hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-lg"
            >
              <span>Analyze Image</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
