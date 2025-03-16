/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Explicitly set environment variables from .env file
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  },
  images: {
    domains: ['kqqyrwkffymybvwzqhhb.supabase.co', 'cdn.sanity.io'], // Add the Sanity CDN domain
  },
}

module.exports = nextConfig
