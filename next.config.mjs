const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: isProd ? "/Scroll_Animation" : "",
  assetPrefix: isProd ? "/Scroll_Animation/" : "",
  images: {
    unoptimized: true
  }
};

export default nextConfig;