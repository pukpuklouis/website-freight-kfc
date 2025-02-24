/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "cjs",
  serverDependenciesToBundle: ["resend"],
  // Enable environment variable loading
  serverEnv: {
    RESEND_API_KEY: true
  }
};
