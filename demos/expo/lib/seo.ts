export const SITE_URL = 'https://www.reactnatives.dev';
export const SITE_NAME = 'React-Natives';
export const DEFAULT_OG_IMAGE_PATH = '/og-image.png';
export const DEFAULT_OG_IMAGE_URL = `${SITE_URL}${DEFAULT_OG_IMAGE_PATH}`;

function ensureLeadingSlash(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}

export function normalizePath(path: string): string {
  if (!path || path === '/') return '/';

  const cleanPath = ensureLeadingSlash(path).replace(/\/+/g, '/');
  return cleanPath.endsWith('/') ? cleanPath.slice(0, -1) : cleanPath;
}

export function toAbsoluteUrl(path: string): string {
  return `${SITE_URL}${normalizePath(path)}`;
}
