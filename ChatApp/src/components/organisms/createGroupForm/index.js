import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StatusBar, FlatList, Alert, TextInput, TouchableOpacity } from "react-native";
import { Text, CheckBox } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons"; // Add the icon library
import ReusableButton from "../../atoms/ReusableButton/index";
import GlobalStyles from "../../globalStyles";
import styles from "./style";

// Firebase Group Service
import { createGroup } from "../../../data/groupService";
import CustomInput from "../../atoms/InputField";

// Import the GetAllUsers hook
import GetAllUsers from "../../../domain/GetAllUsers";
import { auth } from "../../../firebase/firebase";

const CreateGroupForm = () => {
  const navigation = useNavigation();
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query

  // Fetch users
  const { users, loading, error } = GetAllUsers();

  useEffect(() => {
    // Automatically select the current user
    const currentUser = {
      id: auth.currentUser.uid,
      name: auth.currentUser.displayName,
      email: auth.currentUser.email,
      role: "Admin",
    };
    setSelectedMembers([currentUser]);
  }, []);

  const toggleMemberSelection = (member) => {

    if (member.id === auth.currentUser.uid) {
      Alert.alert("You cannot remove yourself from the group.");
      return;
    }

    const isSelected = selectedMembers.some((selected) => selected.id === member.id);

    if (isSelected) {
      setSelectedMembers(selectedMembers.filter((selected) => selected.id !== member.id));
    } else {
      Alert.alert(
        "Make Admin?",
        `Would you like to make ${member.name} an Admin?`,
        [
          {
            text: "Yes",
            onPress: () =>
              setSelectedMembers([
                ...selectedMembers,
                { ...member, role: "Admin" },
              ]),
          },
          {
            text: "No",
            onPress: () =>
              setSelectedMembers([
                ...selectedMembers,
                { ...member, role: "Member" },
              ]),
          },
        ]
      );
    }
  };

  const handleCreateGroup = () => {
    setIsLoading(true);
    const groupId = `group_${Date.now()}`;

    createGroup(groupId, groupName, description, selectedMembers)
      .then(() => {
        alert(`Group "${groupName}" created successfully!`);
        setIsLoading(false);
        navigation.navigate("GroupList");
      })
      .catch((error) => {
        alert(error.message);
        setIsLoading(false);
      });
  };

  const isFormValid = groupName && description;

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  // Filtered users based on search query
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>Create a New Group</Text>
        <Text style={styles.subtitle}>Set up a group for your friends, family, or team!</Text>

        <CustomInput
          placeholder="Enter group name"
          value={groupName}
          onChangeText={setGroupName}
          autoCapitalize="words"
          leftIconName="group"
        />

        <CustomInput
          placeholder="Enter group description"
          value={description}
          onChangeText={setDescription}
          autoCapitalize="sentences"
          leftIconName="edit"
        />

        <Text style={styles.subtitle}>Select Members:</Text>

        {/* Search Input */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search members by name"
          value={searchQuery}
          onChangeText={setSearchQuery} // Update search query state
        />

        <FlatList
          data={filteredUsers} // Use filtered users based on search query
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CheckBox
              title={item.name}
              checked={selectedMembers.some((selected) => selected.id === item.id)}
              onPress={() => toggleMemberSelection(item)}
            />
          )}
        />

        <ReusableButton
          text="Create Group"
          backgroundColor={
            isFormValid
              ? GlobalStyles.SIGNIN1_BUTTON_COLOR
              : GlobalStyles.SIGNIN_BUTTON_COLOR
          }
          textColor="#FFFFFF"
          onPress={handleCreateGroup}
          topval={0}
          disabled={!isFormValid}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateGroupForm;