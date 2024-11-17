import React from 'react';
import AddMemberScreen from '../components/organisms/addMember/index';

const AddMember = (props) => {
  return (
    <>
      <AddMemberScreen navigation={props.navigation} route={props.route} />
    </>
  );
};

export default AddMember;