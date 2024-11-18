import React, { useState, useEffect, useRef } from "react";
import {
  Animated,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const initialData = [
  { id: '1', label: 'Username', infoText: 'UserName' },
  { id: '2', label: 'Handle', infoText: '@handle' },
  { id: '3', label: 'Email Address', infoText: 'user@gmail.com' },
  { id: '4', label: 'Phone Number', infoText: '123456789' },
  { id: '5', label: 'Bio', infoText: 'Spring Talk' },
];

const ProfileView = () => {

    const route = useRoute();
    const { profile } = route.params;
//   const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(initialData);
  const [refreshing, setRefreshing] = useState(false); // Step 1: Define a refreshing state
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
      const updatedData = initialData.map(item => {
        if (item.label === 'Username') return { ...item, infoText: profile.name };
        if (item.label === 'Handle') return { ...item, infoText: profile.user_name };
        if (item.label === 'Email Address') return { ...item, infoText: profile.email };
        if (item.label === 'Phone Number') return { ...item, infoText: profile.phone };
        if (item.label === 'Bio') return { ...item, infoText: profile.bio };
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
    setRefreshing(true); // Step 2: Set refreshing to true when refresh starts
    await loadProfile(); // Reload profile data
    setRefreshing(false); // Step 3: Set refreshing to false once data is loaded
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
        <Text style={styles.headerTitle}>User Details</Text>
        {/* <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("EditProfile", { profile })}
        >
          <Ionicons name="create-outline" size={24} color="#4CAF50" />
        </TouchableOpacity> */}
      </View>

      <Animated.View
        style={[styles.profileContainer, { height: profileHeight, opacity: profileOpacity }]}
      >
        <View style={styles.profile}>
          <Image
            source={{ uri: profile.profile_pic }}
            style={styles.profileImage}
          />
          <Text style={styles.username}>{profile.name}</Text>
          <Text style={styles.userHandle}>{profile.user_name}</Text>

          <View style={styles.statusContainer}>
            <Text style={styles.activityText}>Activity Status</Text>
            <Text style={profile != null && profile.is_online === 'true' ? styles.onlineStatusText : styles.offlineStatusText}>
              {profile != null && profile.is_online === 'true' ? 'Online' : 'Offline'}
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
          onRefresh={handleRefresh} // Refresh function
          refreshing={refreshing} // Step 4: Bind refreshing state to FlatList's refreshing prop
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileView;


import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#000",
        // marginTop : 0.05*height,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center', // Centers content horizontally
        alignItems: 'center',    // Centers content vertically
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    backButton: {
        position: 'absolute',
        top : 50,
        left: 20,
    },
    headerTitle: {
        textAlign: 'center',    // Ensures the text itself is centered
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    editButton: {
        alignSelf: 'center',
        backgroundColor: 'black',
        borderRadius: 50,
        padding: 10,
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 3,
    },
    statusContainer: {
        backgroundColor: '#000',  // Black background
        width: '100%',
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,  // Add padding for left and right spacing
        marginTop: 5,
    },
    activityText: {
        fontSize: 14,
        color: '#fff',  // White color for "Activity Status" label
    },
    onlineStatusText: {
        fontSize: 14,
        color: '#4CAF50',  // Green color for "Online"
        fontWeight: 'bold',
    },
    offlineStatusText: {
        fontSize: 14,
        color: 'red',  // Green color for "Online"
        fontWeight: 'bold',
    },
    profileContainer: {
        overflow: "hidden",
    },
    profile: {},
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: 20,
        borderWidth: 2,
        borderColor: '#FFD700',
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginTop: 10,
    },
    userHandle: {
        fontSize: 16,
        color: '#aaa',
        textAlign: 'center',
        marginBottom: 20,
    },
    contactOptions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    iconButton: {
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 25,
    },
    whiteBackgroundSection: {
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        backgroundColor: "#fff",
        flex: 1,
        paddingTop: 20,
    },
    infoCard: {
        backgroundColor: '#f2f2f2',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 15,
        borderRadius: 10,
        elevation: 2,
    },
    label: {
        fontSize: 14,
        color: '#888',
    },
    infoText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});
