import React from 'react';
import TestRenderer from 'react-test-renderer';
import MessageBubble from '../components/atoms/MessageBubble/Index'; // Adjust the path as necessary

describe('MessageBubble Component', () => {
  it('renders correctly with given props', () => {
    const testRenderer = TestRenderer.create(
      <MessageBubble
        message="Hello World"
        isOutgoing={true}
        status="sent"
        searchQuery=""
      />
    );

    const json = testRenderer.toJSON();
    expect(json).toMatchSnapshot(); // Snapshot test to check rendering
  });

  it('does not highlight text when searchQuery does not match', () => {
    const testRenderer = TestRenderer.create(
      <MessageBubble
        message="Hello World"
        isOutgoing={true}
        status="sent"
        searchQuery="unrelated"
      />
    );

    const highlightedText = testRenderer.root.findAllByProps({
      style: expect.objectContaining({ backgroundColor: 'yellow' }),
    });
    expect(highlightedText.length).toBe(0); // Check that no text is highlighted
  });
});
