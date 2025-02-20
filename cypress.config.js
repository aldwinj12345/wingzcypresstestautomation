const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://auth.wingz.me/auth/signin', //initial test url
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    screenshotOnRunFailure: true, // Capture screenshots on failure (default)
    video: true, // Capture videos for all runs (default)
  },
});
