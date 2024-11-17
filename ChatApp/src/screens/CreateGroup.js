// CreateGroup.js in screens

import React from 'react'
import CreateGroupForm from '../components/organisms/createGroupForm/index'
const CreateGroup = (props) => {
  return (
    <>
      <CreateGroupForm navigation={props.navigation}/>
    </>
  )
}

export default CreateGroup