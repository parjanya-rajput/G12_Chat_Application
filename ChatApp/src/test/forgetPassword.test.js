import React from "react";
import renderer, { act } from "react-test-renderer";
import ForgotPasswordForm from "../components/organisms/forgetPassword/index";
import { resetPassword } from "../firebase/authService";

// Mock necessary modules
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    goBack: jest.fn(),
  }),
}));

jest.mock("../firebase/authService", () => ({
  resetPassword: jest.fn(),
}));

jest.mock("../helper/validateEmail", () => ({
  validateEmail: jest.fn((email) => email.includes("@")), // Simple mock for validation
}));

jest.mock("../components/atoms/InputField", () => "CustomInput");
jest.mock("../components/atoms/ReusableButton", () => "ReusableButton");

describe("ForgotPasswordForm Component", () => {
  it("renders without crashing", () => {
    const tree = renderer.create(<ForgotPasswordForm />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders the back button", () => {
    const tree = renderer.create(<ForgotPasswordForm />).root;
    const backButton = tree.findByType("TouchableOpacity");
    expect(backButton).toBeTruthy();
  });

  it("renders the email input field", () => {
    const tree = renderer.create(<ForgotPasswordForm />).root;
    const emailInput = tree.findByProps({ placeholder: "Enter your email" });
    expect(emailInput).toBeTruthy();
  });

  it("renders the reset password button", () => {
    const tree = renderer.create(<ForgotPasswordForm />).root;
    const resetButton = tree.findByType("ReusableButton");
    expect(resetButton).toBeTruthy();
  });

  it("validates email format correctly", () => {
    const tree = renderer.create(<ForgotPasswordForm />).root;
    const emailInput = tree.findByProps({ placeholder: "Enter your email" });

    // Simulate invalid email input
    act(() => {
      emailInput.props.onChangeText("invalidEmail");
    });

    const errorMessage = tree.findByProps({
      errorMessage: "Invalid email format",
    });
    expect(errorMessage).toBeTruthy();
  });

  it("enables the reset password button for valid email", () => {
    const testRenderer = renderer.create(<ForgotPasswordForm />);

    const testInstance = testRenderer.root;

    // Simulate a valid email change
    act(() => {
      testInstance
        .findByProps({ placeholder: "Enter your email" })
        .props.onChangeText("test@example.com");
    });

    const resetButton = testRenderer.root.findByType("ReusableButton");
    expect(resetButton.props.disabled).toBe(false); // Button should be enabled for valid email
  });

  it("disables the reset password button for invalid email", () => {
    const testRenderer = renderer.create(<ForgotPasswordForm />);

    const testInstance = testRenderer.root;

    // Simulate an invalid email change
    act(() => {
      testInstance
        .findByProps({ placeholder: "Enter your email" })
        .props.onChangeText("invalidEmail");
    });

    const resetButton = testRenderer.root.findByType("ReusableButton");
    expect(resetButton.props.disabled).toBe(true); // Button should be disabled for invalid email
  });
});
