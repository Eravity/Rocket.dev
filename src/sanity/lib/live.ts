// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.

// Note: Live functionality is temporarily disabled due to TypeScript compatibility issues
// TODO: Re-enable when Sanity packages are compatible

// import { defineLive } from "next-sanity";
// import { client } from './client'

// export const { sanityFetch, SanityLive } = defineLive({ 
//   client: client.withConfig({ 
//     // Live content is currently only available on the experimental API
//     // https://www.sanity.io/docs/api-versioning
//     apiVersion: 'vX' 
//   }) 
// });

// Fallback exports for compatibility
export const sanityFetch = null;
export const SanityLive = null;
