import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';
import ChatListItem1 from '../components/molecules/ChatListItem1'; // Adjust the import path
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase/firebase';
import { getFirestore, collection, query, where, getDocs, setDoc, Timestamp } from 'firebase/firestore';

jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
}));

jest.mock('../firebase/firebase', () => ({
    auth: {
        currentUser: { uid: 'mockUserId' },
    },
}));

jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(),
    collection: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    getDocs: jest.fn(),
    setDoc: jest.fn(),
    doc: jest.fn(() => ({ id: 'newDocId' })),
    Timestamp: { fromDate: jest.fn(() => 'mockTimestamp') },
}));

describe('ChatListItem1', () => {
    let mockNavigation;
    const mockItem = {
        id: 'senderId',
        name: 'Test User',
        bio: 'Hello World',
        profile_pic: 'https://example.com/profile.jpg',
    };

    beforeEach(() => {
        mockNavigation = { navigate: jest.fn() };
        useNavigation.mockReturnValue(mockNavigation);
    });

    it('renders correctly', () => {
        const testRenderer = TestRenderer.create(
            <ChatListItem1 item={mockItem} />
        );
        expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('navigates to ProfilePicView on profile image press', () => {
        const testRenderer = TestRenderer.create(
            <ChatListItem1 item={mockItem} />
        );

        const profilePicButton = testRenderer.root.findAllByType(TouchableOpacity)[0];
        act(() => profilePicButton.props.onPress());

        expect(mockNavigation.navigate).toHaveBeenCalledWith('ProfilePicView', {
            dpImage: mockItem.profile_pic,
            groupName: mockItem.name,
        });
    });

    // it('calls addConversation when username is pressed', async () => {
    //     const mockSetDoc = jest.fn();
    //     const mockGetDocs = jest.fn(() => ({
    //         docs: [
    //             {
    //                 data: () => ({
    //                     participant_ids: ['mockUserId', 'senderId'],
    //                 }),
    //             },
    //         ],
    //     }));

    //     getDocs.mockImplementation(mockGetDocs);
    //     setDoc.mockImplementation(mockSetDoc);

    //     const testRenderer = TestRenderer.create(
    //         <ChatListItem1 item={mockItem} />
    //     );

    //     const usernameButton = testRenderer.root.findAllByType(TouchableOpacity)[1];
    //     await act(() => usernameButton.props.onPress());

    //     expect(getDocs).toHaveBeenCalledTimes(1);
    //     expect(mockSetDoc).not.toHaveBeenCalled(); // Because conversation already exists
    // });

    // it('creates a new conversation if not existing', async () => {
    //     const mockSetDoc = jest.fn();
    //     const mockGetDocs = jest.fn(() => ({ docs: [] })); // No existing conversation

    //     getDocs.mockImplementation(mockGetDocs);
    //     setDoc.mockImplementation(mockSetDoc);

    //     const testRenderer = TestRenderer.create(
    //         <ChatListItem1 item={mockItem} />
    //     );

    //     const usernameButton = testRenderer.root.findAllByType(TouchableOpacity)[1];
    //     await act(() => usernameButton.props.onPress());

    //     expect(getDocs).toHaveBeenCalledTimes(1);
    //     expect(setDoc).toHaveBeenCalledWith(expect.any(Object), {
    //         last_message: 'Last message seen here',
    //         last_message_timestamp: 'mockTimestamp',
    //         participant_ids: ['mockUserId', 'senderId'],
    //     });
    // });


});
