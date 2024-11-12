import React, { useState, useRef, useEffect } from "react";
import {
  Animated,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";
import { ProfileFetch } from "../../../domain/Profile";

const initialData = [
  { id: "1", label: "Username", infoText: "Jhon Abraham" },
  { id: "2", label: "Handle", infoText: "@handle" },
  { id: "3", label: "Email Address", infoText: "abcd@gmail.com" },
  { id: "4", label: "Phone Number", infoText: "(320) 555-0104" },
  { id: "5", label: "Bio", infoText: "My Nic name is Dhruvin Akhaja" },
];

const ProfileView = () => {
  const [openSwipeRef, setOpenSwipeRef] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(initialData);
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const fetchedProfile = await ProfileFetch.execute();
        setProfile(fetchedProfile);
        console.log(fetchedProfile);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      const updatedData = initialData.map((item) => {
        if (item.label === "Username") {
          return { ...item, infoText: profile.name }; // Update Name dynamically
        }
        if (item.label === "Handle") {
          return { ...item, infoText: profile.user_name }; // Update Username dynamically
        }
        if (item.label === "Email Address") {
          return { ...item, infoText: profile.email }; // Update Email dynamically
        }
        if (item.label === "Phone Number") {
          return { ...item, infoText: profile.phone }; // Update Phone dynamically
        }
        if (item.label === "Bio") {
          return { ...item, infoText: profile.bio }; // Update Bio dynamically
        }
        return item;
      });
      setData(updatedData);
      setIsLoading(false);
    }
  }, [profile]);

  if (isLoading) {
    // Show a loading indicator while Firebase is checking the auth state
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleSwipeOpen = (ref) => {
    if (openSwipeRef && openSwipeRef !== ref) {
      openSwipeRef.close();
    }
    setOpenSwipeRef(ref);
  };

  const profileHeight = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: [260, 0],
    extrapolate: "clamp",
  });

  const profileOpacity = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header with title and back button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            navigation.canGoBack()
              ? navigation.goBack()
              : navigation.navigate("Home")
          }
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Profile</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Ionicons name="create-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Profile Pics Slider */}
      <Animated.View
        style={[
          styles.profileContainer,
          { height: profileHeight, opacity: profileOpacity },
        ]}
      >
        <View style={styles.profile}>
          <Image
            source={{
              uri: "https://t3.ftcdn.net/jpg/06/87/23/04/360_F_687230468_RE94FphpxaiYC0mzkBVflRGg16JC1lNG.jpg",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.username}>{profile.name}</Text>
          <Text style={styles.userHandle}>{profile.user_name}</Text>

          <View style={styles.statusContainer}>
            <Text style={styles.activityText}>Activity Status</Text>
            <Text
              style={
                profile.is_online === "true"
                  ? styles.onlineStatusText
                  : styles.offlineStatusText
              }
            >
              {profile.is_online === "true" ? "Online" : "Offline"}
            </Text>
          </View>

          {/* <View style={styles.contactOptions}>
                        <TouchableOpacity style={styles.iconButton}>
                            <Icon name="message" size={28} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <Icon name="videocam" size={28} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <Icon name="call" size={28} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <Icon name="more-horiz" size={28} color="#fff" />
                        </TouchableOpacity>
                    </View> */}
        </View>
      </Animated.View>

      {/* Chat List */}
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
          extraData={openSwipeRef}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false } // Use native driver for better performance
          )}
          scrollEventThrottle={16} // Throttle scroll events for smoother animation
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileView;
