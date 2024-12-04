import React, { useState, useEffect, useRef } from "react";
import {
  Animated,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";
import { ProfileFetch } from "../../../domain/Profile";
import ReusableButton from "../../atoms/ReusableButton/index";
import GlobalStyles from "../../globalStyles";
import { logout } from "../../../firebase/authService";
import AuthStackNavigation from "../../../navigations/AuthStackNavigation";

const initialData = [
  { id: "1", label: "Username", infoText: "UserName" },
  { id: "2", label: "Handle", infoText: "@handle" },
  { id: "3", label: "Email Address", infoText: "user@gmail.com" },
  { id: "4", label: "Phone Number", infoText: "123456789" },
  { id: "5", label: "Bio", infoText: "Spring Talk" },
];

const ProfileView = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(initialData);
  const [refreshing, setRefreshing] = useState(false);
  const defaultProfilePic =
    "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";
  const defaultUserName = "Unknown User";
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const loadProfile = async () => {
    try {
      const fetchedProfile = await ProfileFetch.execute();
      setProfile(fetchedProfile);
      console.log(fetchedProfile);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      const updatedData = initialData.map((item) => {
        if (item.label === "Username")
          return { ...item, infoText: profile.name };
        if (item.label === "Handle")
          return { ...item, infoText: profile.user_name };
        if (item.label === "Email Address")
          return { ...item, infoText: profile.email };
        if (item.label === "Phone Number")
          return { ...item, infoText: profile.phone };
        if (item.label === "Bio") return { ...item, infoText: profile.bio };
        return item;
      });
      setData(updatedData);
    }
    // else {
    //   //Buggy behaviour
    //   alert("Profile is not found!");
    //   return;
    // }
  }, [profile]);

  const handleRefresh = async () => {
    setRefreshing(true); //Set refreshing to true when refresh starts
    await loadProfile(); // Reload profile data
    setRefreshing(false); //Set refreshing to false once data is loaded
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleLogOut = () => {
    logout()
      .then(() => {
        // <NavigationContainer>
        //     <AuthStackNavigation />
        // </NavigationContainer>
        // <AuthStackNavigation />
        navigation.navigate("OnBoardingScreen");
      })
      .catch((error) => alert(error.message.toString()));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            navigation.canGoBack()
              ? navigation.goBack()
              : navigation.navigate("Home")
          }>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Profile</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("EditProfile", { profile })}>
          <Ionicons name="create-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[
          styles.profileContainer,
          {
            height: scrollY.interpolate({
              inputRange: [0, 200],
              outputRange: [250, 100],
              extrapolate: "clamp",
            }),
            opacity: scrollY.interpolate({
              inputRange: [0, 200],
              outputRange: [1, 0],
              extrapolate: "clamp",
            }),
          },
        ]}>
        <View style={styles.profile}>
          <Image
            source={{
              uri: profile != null ? profile.profile_pic : defaultProfilePic,
            }}
            style={styles.profileImage}
          />
          <Text style={styles.username}>
            {profile != null ? profile.name : defaultUserName}
          </Text>
          <Text style={styles.userHandle}>
            {profile != null ? profile.user_name : defaultUserName}
          </Text>

          <View style={styles.statusContainer}>
            <Text style={styles.activityText}>Activity Status</Text>
            <Text
              style={
                profile != null && profile.is_online
                  ? styles.onlineStatusText
                  : styles.offlineStatusText
              }>
              {profile != null && profile.is_online ? "Online" : "Offline"}
            </Text>
          </View>
        </View>
      </Animated.View>

      <View style={styles.whiteBackgroundSection}>
        <Animated.FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={styles.infoCard}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.infoText}>{item.infoText}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
        />
        <ReusableButton
          text="Log Out"
          backgroundColor={GlobalStyles.SIGNIN1_BUTTON_COLOR}
          textColor="#FFFFFF" // or any other color you prefer
          onPress={handleLogOut}
          topval={0} // adjust top value as needed
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileView;
