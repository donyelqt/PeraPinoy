
export default {
    schema: "./utils/schema.jsx",
    driver: 'pg',
    dbCredentials: {
      url: process.env.DATABASE_URL,
    }
  };