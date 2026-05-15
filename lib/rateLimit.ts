import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const DAILY_LIMIT = Number(process.env.DAILY_LIMIT ?? 5);

export async function checkRateLimit(email: string): Promise<{ allowed: boolean; remaining: number; limit: number }> {
  const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD UTC
  const key = `usage:${email}:${date}`;

  const count = await redis.incr(key);
  if (count === 1) {
    await redis.expire(key, 86400 * 2); // TTL 2 days, cleans up automatically
  }

  const remaining = Math.max(0, DAILY_LIMIT - count);
  return { allowed: count <= DAILY_LIMIT, remaining, limit: DAILY_LIMIT };
}
