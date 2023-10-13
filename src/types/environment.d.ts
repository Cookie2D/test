declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      BCRYPT_SALT: string;
    }
  }
}
export {};
