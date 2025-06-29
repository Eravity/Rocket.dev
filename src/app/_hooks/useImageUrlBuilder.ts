import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from '@/sanity/lib/client'

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

interface SanityImageAsset {
  _ref: string;
  _type: string;
}

interface SanityImage {
  asset: SanityImageAsset;
}

export function getSanityImageUrl(imageRef: string | SanityImage | undefined, width?: number, height?: number): string {
  if (!imageRef) {
    return '/placeholder-image.jpg' // Fallback image
  }

  try {
    let imageBuilder = urlFor(imageRef)

    if (width) {
      imageBuilder = imageBuilder.width(width)
    }

    if (height) {
      imageBuilder = imageBuilder.height(height)
    }

    return imageBuilder.url()
  } catch (error) {
    console.error('Error building Sanity image URL:', error)
    return '/placeholder-image.jpg' // Fallback image
  }
}

export function useImageUrlBuilder(image: SanityImage | undefined): string | null {
  if (!image) {
    return null
  }

  const { asset } = image

  if (!asset) {
    return null
  }

  return urlFor(asset).url()
}
