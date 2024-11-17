// GroupListScreen 
import React from 'react';

import GroupList from '../components/organisms/groupList';

const GroupListScreen = (props) => {
    return (
        <GroupList  navigation={props.navigation}/>
    );
};

export default GroupListScreen;