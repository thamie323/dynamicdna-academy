// client/src/lib/imageUtils.ts
export const getImageSrc = (imageUrl?: string | null) => {
  if (!imageUrl) return "/about-hero.jpg";        // fallback image in /public
  if (imageUrl.startsWith("http")) return imageUrl; // full URL
  if (imageUrl.startsWith("/")) return imageUrl;    // already absolute (/uploads/...)
  return `/${imageUrl}`;                            // "uploads/..." -> "/uploads/..."
};
