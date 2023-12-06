import "dotenv/config";
import process from "process";

export const {
  PORT,
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
  DATABASE_URL,
  DIRECT_URL,
  JWT_ACCESS_TOKEN,
  JWT_REFRESH_TOKEN,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  CLIENT_URL,
  CLIENT_FRONTEND_URL,
  NODE_ENV,
  BITBUCKET_CLIENT_ID,
  BITBUCKET_CLIENT_SECRET,
} = process.env;
