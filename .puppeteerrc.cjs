const { join } = require("path");

/**
 * Store Puppeteer's downloaded Chromium inside the project instead of the
 * default `~/.cache/puppeteer`. On some CI/hosting build images (e.g. Vercel)
 * the home-directory cache isn't preserved between `npm install` and the
 * `postbuild` step, which makes the pre-render script fail with "Could not find
 * Chrome". A project-local cache is always present at build time.
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  cacheDirectory: join(__dirname, ".cache", "puppeteer"),
};
