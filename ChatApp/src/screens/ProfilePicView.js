import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; // Replace with appropriate icon library if not using Expo

const FloatingProfileModal = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            {/* Touchable Icon */}
            <TouchableOpacity onPress={openModal} style={styles.touchableIcon}>
                <Ionicons name="person-circle-outline" size={40} color="#fff" />
            </TouchableOpacity>

            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {/* Profile Photo */}
                        <Image
                            source={{
                                uri: 'https://via.placeholder.com/150', // Replace with dynamic image URL
                            }}
                            style={styles.profilePhoto}
                        />

                        {/* Name */}
                        <Text style={styles.profileName}>John Doe</Text>

                        {/* Action Buttons */}
                        <View style={styles.actions}>
                            <TouchableOpacity style={styles.actionButton}>
                                <Ionicons name="chatbubble-outline" size={30} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton}>
                                <Ionicons name="call-outline" size={30} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton}>
                                <MaterialIcons name="video-call" size={30} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton}>
                                <Ionicons name="information-circle-outline" size={30} color="#fff" />
                            </TouchableOpacity>
                        </View>

                        {/* Close Modal Button */}
                        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                            <Text style={styles.closeText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212', // Background for your main screen
    },
    touchableIcon: {
        margin: 20,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#2c2c2c',
        borderRadius: 10,
        alignItems: 'center',
        padding: 20,
    },
    profilePhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 20,
    },
    actionButton: {
        backgroundColor: '#444',
        padding: 10,
        borderRadius: 10,
    },
    closeButton: {
        marginTop: 10,
    },
    closeText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default FloatingProfileModal;