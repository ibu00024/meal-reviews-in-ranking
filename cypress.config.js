const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",  // ✅ Make sure this matches your frontend's port
  },
});
