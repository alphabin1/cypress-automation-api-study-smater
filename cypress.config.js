const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    "chromeWebSecurity": false,
    "reporter": 'mochawesome',
    "reporterOptions": {
      "reportDir": 'cypress/report',
      "overwrite": true,
      "html": true,
      "json": true,
      "autoOpen":false,
    },
    "video": false,
    "screenshotsFolder": "images",
    "env": {
      "API_BASE_URL": "https://be.dev.studysmarter-test.de"
    }
  },
});
