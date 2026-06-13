import crypto from 'node:crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const SESSION_COOKIE = 'lux_admin_session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;
const DEFAULT_ADMIN_USERNAME = 'kate';
const DEFAULT_ADMIN_PASSWORD = '12345678';
const DEFAULT_SESSION_SECRET = 'luscious-lox-admin-secret';

export function normalizeEnvValue(value: string | undefined): string {
  if (typeof value !== 'string') {
    return '';
  }

  let normalized = value.trim();

  for (let i = 0; i < 2; i += 1) {
    const wrappedInDoubleQuotes = normalized.startsWith('"') && normalized.endsWith('"');
    const wrappedInSingleQuotes = normalized.startsWith("'") && normalized.endsWith("'");

    if ((wrappedInDoubleQuotes || wrappedInSingleQuotes) && normalized.length >= 2) {
      normalized = normalized.slice(1, -1).trim();
      continue;
    }

    break;
  }

  return normalized;
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function getAdminUsername(): string {
  return normalizeEnvValue(process.env.ADMIN_USERNAME) || DEFAULT_ADMIN_USERNAME;
}

function getAdminPassword(): string {
  return normalizeEnvValue(process.env.ADMIN_PASSWORD) || DEFAULT_ADMIN_PASSWORD;
}

function getSessionSecret(): string {
  return normalizeEnvValue(process.env.ADMIN_SESSION_SECRET) || DEFAULT_SESSION_SECRET;
}

function signSessionPayload(payload: string): string {
  return crypto.createHmac('sha256', getSessionSecret()).update(payload).digest('base64url');
}

function parseCookies(cookieHeader: string | undefined): Record<string, string> {
  const cookies: Record<string, string> = {};

  if (!cookieHeader) {
    return cookies;
  }

  cookieHeader.split(';').forEach((cookie) => {
    const separatorIndex = cookie.indexOf('=');
    if (separatorIndex === -1) {
      return;
    }

    const key = cookie.slice(0, separatorIndex).trim();
    const value = cookie.slice(separatorIndex + 1).trim();
    cookies[key] = value;
  });

  return cookies;
}

function buildSessionCookie(value: string, maxAge: number): string {
  const secureFlag = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${SESSION_COOKIE}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secureFlag}`;
}

export function verifyAdminCredentials(username: string, password: string): boolean {
  const normalizedUsername = username.trim();
  const normalizedPassword = password.trim();

  return safeEqual(normalizedUsername, getAdminUsername()) && safeEqual(normalizedPassword, getAdminPassword());
}

export function setAdminSession(res: VercelResponse, username: string) {
  const payload = Buffer.from(
    JSON.stringify({
      username,
      exp: Date.now() + SESSION_MAX_AGE * 1000,
    }),
    'utf8',
  ).toString('base64url');

  const signature = signSessionPayload(payload);
  res.setHeader('Set-Cookie', buildSessionCookie(`${payload}.${signature}`, SESSION_MAX_AGE));
}

export function clearAdminSession(res: VercelResponse) {
  res.setHeader('Set-Cookie', buildSessionCookie('', 0));
}

export function getAuthenticatedAdmin(req: VercelRequest): string | null {
  const token = parseCookies(req.headers.cookie)[SESSION_COOKIE];
  if (!token) {
    return null;
  }

  const [payload, signature] = token.split('.');
  if (!payload || !signature) {
    return null;
  }

  const expectedSignature = signSessionPayload(payload);
  if (!safeEqual(signature, expectedSignature)) {
    return null;
  }

  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { username?: unknown; exp?: unknown };
    if (typeof session.exp !== 'number' || session.exp <= Date.now()) {
      return null;
    }

    return typeof session.username === 'string' ? session.username : null;
  } catch {
    return null;
  }
}

export function requireAdmin(req: VercelRequest, res: VercelResponse): string | null {
  const username = getAuthenticatedAdmin(req);
  if (!username) {
    res.status(401).json({ error: 'Unauthorized' });
    return null;
  }

  return username;
}

export function getSupabaseConfig() {
  const supabaseUrl = normalizeEnvValue(process.env.SUPABASE_URL);
  const serviceRoleKey = normalizeEnvValue(process.env.SUPABASE_SERVICE_ROLE_KEY);

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return { supabaseUrl, serviceRoleKey };
}

export function buildSupabaseHeaders(serviceRoleKey: string): HeadersInit {
  return {
    'Content-Type': 'application/json',
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
  };
}
