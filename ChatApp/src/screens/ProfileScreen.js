import React, { useState, useRef } from 'react';
import { Animated, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


const data = [
  { id: '1', label: 'Username', infoText: 'Jhon Abraham' },
  { id: '2', label: 'Handle', infoText: '@handle' },
  { id: '3', label: 'Email Address', infoText: 'abcd@gmail.com' },
  { id: '4', label: 'Phone Number', infoText: '(320) 555-0104' },
  { id: '5', label: 'Bio', infoText: 'My Nic name is Dhruvin Akhaja' },
  { id: '6', label: 'Created At', infoText: '12th Nov , 2024' },
];

const ProfileScreen = () => {
  // const { name, DP } = route.params;
    const [openSwipeRef, setOpenSwipeRef] = useState(null);
    const scrollY = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();

    const handleSwipeOpen = (ref) => {
        if (openSwipeRef && openSwipeRef !== ref) {
            openSwipeRef.close();
        }
        setOpenSwipeRef(ref);
    };

    const profileHeight = scrollY.interpolate({
        inputRange: [0, 300],
        outputRange: [260, 0],
        extrapolate: 'clamp',
    });

    const profileOpacity = scrollY.interpolate({
        inputRange: [0, 300],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    // const updatedData = data.map(item => {
    //     if (item.label === 'Name') {
    //         return { ...item, infoText: name };  // Update Name dynamically
    //     }
    //     if (item.label === 'Username') {
    //         return { ...item, infoText: '@' + name.toLowerCase().replace(' ', '') };  // Update Username dynamically
    //     }
    //     if (item.label === 'Email Address') {
    //         return { ...item, infoText: name.toLowerCase().replace(' ', '') + '@gmail.com' };  // Update Email dynamically
    //     }
    //     return item;
    // });

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header with title and back button */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate("Home")}>
                    <Icon name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>User Profile</Text>
                <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile')}>
                  <Ionicons name="create-outline" size={24} color="#4CAF50" />
                </TouchableOpacity>
            </View>

            {/* Profile Pics Slider */}
            <Animated.View
                style={[styles.profileContainer, { height: profileHeight, opacity: profileOpacity }]}
            >
                <View style={styles.profile}>
                    <Image 
                        source={{ uri: "https://t3.ftcdn.net/jpg/06/87/23/04/360_F_687230468_RE94FphpxaiYC0mzkBVflRGg16JC1lNG.jpg" }} 
                        style={styles.profileImage} 
                    />
                    <Text style={styles.username}>Jhon Abraham</Text>
                    <Text style={styles.userHandle}>@jhonabraham</Text>

                    <View style={styles.statusContainer}>
                      <Text style={styles.activityText}>Activity Status</Text>
                      <Text style={styles.statusText}>Online</Text>
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
                    keyExtractor={item => item.id}
                    extraData={openSwipeRef}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false }  // Use native driver for better performance
                    )}
                    scrollEventThrottle={16}  // Throttle scroll events for smoother animation
                />
            </View>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  editButton: {
    alignSelf : 'center',
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
  statusText: {
    fontSize: 14,
    color: '#4CAF50',  // Green color for "Online"
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






