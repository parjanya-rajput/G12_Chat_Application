// Unit tests for: validatePassword

import { validatePassword } from "../validatePassword";

// Import the function to be tested
describe("validatePassword() validatePassword method", () => {
  // Happy Path Tests
  describe("Happy Paths", () => {
    test("should return true for a password with exactly 8 characters", () => {
      const password = "12345678";
      const result = validatePassword(password);
      expect(result).toBe(true);
    });

    test("should return true for a password with more than 8 characters", () => {
      const password = "123456789";
      const result = validatePassword(password);
      expect(result).toBe(true);
    });

    test("should return true for an empty password", () => {
      const password = "";
      const result = validatePassword(password);
      expect(result).toBe(true);
    });
  });

  // Edge Case Tests
  describe("Edge Cases", () => {
    test("should return false for a password with less than 8 characters", () => {
      const password = "1234567";
      const result = validatePassword(password);
      expect(result).toBe(false);
    });

    test("should return true for a password with exactly 0 characters (empty string)", () => {
      const password = "";
      const result = validatePassword(password);
      expect(result).toBe(true);
    });

    test("should handle a password with special characters and return true if length is 8 or more", () => {
      const password = "!@#$%^&*";
      const result = validatePassword(password);
      expect(result).toBe(true);
    });

    test("should handle a password with special characters and return false if length is less than 8", () => {
      const password = "!@#$%^&";
      const result = validatePassword(password);
      expect(result).toBe(false);
    });

    test("should handle a password with spaces and return true if length is 8 or more", () => {
      const password = "1234 5678";
      const result = validatePassword(password);
      expect(result).toBe(true);
    });

    test("should handle a password with spaces and return false if length is less than 8", () => {
      const password = "123 456";
      const result = validatePassword(password);
      expect(result).toBe(false);
    });
  });
});

// End of unit tests for: validatePassword
