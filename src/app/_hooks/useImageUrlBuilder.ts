import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder({
  projectId: 'your-project-id',
  dataset: 'production'
})

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export function getSanityImageUrl(imageRef: string | any, width?: number, height?: number): string {
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