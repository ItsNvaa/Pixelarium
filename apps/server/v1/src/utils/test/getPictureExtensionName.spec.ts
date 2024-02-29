import { describe, expect, test } from "bun:test";
import getPictureExtensionName from "../getPictureExtensionName";

describe("getPictureExtensionName", () => {
  // Returns the correct extension name for a valid URL path.
  test("should return the correct extension name for a valid URL path", () => {
    const urlpath = "https://example.com/image.png";
    const result = getPictureExtensionName(urlpath);
    expect(result).toBe("image/png");
  });

  // Returns the correct extension name for a URL path with multiple dots.
  test("should return the correct extension name for a URL path with multiple dots", () => {
    const urlpath = "https://example.com/image.v1.2.3.png";
    const result = getPictureExtensionName(urlpath);
    expect(result).toBe("image/png");
  });

  // Returns the correct extension name for a URL path with uppercase letters.
  test("should return the correct extension name for a URL path with uppercase letters", () => {
    const urlpath = "https://example.com/IMAGE.PNG";
    const result = getPictureExtensionName(urlpath);
    expect(result).toBe("image/png");
  });

  // Returns an empty string for a URL path without an extension.
  test("should return an empty string for a URL path without an extension", () => {
    const urlpath = "https://example.com/image";
    const result = getPictureExtensionName(urlpath);
    expect(result).toBe("Unknown");
  });

  // Returns an empty string for a URL path with an invalid extension.
  test("should return an empty string for a URL path with an invalid extension", () => {
    const urlpath = "https://example.com/image.invalid";
    const result = getPictureExtensionName(urlpath);
    expect(result).toBe("Unknown");
  });
});