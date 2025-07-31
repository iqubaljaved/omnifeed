
import type {NextConfig} from 'next';

const isProd = process.env.NODE_ENV === 'production';
const repositoryName = 'omnifeed1';

const nextConfig: NextConfig = {
  output: 'export',
  assetPrefix: isProd ? `/${repositoryName}/` : '',
  basePath: isProd ? `/${repositoryName}` : '',
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
