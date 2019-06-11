import Redis from "ioredis";

export const redis =
  process.env.NODE_ENV === "production"
    ? new Redis()
    : new Redis();
