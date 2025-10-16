// backend migration
// environment configuration for Project Harmony
// these values are loaded from environment variables

export const config = {
  externalApiUrl: process.env.EXTERNAL_API_URL || "",
  sheetsWebAppUrl: process.env.SHEETS_SCRIPT_WEB_APP_URL || "",
  regKey: process.env.REG_KEY || "",
  nodeEnv: process.env.NODE_ENV || "development",
} as const;