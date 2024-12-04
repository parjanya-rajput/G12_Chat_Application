import React from "react";
import renderer, { act } from "react-test-renderer";
import OnBoradingForm from "../components/organisms/onBoardingForm";
import { useNavigation } from "@react-navigation/native";
import ReusableButton from "../components/atoms/ReusableButton";

// Mock necessary modules
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock("", () => "ReusableButton");

describe("OnBoradingForm Component", () => {
  it("renders the 'Sign up with mail' button", () => {
    const tree = renderer.create(<OnBoradingForm />).root;
    const signUpButton = tree.findByProps({ text: "Sign up with mail" });
    expect(signUpButton).toBeTruthy();
  });

  it("navigates to the 'Signup' screen when 'Sign up with mail' button is pressed", () => {
    const mockNavigate = jest.fn();
    const tree = renderer.create(
      <OnBoradingForm navigation={{ navigate: mockNavigate }} />
    ).root;
    const signUpButton = tree.findByProps({ text: "Sign up with mail" });

    act(() => {
      signUpButton.props.onPress(); // Simulate button press
    });

    expect(mockNavigate).toHaveBeenCalledWith("Signup");
  });
});
