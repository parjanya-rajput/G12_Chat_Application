import React, { useState, useEffect } from 'react';
import { Animated, FlatList, SafeAreaView, ActivityIndicator, Text, View, TouchableOpacity, TextInput, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ChatListItem1 from '../components/molecules/ChatListItem1'; // Import ChatListItem1 directly
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from 'react-native';
import { firestore } from '../firebase/firebase'; // Import firestore from the config file
import { collection, query, onSnapshot } from 'firebase/firestore'; // Use Firestore functions

import { useRoute } from '@react-navigation/native';

const AllUserListScreen = () => {

  const route = useRoute();

  

  const navigation = useNavigation();
  const [openSwipeRef, setOpenSwipeRef] = useState(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]); // Store users in state
  const [filteredUsers, setFilteredUsers] = useState([]); // Store filtered users based on search query

  // Fetch users from Firestore with real-time listener
    useEffect(() => {
        const q = query(collection(firestore, 'users')); // Reference to users collection
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const usersData = snapshot.docs.map(doc => ({
                ...doc.data(), // Spread document data
                id: doc.id,     // Add document id
            }));
            setUsers(usersData);
            setFilteredUsers(usersData); // Initially show all users
        });

        // Cleanup listener
        return () => unsubscribe();
    }, []);

  const handleSwipeOpen = (ref) => {
    if (openSwipeRef && openSwipeRef !== ref) {
      openSwipeRef.close();
    }
    setOpenSwipeRef(ref);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Re-fetch users from Firestore when refreshing
    const q = query(collection(firestore, 'users'));
    onSnapshot(q, (snapshot) => {
      const usersData = snapshot.docs.map(doc => doc.data());
      setUsers(usersData);
      setFilteredUsers(usersData); // Reset to all users after refresh
      setIsLoading(false);
    });
  };

  // Filter users based on the search query
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredUsers(users); // Show all users if the search query is empty
    } else {
      const filteredData = users.filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filteredData);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        {isSearchActive ? (
          <View style={styles.searchContainer}>
            <TouchableOpacity onPress={() => {
                setIsSearchActive(false);
                handleSearch('');
            }}>
              <Icon name="arrow-left" size={25} color="#fff" />
            </TouchableOpacity>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor="#aaa"
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
        ) : (
          <>
            <Text style={styles.headerText}>All Users</Text>
            <TouchableOpacity style={styles.searchButton} onPress={() => setIsSearchActive(true)}>
              <Icon name="magnify" size={25} color="#fff" />
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={[styles.whiteBackgroundSection, isSearchActive && { flex: 1 }]}>
        <Animated.FlatList
          data={filteredUsers} // Render filtered users
          renderItem={({ item }) => (
            <ChatListItem1
              item={item} // Pass the user data directly to ChatListItem1
              onSwipeOpen={handleSwipeOpen}
            />
          )}
          keyExtractor={item => item.user_name} // Use user_name as unique key
          extraData={openSwipeRef}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default AllUserListScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    backgroundColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontFamily: "Caros-Bold",
    color: "#fff",
    fontSize: 24,
  },
  searchButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 25,
  },
  whiteBackgroundSection: {
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
});
