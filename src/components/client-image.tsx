"use client";

type ClientImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export function ClientImage({ src, alt, className }: ClientImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(e) => {
        e.currentTarget.src = "/placeholder.png";
      }}
    />
  );
}
