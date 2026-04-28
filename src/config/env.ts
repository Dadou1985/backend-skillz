import { config } from 'dotenv';

const envPath = `.env.${process.env.NODE_ENV || 'production'}`;
config({ path: envPath });

export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || 'production';
export const API_PREFIX = process.env.API_PREFIX || '/api/v1';