import React from "react";
import renderer from "react-test-renderer";
import SignUpForm from "../components/organisms/signUpForm/index";

// Mock necessary modules
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    replace: jest.fn(),
  }),
}));

jest.mock("../firebase/authService", () => ({
  signUp: jest.fn(),
  signIn: jest.fn(),
}));

jest.mock("../helper/validateEmail", () => ({
  validateEmail: jest.fn(),
}));

jest.mock("../helper/validatePassword", () => ({
  validatePassword: jest.fn(),
}));

jest.mock("../components/atoms/InputField", () => "CustomInput");
jest.mock("../components/atoms/ReusableButton", () => "ReusableButton");

// Test suite
describe("SignUpForm Component", () => {
  it("renders without crashing", () => {
    const tree = renderer.create(<SignUpForm />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders the title text", () => {
    const tree = renderer.create(<SignUpForm />).root;
    const title = tree.findByProps();
    expect(title).toBeTruthy();
  });

  it("renders the CustomInput for name", () => {
    const tree = renderer.create(<SignUpForm />).root;
    const nameInput = tree.findByProps({ placeholder: "Enter your name" });
    expect(nameInput).toBeTruthy();
  });

  it("renders the CustomInput for email", () => {
    const tree = renderer.create(<SignUpForm />).root;
    const emailInput = tree.findByProps({ placeholder: "Enter your email" });
    expect(emailInput).toBeTruthy();
  });

  it("renders the CustomInput for password", () => {
    const tree = renderer.create(<SignUpForm />).root;
    const passwordInput = tree.findByProps({
      placeholder: "Enter your password",
    });
    expect(passwordInput).toBeTruthy();
  });

  it("renders the CustomInput for confirm password", () => {
    const tree = renderer.create(<SignUpForm />).root;
    const confirmPasswordInput = tree.findByProps({
      placeholder: "Confirm your password",
    });
    expect(confirmPasswordInput).toBeTruthy();
  });

  it("renders the ReusableButton for sign up", () => {
    const tree = renderer.create(<SignUpForm />).root;
    const button = tree.findByType("ReusableButton");
    expect(button).toBeTruthy();
  });

  it("renders the ActivityIndicator when loading", () => {
    const testRenderer = renderer.create(<SignUpForm />);
    const instance = testRenderer.getInstance();
    instance.setState({ isLoading: true });
    const activityIndicator = testRenderer.root.findByType("ActivityIndicator");
    expect(activityIndicator).toBeTruthy();
  });
});
