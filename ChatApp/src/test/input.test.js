import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import { Input } from 'react-native-elements'; // Import Input for mocking
import CustomInput from '../components/atoms/InputField/index'; // Adjust the import path as necessary

jest.mock('react-native-elements', () => ({
    Input: jest.fn(({ leftIcon, ...props }) => (
        <input {...props} data-left-icon={JSON.stringify(leftIcon)} />
    )),
}));

describe('CustomInput', () => {
    it('renders correctly with given props', () => {
        const testRenderer = TestRenderer.create(
            <CustomInput
                placeholder="Enter text"
                value="test"
                onChangeText={() => { }}
                keyboardType="default"
                autoCapitalize="none"
                secureTextEntry={false}
                textContentType="none"
                leftIconName="user"
                errorMessage="Error message"
            />
        );

        const json = testRenderer.toJSON();
        expect(json).toMatchSnapshot(); // Snapshot test to check rendering
    });

    it('renders left icon correctly', () => {
        const testRenderer = TestRenderer.create(
            <CustomInput
                placeholder="Enter text"
                value=""
                onChangeText={() => { }}
                leftIconName="user"
            />
        );

        const inputInstance = testRenderer.root.findByType('input');

        expect(inputInstance.props['data-left-icon']).toEqual(JSON.stringify({ type: "material", name: "user" })); // Check left icon
    });

    it('displays error message when provided', () => {
        const testRenderer = TestRenderer.create(
            <CustomInput
                placeholder="Enter text"
                value=""
                onChangeText={() => { }}
                errorMessage="This field is required"
            />
        );

        const inputInstance = testRenderer.root.findByType('input');

        expect(inputInstance.props.errorMessage).toEqual("This field is required"); // Check if error message is rendered
    });
});