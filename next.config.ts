import type {NextConfig} from "next";

type RemotePattern = {
  protocol?: 'http' | 'https';
  hostname: string;
  port?: string;
  pathname?: string;
};

const imageRemotePatterns: RemotePattern[] = [
  {
    hostname: 'kqqyrwkffymybvwzqhhb.supabase.co',
    protocol: 'https',
    pathname: '**',
  },
  {
    hostname: 'cdn.sanity.io',
    protocol: 'https',
    pathname: '**',
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: imageRemotePatterns,
  },
};

export default nextConfig;