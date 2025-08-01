'use client';

import { CldImage } from 'next-cloudinary';
import Image from 'next/image';
import { useState } from 'react';



interface CloudinaryImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  crop?: 'fill' | 'scale' | 'fit' | 'thumb';
  placeholder?: 'empty';
  blurDataURL?: string;
}

export default function CloudinaryImage({
  src,
  alt,
  width = 400,
  height = 300,
  className = '',
  priority = false,
  quality = 80,
  crop = 'fill',
  placeholder = 'empty',
  blurDataURL
}: CloudinaryImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Debug logging
  console.log('CloudinaryImage props:', { src, alt, width, height });

  // Validate URL and determine if it's a Cloudinary public ID or external URL
  const isValidUrl = (url: string) => {
    if (!url || url.trim() === '') return false;
    try {
      new URL(url);
      return true;
    } catch {
      // If it's not a valid URL, check if it's a Cloudinary public ID
      // Cloudinary public IDs can contain letters, numbers, underscores, hyphens, and forward slashes
      return /^[a-zA-Z0-9_\/-]+$/.test(url) || url.includes('cloudinary.com');
    }
  };

  // Check if the URL is a Cloudinary public ID (not a full URL)
  const isCloudinaryPublicId = (url: string) => {
    // Cloudinary public IDs can contain letters, numbers, underscores, hyphens, and forward slashes
    // They don't start with http/https and don't contain cloudinary.com
    const result = /^[a-zA-Z0-9_\/-]+$/.test(url) && !url.includes('http') && !url.includes('cloudinary.com');
    console.log('isCloudinaryPublicId check:', { url, result });
    return result;
  };

  // Check if the URL is a full Cloudinary URL
  const isCloudinaryUrl = (url: string) => {
    return url.includes('res.cloudinary.com');
  };

  // Handle loading state
  const handleLoad = () => {
    setIsLoading(false);
  };

  // Handle error state
  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  // If no valid src, show placeholder
  if (!isValidUrl(src)) {
    console.warn('Invalid image URL:', src);
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">لا توجد صورة</span>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">فشل في تحميل الصورة</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Loading skeleton */}
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse rounded"
          style={{ width, height }}
        />
      )}
      
      {/* Render appropriate image component based on URL type */}
      {isCloudinaryPublicId(src) ? (
        // Cloudinary public ID - use CldImage
        <CldImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={quality}
          crop={crop}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : isCloudinaryUrl(src) ? (
        // Full Cloudinary URL - use Next.js Image
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={quality}
          priority={priority}
          placeholder="empty"
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        // External URL - use Next.js Image
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={quality}
          priority={priority}
          placeholder="empty"
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
    </div>
  );
}

// Optimized image component for product cards
export function ProductImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  // If no src or empty src, return placeholder
  if (!src || src.trim() === '') {
    return (
      <div className={`bg-gray-200 flex items-center justify-center rounded-lg ${className}`} style={{ width: 300, height: 300 }}>
        <span className="text-gray-500 text-sm">لا توجد صورة</span>
      </div>
    );
  }

  return (
    <CloudinaryImage
      src={src}
      alt={alt}
      width={300}
      height={300}
      className={`object-cover rounded-lg ${className}`}
      crop="fill"
      quality={85}
      placeholder="empty"
    />
  );
}

// Optimized image component for hero banners
export function HeroImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  // If no src or empty src, return placeholder
  if (!src || src.trim() === '') {
    return (
      <div className={`bg-gray-200 flex items-center justify-center w-full ${className}`} style={{ height: 600 }}>
        <span className="text-gray-500 text-lg">لا توجد صورة</span>
      </div>
    );
  }

  return (
    <CloudinaryImage
      src={src}
      alt={alt}
      width={1200}
      height={600}
      className={`object-cover w-full ${className}`}
      crop="fill"
      quality={90}
      priority={true}
      placeholder="empty"
    />
  );
}

// Optimized image component for thumbnails
export function ThumbnailImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  console.log('ThumbnailImage src:', src);
  
  // If no src or empty src, return placeholder
  if (!src || src.trim() === '') {
    return (
      <div className={`bg-gray-200 flex items-center justify-center rounded ${className}`} style={{ width: 100, height: 100 }}>
        <span className="text-gray-500 text-xs">لا توجد صورة</span>
      </div>
    );
  }

  return (
    <CloudinaryImage
      src={src}
      alt={alt}
      width={100}
      height={100}
      className={`object-cover rounded ${className}`}
      crop="thumb"
      quality={70}
      placeholder="empty"
    />
  );
} 