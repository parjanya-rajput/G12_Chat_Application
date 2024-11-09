import React from 'react'
import Chat from '../components/organisms/chat'
const ChatScreen = ({ route, navigation }) => {
    return (
        <Chat route={route} navigation={navigation} />
    )
}

export default ChatScreen