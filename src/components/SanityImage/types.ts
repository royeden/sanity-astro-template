// Based on https://github.com/lorenzodejong/next-sanity-image/tree/main
import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import type {
  SanityClientLike,
  SanityImageDimensions,
  SanityModernClientLike,
  SanityProjectDetails,
} from "@sanity/image-url/lib/types/types";

export { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";

export type SanityClientOrProjectDetails =
  | SanityClientLike
  | SanityProjectDetails
  | SanityModernClientLike;

export interface AstroSanityImageBuilderOptions {
  width: number | null;
  originalImageDimensions: SanityImageDimensions;
  croppedImageDimensions: SanityImageDimensions;
  quality: number | null;
}

export type AstroSanityImageBuilder = (
  imageUrlBuilder: ImageUrlBuilder,
  options: AstroSanityImageBuilderOptions
) => ImageUrlBuilder;

export interface AstroSanityImageOptions {
  imageBuilder?: AstroSanityImageBuilder;
}

export interface AstroSanityImageProps {
  src: string;
  width: number;
  height: number;
}
