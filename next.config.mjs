/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // `next lint` cannot serialize the flat ESLint config on ESLint 9
    // ("Cannot serialize key \"parse\" in parser"), which fails the build even
    // when there is nothing wrong with the code. Linting runs as its own step
    // instead — `npm run lint`, which calls eslint directly and works fine.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
