import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Configuration des en-têtes de sécurité
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Empêche le navigateur de détecter le type MIME d'un fichier
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Protège contre les attaques XSS
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Empêche le site d'être chargé dans un iframe (clickjacking)
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // Politique de sécurité du contenu
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' https://itunes.apple.com; connect-src 'self' https://itunes.apple.com; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://itunes.apple.com; font-src 'self' data:;",
          },
          // Référer-Policy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Permissions-Policy
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
