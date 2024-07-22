const { defineConfig } = require("cypress");
const { merge } = require('mochawesome-merge');
const generateReport = require('mochawesome-report-generator');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('after:run', async (results) => {
        if (results) {
          await merge({
            files: ['./cypress/reports/*.json']
          })
          .then(report => generateReport.create(report))
          .then(() => console.log('HTML report generated'));
        }
      });
      return config;
    },

    viewportWidth: 1280,
    viewportHeight: 720,

    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
    }
  },
});
