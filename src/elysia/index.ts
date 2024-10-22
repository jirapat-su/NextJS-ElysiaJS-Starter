import type { NextRequest } from 'next/dist/server/web/spec-extension/request';

import { elysiaApp } from './main';

type HttpMethod = 'DELETE' | 'GET' | 'OPTIONS' | 'POST' | 'PUT';

const RATE_LIMIT = 20;
const RATE_LIMIT_WINDOW = 10_000;
const ipRequests = new Map<string, number[]>();

const getRateLimit = (ip: string): number => {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;
  let requests = ipRequests.get(ip);

  if (!requests) {
    requests = [now];
    ipRequests.set(ip, requests);
    return 1;
  }

  let left = 0;
  let right = requests.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (requests[mid] > windowStart) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  if (left > 0) requests.splice(0, left);

  requests.push(now);
  return requests.length;
};

const handleRequest = async (req: NextRequest) => {
  const ip = req?.ip || req.headers.get('x-forwarded-for') || 'unknown';
  const requestCount = getRateLimit(ip);
  if (requestCount > RATE_LIMIT) return new Response('Rate limit exceeded', { status: 429 });

  try {
    const res = await elysiaApp.handle(req);
    return res;
  } catch {
    return new Response('Internal Server Error', { status: 500 });
  }
};

const elysiaHandler: Record<HttpMethod, (req: NextRequest) => Promise<Response>> = {
  GET: handleRequest,
  POST: handleRequest,
  PUT: handleRequest,
  DELETE: handleRequest,
  OPTIONS: handleRequest,
};

export { elysiaHandler };
