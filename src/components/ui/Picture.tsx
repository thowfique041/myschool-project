import Image from "next/image";
import type { ImageAsset } from "@/types";
import { cn } from "@/lib/utils";

type PictureProps = {
  image: ImageAsset;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Aspect ratio utility, e.g. "aspect-[16/10]" */
  ratio?: string;
};

/**
 * Wrapper around next/image. Vector files are served as-is (the image
 * optimiser is only useful for raster photos), raster files get optimised.
 */
export function Picture({ image, className, imgClassName, sizes = "100vw", priority = false, ratio = "aspect-[16/10]" }: PictureProps) {
  const isVector = image.src.endsWith(".svg");
  return (
    <div className={cn("relative overflow-hidden bg-paper-dark", ratio, className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={isVector}
        className={cn("object-cover", imgClassName)}
      />
    </div>
  );
}
