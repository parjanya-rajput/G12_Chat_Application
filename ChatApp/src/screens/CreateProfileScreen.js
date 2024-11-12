import React from "react";
import CreateProfile from "../components/organisms/createProfile";

const CreateProfileScreen = (props) => {
  return (
    <>
      <CreateProfile navigation={props.navigation} />
    </>
  );
};

export default CreateProfileScreen;