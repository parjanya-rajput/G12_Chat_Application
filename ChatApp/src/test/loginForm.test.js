import React from "react";
import renderer from "react-test-renderer";
import LoginForm from "../components/organisms/loginForm/index";

// Mock necessary modules
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock("../firebase/authService", () => ({
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
describe("LoginForm Component", () => {
  it("renders without crashing", () => {
    const tree = renderer.create(<LoginForm />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders the title text", () => {
    const tree = renderer.create(<LoginForm />).root;
    const title = tree.findByProps({ children: "Log in to Chatbox" });
    expect(title).toBeTruthy();
  });

  it("renders the subtitle text", () => {
    const tree = renderer.create(<LoginForm />).root;
    const subtitle = tree.findByProps({
      children:
        "Welcome back! Sign in using your social account or email to continue us",
    });
    expect(subtitle).toBeTruthy();
  });

  it("renders the CustomInput for email", () => {
    const tree = renderer.create(<LoginForm />).root;
    const emailInput = tree.findByProps({ placeholder: "Enter your email" });
    expect(emailInput).toBeTruthy();
  });

  it("renders the CustomInput for password", () => {
    const tree = renderer.create(<LoginForm />).root;
    const passwordInput = tree.findByProps({
      placeholder: "Enter your password",
    });
    expect(passwordInput).toBeTruthy();
  });

  it("renders the ReusableButton for login", () => {
    const tree = renderer.create(<LoginForm />).root;
    const loginButton = tree.findByType("ReusableButton");
    expect(loginButton).toBeTruthy();
  });

  it("renders the forgot password text", () => {
    const tree = renderer.create(<LoginForm />).root;
    const forgotPasswordText = tree.findByProps({
      children: "Forgot password?",
    });
    expect(forgotPasswordText).toBeTruthy();
  });

  it("renders the ActivityIndicator when loading", () => {
    const testRenderer = renderer.create(<LoginForm />);
    const instance = testRenderer.getInstance();
    instance.setState({ isLoading: true });
    const activityIndicator = testRenderer.root.findByType("ActivityIndicator");
    expect(activityIndicator).toBeTruthy();
  });
});
