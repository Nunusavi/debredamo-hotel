'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { X, Upload, Loader2 } from 'lucide-react';
import { getUserError, logError } from '@/lib/errors';

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export default function ImageUpload({ images, onChange, maxImages = 10 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check if adding these files would exceed max
    if (images.length + files.length > maxImages) {
      setError(`Maximum ${maxImages} images allowed`);
      return;
    }

    setUploading(true);
    setError('');

    try {
      const uploadedUrls: string[] = [];

      // Upload each file
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to upload file');
        }

        uploadedUrls.push(data.url);
      }

      // Add new URLs to existing images
      onChange([...images, ...uploadedUrls]);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      const userError = getUserError(err);
      setError(userError.message);
      logError('Image upload error', err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;

    // Create a new file input event
    const dataTransfer = new DataTransfer();
    files.forEach((file) => dataTransfer.items.add(file));

    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files;
      // Trigger the change event
      const event = new Event('change', { bubbles: true });
      fileInputRef.current.dispatchEvent(event);
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading || images.length >= maxImages}
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            <p className="text-gray-600">Uploading images...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <Upload className="w-12 h-12 text-gray-400" />
            <div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={images.length >= maxImages}
                className="text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Click to upload
              </button>
              <span className="text-gray-600"> or drag and drop</span>
            </div>
            <p className="text-sm text-gray-500">
              PNG, JPG, WebP or GIF (max 5MB per file)
            </p>
            <p className="text-xs text-gray-400">
              {images.length} / {maxImages} images
            </p>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative group aspect-square">
              <Image
                src={url}
                alt={`Room image ${index + 1}`}
                fill
                className="object-cover rounded-lg border-2 border-gray-200"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                #{index + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
