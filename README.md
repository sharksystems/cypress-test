# cypress-test

## Summary

This repository contains automated tests for the Conduit website (https://conduit.realworld.how/). Tests are written in JavaScript following Page Object pattern.

## Requirements

- Node.js (v14 or later)
- Cypress

## Steps to Install

1. Clone the repository or go to Code > Download ZIP
2. Install dependencies: npm install

## Steps to Launch Tests

Open Cypress Test Runner:

npx cypress open

Or run tests in headless mode:

npx cypress run

or

npm test

## Steps to Create and View the Report

Reports are created automatically. Navigate to cypress/reports and open the mochawesome.html or mochawesome.json file to open the report

To generate reports manually after test, you can also use this command:

npm generate-report
