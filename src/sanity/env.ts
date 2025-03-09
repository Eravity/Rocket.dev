// Make sure environment variables are properly loaded in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('Sanity env check:', {
    datasetExists: !!process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectIdExists: !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  });
}

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-03-09'

// Set default values as fallback for development
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'puh1svn1'

// Add useCdn flag (may be needed by Sanity client)
export const useCdn = false
