import React, { useState, useRef } from "react";
import {
  Animated,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Switch,
  Alert,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import ReusableButton from "../../atoms/ReusableButton";
import GlobalStyles from "../../globalStyles";
import styles from "./style";

import { ProfileCreate } from "../../../domain/Profile";

import { useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import HomeStackNavigation from "../../../navigations/HomeStackNavigation";

const CLOUD_NAME = "daayhy7z8";
const UPLOAD_PRESET = "g12-chat-app";

const CreateProfile = () => {
  const route = useRoute();
  const { user } = route.params;

  const [name, setName] = useState(user.displayName);
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(user.email); // Static email
  const [profilePic, setProfilePic] = useState(
    "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
  );
  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const profileHeight = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: [290, 0],
    extrapolate: "clamp",
  });

  const profileOpacity = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const handleProfilePicChange = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!result.granted) {
      Alert.alert(
        "Permission Required",
        "You need to grant permissions to access the camera or gallery."
      );
      return;
    }

    const options = [
      { text: "Cancel", style: "cancel" },
      {
        text: "Take Photo",
        onPress: async () => {
          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
          handleImageResult(result);
        },
      },
      {
        text: "Choose from Gallery",
        onPress: async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });
          handleImageResult(result);
        },
      },
    ];

    Alert.alert("Select Profile Picture", "Choose an option", options);
  };

  const handleImageResult = async (result) => {
    if (result.canceled) {
      // Changed from cancelled to canceled
      console.log("User canceled image selection");
      return;
    }

    // Check if there are any assets selected
    if (!result.assets || result.assets.length === 0) {
      Alert.alert("Error", "No image was selected.");
      return;
    }

    const imageUri = result.assets[0].uri;
    if (!imageUri) {
      Alert.alert("Error", "Failed to retrieve the image URI.");
      return;
    }

    try {
      setIsLoading(true);
      const cloudinaryUrl = await uploadImageToCloudinary(imageUri);
      if (cloudinaryUrl) {
        setProfilePic(cloudinaryUrl);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to upload image.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImageToCloudinary = async (imageUri) => {
    if (!imageUri) {
      throw new Error("Image URI is undefined");
    }

    try {
      const data = new FormData();
      const fileType = imageUri.split(".").pop();
      const file = {
        uri: imageUri,
        type: `image/${fileType}`,
        name: `upload.${fileType}`,
      };

      data.append("file", file);
      data.append("upload_preset", UPLOAD_PRESET);
      data.append("cloud_name", CLOUD_NAME);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Upload failed");
      }

      const result = await response.json();
      setProfilePic(result.secure_url);
      if (!result.secure_url) {
        throw new Error("No URL in response");
      }

      return result.secure_url;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  const handleEmailFieldPress = () => {
    Alert.alert("Uneditable Field", "This field cannot be edited.", [
      { text: "OK", onPress: () => { } },
    ]);
  };

  const handleCreateProfile = async () => {
    setIsLoading(true);

    try {
      if (!name || !bio || !phone) {
        alert("Please fill all the fields.");
        setIsLoading(false);
        return;
      }

      // Check if user is verified before procedding to create profile
      // if (!user.emailVerified) {
      //   alert("Please verify your email address before creating a profile.");
      //   setIsLoading(false);
      //   return;
      // }
      await ProfileCreate.execute({
        name,
        bio,
        phone,
        profilePic,
        isOnline,
      });
      setIsLoading(false);
      alert("Profile created successfully!");
      navigation.replace("Home");
    } catch (error) {
      alert(error.message);
    }
  };

  if (isLoading) {
    // Show a loading indicator while Firebase is checking the auth state
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Profile</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        scrollEventThrottle={16}
        style={styles.scrollView}>
        <Animated.View
          style={[
            styles.profileContainer,
            { height: profileHeight, opacity: profileOpacity },
          ]}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: profilePic }} style={styles.profileImage} />

            {/* Add Upload DP Button */}
            <TouchableOpacity
              style={styles.uploadButtonOnImage}
              onPress={handleProfilePicChange}>
              <Icon name="camera-alt" size={18} color="#fff" />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.usernameInput}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor="#888"
          />
          <Text style={styles.userHandle}>{email}</Text>

          <View style={styles.statusContainer}>
            <Text style={styles.activityText}>Activity Status</Text>
            <View style={styles.statusToggleContainer}>
              <Text
                style={[
                  styles.statusText,
                  isOnline ? styles.online : styles.offline,
                ]}>
                {isOnline ? "Online" : "Offline"}
              </Text>
              <Switch
                value={isOnline}
                onValueChange={() => setIsOnline((prevState) => !prevState)}
                trackColor={{ false: "#f00", true: "#4CAF50" }}
                thumbColor={isOnline ? "#4CAF50" : "#f00"}
              />
            </View>
          </View>
        </Animated.View>

        <View style={styles.whiteBackgroundSection}>
          <View style={styles.infoCard}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.infoInput}
              value={name}
              onChangeText={setName}
              placeholder="Enter your Name"
              placeholderTextColor="#888"
            />
          </View>

          {/* Email Field - Read-only */}
          <View style={styles.infoCard}>
            <Text style={styles.label}>Email</Text>
            <TouchableOpacity onPress={handleEmailFieldPress}>
              <TextInput
                style={[styles.infoInput, styles.readOnlyEmail]}
                value={email}
                editable={false} // Makes the field uneditable
                placeholderTextColor="#888"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.infoInput}
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              placeholderTextColor="#888"
            />
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={styles.infoInput}
              value={bio}
              onChangeText={setBio}
              placeholder="Enter your Bio"
              placeholderTextColor="#888"
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.saveButtonContainer}>
        <ReusableButton
          text="Create Profile"
          backgroundColor={GlobalStyles.SIGNIN1_BUTTON_COLOR}
          textColor="#FFFFFF"
          onPress={handleCreateProfile}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateProfile;
