import { config } from 'dotenv';
config();

export const PORT = process.env.PORT || 9000;

export const MONGO_URI = process.env.MONGO_URI;

export const PUSHER_APPID = process.env.PUSHER_APPID;
export const PUSHER_KEY = process.env.PUSHER_KEY;
export const PUSHER_SECRET = process.env.PUSHER_SECRET;
export const PUSHER_CLUSTER = process.env.PUSHER_CLUSTER;