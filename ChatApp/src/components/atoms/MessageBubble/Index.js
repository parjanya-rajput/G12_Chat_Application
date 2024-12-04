// src/components/atoms/MessageBubble.js

import React from "react";
import { View, Text } from "react-native";
import styles from "./Styles";

const MessageBubble = ({
  message,
  isOutgoing,
  timestamp,
  status,
  searchQuery,
  senderName,
}) => {
  //   const formattedTime = new Date(timestamp).toLocaleString('en-US', {
  //     hour: 'numeric',
  //     minute: 'numeric',
  //     hour12: true,

  //   });

  const highlightedMessage = message.split(" ").map((word, index) => {
    const isHighlighted =
      searchQuery && word.toLowerCase().includes(searchQuery.toLowerCase());
    return (
      <Text
        key={index}
        style={[styles.messageText, isHighlighted && styles.highlightedText]}>
        {word}{" "}
      </Text>
    );
  });

  return (
    <View style={isOutgoing ? styles.outgoingBubble : styles.incomingBubble}>
      {!isOutgoing && senderName && (
        <Text style={styles.senderName}>{senderName}</Text>
      )}
      <Text style={styles.messageText}>{highlightedMessage}</Text>
      {isOutgoing && (
        <View style={styles.timestampContainer}>
          <Text style={styles.timestamp}>
            {timestamp?.seconds
              ? new Date(timestamp.seconds * 1000).toLocaleTimeString()
              : ""}
          </Text>
          {status === "sent" ? (
            <Text style={[styles.statusIcon, styles.sentIcon]}>✓</Text>
          ) : (
            <Text style={[styles.statusIcon, styles.seenIcon]}>✓✓</Text>
          )}
        </View>
      )}
      {!isOutgoing && (
        <View style={styles.timestampContainer}>
          <Text style={styles.timestamp}>
            {timestamp?.seconds
              ? new Date(timestamp.seconds * 1000).toLocaleTimeString()
              : ""}
          </Text>
        </View>
      )}
    </View>
  );
};

export default MessageBubble;
