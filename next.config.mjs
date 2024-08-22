import MiniCssExtractPlugin from 'mini-css-extract-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  webpack(config, { dev, isServer }) {
    // Add MiniCssExtractPlugin for production builds
    if (!dev && !isServer) {
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].css',
          chunkFilename: 'static/css/[name].chunk.css',
        })
      );
    }

    // Modify CSS loaders
    config.module.rules
      .filter((rule) => String(rule.test) === String(/\.css$/))
      .forEach((rule) => {
        rule.use = [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ];
      });

    return config;
  },
};

export default nextConfig;
