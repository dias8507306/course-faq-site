/**
 * Absolute site URL for metadata, sitemap and robots.
 * NEXT_PUBLIC_SITE_URL (optional) wins, e.g. for a custom domain;
 * on Vercel the production domain is detected automatically.
 */
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}
