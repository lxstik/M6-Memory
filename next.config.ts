import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "raw.githubusercontent.com",
      "pokeapi.co" // puedes añadir otros dominios si los usas
    ],
  },
};

module.exports = nextConfig;

export default nextConfig;
