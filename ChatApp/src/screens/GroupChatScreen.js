import { View, Text } from 'react-native'
import React from 'react'
import GroupChat from '../components/organisms/groupChat'
const GroupChatScreen = ({ route }) => {
  return (
    <GroupChat route={route}/>
  )
}

export default GroupChatScreen