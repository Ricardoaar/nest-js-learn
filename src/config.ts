import { registerAs } from '@nestjs/config';


const config = registerAs('config', () => ({
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  api_key: process.env.API_KEY,
}));

export default config;