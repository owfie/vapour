/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
     remotePatterns: [
       {
         protocol: 'https',
         hostname: 'avatars.steamstatic.com',
         port: '',
       },
       {
          protocol: 'https',
          hostname: 'media.steampowered.com',
          port: '',
       }
     ],
   },
}

module.exports = nextConfig
