// Unit tests for: validateEmail

import { validateEmail } from "../validateEmail";

// Import the function to be tested
describe("validateEmail() validateEmail method", () => {
  // Happy Path Tests
  describe("Happy Paths", () => {
    test("should return true for a valid email with simple structure", () => {
      const input = "test@example.com";
      const result = validateEmail(input);
      expect(result).toBe(true);
    });

    test("should return true for a valid email with subdomain", () => {
      const input = "test@sub.example.com";
      const result = validateEmail(input);
      expect(result).toBe(true);
    });

    test("should return true for a valid email with plus sign", () => {
      const input = "test+alias@example.com";
      const result = validateEmail(input);
      expect(result).toBe(true);
    });

    test("should return true for a valid email with numbers", () => {
      const input = "user123@example.com";
      const result = validateEmail(input);
      expect(result).toBe(true);
    });

    test("should return true for a valid email with hyphen", () => {
      const input = "user-name@example.com";
      const result = validateEmail(input);
      expect(result).toBe(true);
    });
  });

  // Edge Case Tests
  describe("Edge Cases", () => {
    test('should return false for an email without "@" symbol', () => {
      const input = "testexample.com";
      const result = validateEmail(input);
      expect(result).toBe(false);
    });

    test("should return false for an email without domain", () => {
      const input = "test@.com";
      const result = validateEmail(input);
      expect(result).toBe(false);
    });

    test("should return false for an email without top-level domain", () => {
      const input = "test@example";
      const result = validateEmail(input);
      expect(result).toBe(false);
    });

    test("should return false for an email with spaces", () => {
      const input = "test @example.com";
      const result = validateEmail(input);
      expect(result).toBe(false);
    });

    test("should return false for an empty string", () => {
      const input = "";
      const result = validateEmail(input);
      expect(result).toBe(false);
    });

    test("should return false for a null input", () => {
      const input = null;
      const result = validateEmail(input);
      expect(result).toBe(false);
    });

    test("should return false for an undefined input", () => {
      const input = undefined;
      const result = validateEmail(input);
      expect(result).toBe(false);
    });

    test("should return false for an email with consecutive dots", () => {
      const input = "test..email@example.com";
      const result = validateEmail(input);
      expect(result).toBe(false);
    });

    test("should return false for an email with special characters", () => {
      const input = "test!email@example.com";
      const result = validateEmail(input);
      expect(result).toBe(false);
    });
  });
});

// End of unit tests for: validateEmail
