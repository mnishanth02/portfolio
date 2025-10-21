"use client";

import type { ImageProps } from "next/image";
import Image from "next/image";
import { useEffect, useState } from "react";

interface SafeImageProps extends Omit<ImageProps, "src"> {
  src: string;
  fallbackSrc?: string;
}

/**
 * SafeImage Component
 * Wraps Next.js Image with automatic fallback handling for missing images
 * Uses unoptimized fallback to prevent Next.js optimization errors
 */
export function SafeImage({
  src,
  fallbackSrc = "/images/placeholder.svg",
  alt,
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isError, setIsError] = useState(false);

  // Reset when src changes
  useEffect(() => {
    setImgSrc(src);
    setIsError(false);
  }, [src]);

  const handleError = () => {
    if (!isError) {
      setIsError(true);
      setImgSrc(fallbackSrc);
    }
  };

  // Always use unoptimized to handle SVG files and prevent Next.js optimization errors
  // This is safe for placeholder and fallback images
  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={handleError}
      unoptimized
    />
  );
}
