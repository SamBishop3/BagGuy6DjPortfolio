let userConfig = {}
try {
  userConfig = await import('./v0-user-next.config')
  userConfig = userConfig.default || {}
} catch (e) {
  // ignore if user config doesn't exist
}

/** @type {import('next').NextConfig} */
const baseConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
}

// Merge baseConfig with userConfig
const nextConfig = {
  ...baseConfig,
  ...userConfig,
  experimental: {
    ...baseConfig.experimental,
    ...userConfig.experimental,
  },
}

export default nextConfig
