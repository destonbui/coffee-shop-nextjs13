namespace NodeJS {
  interface ProcessEnv {
    HOST: string;
    GH_CLIENT_SECRET: string;
    GH_ID: string;
    GCS_PROJECT_ID: string;
    GCS_BUCKET_ID: string;
    GCS_KEY_PRIVATE_KEY: string;
    GCS_KEY_CLIENT_EMAIL: string;
    DATABASE_URL: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
  }
}
