import axios from 'axios';

const LOG_API = 'http://20.244.56.144/evaluation-service/logs';
const AUTH_TOKEN = process.env.LOGGER_TOKEN; // Add this to your .env or Render secrets

/**
 * Reusable Log Sender
 * @param {string} stack - "backend" | "frontend"
 * @param {string} level - "debug" | "info" | "error" | "fatal"
 * @param {string} pkg - Package name (e.g., "handler", "db", "controller")
 * @param {string} message - Descriptive log message
 */
export const logEvent = async (stack, level, pkg, message) => {
  try {
    const payload = { stack, level, package: pkg, message };
    const response = await axios.post(LOG_API, payload, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    // Optional: Save log ID or confirmation if needed
    return response.data;
  } catch (err) {
    // Avoid logging the logger — silent fail or fallback
  }
};
