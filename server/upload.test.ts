import { describe, it, expect, beforeAll } from "vitest";
import { storagePut } from "./storage";

describe("Image Upload Functionality", () => {
  describe("Storage Integration", () => {
    it("should upload a buffer to S3 storage", async () => {
      // Create a small test image buffer (1x1 pixel PNG)
      const testImageBuffer = Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        "base64"
      );

      const timestamp = Date.now();
      const relKey = `test-uploads/test-image-${timestamp}.png`;

      const result = await storagePut(relKey, testImageBuffer, "image/png");

      expect(result).toBeDefined();
      expect(result.key).toBe(relKey);
      expect(result.url).toBeDefined();
      expect(typeof result.url).toBe("string");
      expect(result.url).toContain("http");
    });

    it("should upload text content as a file", async () => {
      const testContent = "Test file content";
      const timestamp = Date.now();
      const relKey = `test-uploads/test-file-${timestamp}.txt`;

      const result = await storagePut(relKey, testContent, "text/plain");

      expect(result).toBeDefined();
      expect(result.key).toBe(relKey);
      expect(result.url).toBeDefined();
      expect(typeof result.url).toBe("string");
    });

    it("should handle different image formats", async () => {
      // Test with a small JPEG buffer
      const jpegBuffer = Buffer.from([0xff, 0xd8, 0xff, 0xe0]); // JPEG header
      const timestamp = Date.now();
      const relKey = `test-uploads/test-image-${timestamp}.jpg`;

      const result = await storagePut(relKey, jpegBuffer, "image/jpeg");

      expect(result).toBeDefined();
      expect(result.key).toBe(relKey);
      expect(result.url).toBeDefined();
    });

    it("should normalize keys by removing leading slashes", async () => {
      const testBuffer = Buffer.from("test");
      const timestamp = Date.now();
      const relKeyWithSlash = `/test-uploads/test-${timestamp}.txt`;
      const expectedKey = `test-uploads/test-${timestamp}.txt`;

      const result = await storagePut(relKeyWithSlash, testBuffer, "text/plain");

      expect(result.key).toBe(expectedKey);
      expect(result.key).not.toContain("//");
    });
  });

  describe("Upload Validation", () => {
    it("should validate that uploaded files return accessible URLs", async () => {
      const testBuffer = Buffer.from("test content");
      const timestamp = Date.now();
      const relKey = `test-uploads/validation-${timestamp}.txt`;

      const result = await storagePut(relKey, testBuffer, "text/plain");

      // Verify the URL is a valid HTTP(S) URL
      expect(result.url).toMatch(/^https?:\/\/.+/);
      
      // Verify we can fetch the URL (it should be publicly accessible)
      const response = await fetch(result.url);
      expect(response.ok).toBe(true);
    });

    it("should handle large file uploads (within limits)", async () => {
      // Create a 1MB buffer
      const largeBuffer = Buffer.alloc(1024 * 1024, "a");
      const timestamp = Date.now();
      const relKey = `test-uploads/large-file-${timestamp}.bin`;

      const result = await storagePut(relKey, largeBuffer, "application/octet-stream");

      expect(result).toBeDefined();
      expect(result.key).toBe(relKey);
      expect(result.url).toBeDefined();
    });
  });

  describe("Content Type Handling", () => {
    it("should handle various image content types", async () => {
      const testBuffer = Buffer.from("test");
      const timestamp = Date.now();
      
      const contentTypes = [
        "image/png",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "image/svg+xml"
      ];

      for (const contentType of contentTypes) {
        const ext = contentType.split("/")[1];
        const relKey = `test-uploads/test-${timestamp}.${ext}`;
        
        const result = await storagePut(relKey, testBuffer, contentType);
        
        expect(result).toBeDefined();
        expect(result.key).toBe(relKey);
        expect(result.url).toBeDefined();
      }
    });

    it("should use default content type when not specified", async () => {
      const testBuffer = Buffer.from("test");
      const timestamp = Date.now();
      const relKey = `test-uploads/default-${timestamp}.bin`;

      // Call without contentType parameter (should use default)
      const result = await storagePut(relKey, testBuffer);

      expect(result).toBeDefined();
      expect(result.key).toBe(relKey);
      expect(result.url).toBeDefined();
    });
  });

  describe("Error Handling", () => {
    it("should reject empty file paths", async () => {
      const testBuffer = Buffer.from("test");
      
      // Empty key should be rejected by the storage service
      await expect(async () => {
        await storagePut("", testBuffer, "text/plain");
      }).rejects.toThrow();
    });

    it("should handle special characters in file names", async () => {
      const testBuffer = Buffer.from("test");
      const timestamp = Date.now();
      const relKey = `test-uploads/file with spaces-${timestamp}.txt`;

      const result = await storagePut(relKey, testBuffer, "text/plain");

      expect(result).toBeDefined();
      expect(result.url).toBeDefined();
    });
  });
});
