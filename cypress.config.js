// cypress.config.js
import { defineConfig } from 'cypress';

export default defineConfig({
  defaultCommandTimeout: 10000,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  e2e: {
    setupNodeEvents() {
      // opcional: manipular eventos do Cypress
    },
    baseUrl: 'http://localhost:5173', // ajuste se sua porta for diferente
  },
});
