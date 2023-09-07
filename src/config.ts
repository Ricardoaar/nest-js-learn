import { registerAs } from '@nestjs/config';


const config = registerAs('config', () => ({
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  api_key: process.env.API_KEY,
  mongo: {
    url: process.env.MONGO_URL,
    port: parseInt(process.env.MONGO_PORT, 10) || 27017,
    db: process.env.MONGO_DB,
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD,
  },

}));

export default config;