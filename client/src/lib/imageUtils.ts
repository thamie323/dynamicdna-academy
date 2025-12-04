// client/src/lib/imageUtils.ts

export function getImageSrc(imageUrl?: string | null): string {
  // Fallback hero if nothing
  if (!imageUrl) {
    return "/about-hero.jpg";
  }

  let value = String(imageUrl).trim();

  // Data URL (base64 etc.)
  if (value.startsWith("data:")) return value;

  // Full http(s) URL
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  // Normalise Windows backslashes
  value = value.replace(/\\/g, "/");

  // If there's an "uploads/..." fragment anywhere, crop to that
  const idx = value.toLowerCase().indexOf("uploads/");
  if (idx !== -1) {
    value = value.substring(idx); // e.g. "uploads/123.png"
  }

  // Ensure it starts with "/uploads/..."
  if (value.startsWith("/uploads")) return value;
  if (value.startsWith("uploads")) return "/" + value;

  // Generic: ensure leading slash
  if (!value.startsWith("/")) {
    value = "/" + value;
  }

  return value;
}
