import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'raw.githubusercontent.com',  // PokeAPI sprites
      'assets.pokemon.com',         // Official Pokemon assets
      'play.pokemonshowdown.com'    // Pokemon Showdown sprites (as fallback)
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/PokeAPI/sprites/**',
      },
    ],
  },
};

export default nextConfig;
