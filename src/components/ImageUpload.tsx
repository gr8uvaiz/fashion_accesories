import React, { useRef, useState } from "react";

interface ImageUploadProps {
  label: string;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  maxSize?: number; // in MB
  maxImages?: number; // max number of images
  required?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  value,
  onChange,
  multiple = false,
  maxSize = 5,
  maxImages = 5,
  required = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Compress if image is too large
          const maxDimension = 1200;
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = (height / width) * maxDimension;
              width = maxDimension;
            } else {
              width = (width / height) * maxDimension;
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          // Convert to base64 with quality adjustment
          const base64 = canvas.toDataURL("image/jpeg", 0.8);
          resolve(base64);
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setError("");
    const maxSizeBytes = maxSize * 1024 * 1024;
    const validFiles: File[] = [];
    const currentImages = Array.isArray(value) ? value : [];

    // Check max images limit
    if (multiple && currentImages.length >= maxImages) {
      setError(`Maximum ${maxImages} images allowed`);
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!file.type.startsWith("image/")) {
        setError("Please upload only image files");
        continue;
      }

      if (file.size > maxSizeBytes) {
        // Will compress, so just warn
        console.log(
          `Compressing ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`,
        );
      }

      validFiles.push(file);

      // Stop if we reach max images
      if (multiple && currentImages.length + validFiles.length >= maxImages) {
        break;
      }
    }

    if (validFiles.length === 0) return;

    try {
      const base64Images = await Promise.all(
        validFiles.map((file) => compressImage(file)),
      );

      if (multiple) {
        const newImages = [...currentImages, ...base64Images].slice(
          0,
          maxImages,
        );
        onChange(newImages);
        if (newImages.length >= maxImages) {
          setError(`Maximum ${maxImages} images reached`);
        }
      } else {
        onChange(base64Images[0]);
      }
    } catch (err) {
      setError("Failed to process images");
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const removeImage = (index: number) => {
    if (multiple && Array.isArray(value)) {
      const newImages = value.filter((_, i) => i !== index);
      onChange(newImages);
    } else {
      onChange("");
    }
  };

  const images =
    multiple && Array.isArray(value) ? value : value ? [value] : [];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div
        className={`relative border-2 border-dashed rounded-xl p-6 transition-all ${
          dragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300 dark:border-gray-600 hover:border-primary"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
        />

        <div className="text-center">
          <span className="material-icons text-4xl text-gray-400 mb-2">
            cloud_upload
          </span>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Drag & drop images here, or click to select
          </p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            Choose Files
          </button>
          <p className="text-xs text-gray-500 mt-2">
            Max size: {maxSize}MB per image
            {multiple ? `, up to ${maxImages} images` : ""}. Images will be
            compressed automatically.
          </p>
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {images.map((img, index) => (
            <div key={index} className="relative group">
              <img
                src={img}
                alt={`Upload ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <span className="material-icons text-sm">close</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
