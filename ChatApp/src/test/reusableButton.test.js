// Unit tests for: ReusableButton

import React from 'react';
import renderer from 'react-test-renderer';
import ReusableButton from '../components/atoms/ReusableButton/index';

describe('ReusableButton() ReusableButton method', () => {
  // Happy Path Tests
  describe('Happy Paths', () => {
    it('should render the button with the correct text', () => {
      // Test to ensure the button renders with the correct text
      const component = renderer.create(
        <ReusableButton text="Click Me" backgroundColor="#000" textColor="#fff" />
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
      expect(tree.children[0].children[0]).toBe('Click Me');
    });

    it('should apply the correct background color when not disabled', () => {
      // Test to ensure the button has the correct background color when enabled
      const component = renderer.create(
        <ReusableButton text="Click Me" backgroundColor="#000" textColor="#fff" />
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
      expect(tree.props.style.backgroundColor).toBe('#000');
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should apply the disabled style when the button is disabled', () => {
      // Test to ensure the button has the correct style when disabled
      const component = renderer.create(
        <ReusableButton text="Click Me" disabled={true} />
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
      expect(tree.props.style.backgroundColor).toBe('#cccccc');
    });

  });
});

// End of unit tests for: ReusableButton
