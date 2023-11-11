declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      BCRYPT_SALT: string;
      JWT_ACCESS_SECRET: string;
      JWT_REFRESH_SECRET: string;
      JWT_ACCESS_EXPIRES: string;
      JWT_REFRESH_EXPIRES: string;
      MONOBANK_TOKEN: string;
      REFRESH_TOKEN: string;
    }
  }
}
export {};
