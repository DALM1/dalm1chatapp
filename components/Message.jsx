import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { Image, Text, View } from "react-native";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();
  const options = {
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
  };
  const time = new Date(message.date.toDate()).toLocaleTimeString(
    "fr-US",
    options
  );

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <View
      ref={ref}
      style={[
        styles.message,
        message.senderId === currentUser.uid && styles.owner,
      ]}
    >
      <View style={styles.messageInfo}>
        <Image
          source={{
            uri:
              message.senderId === currentUser.uid
                ? currentUser.photoURL
                : data.user.photoURL,
          }}
          style={styles.profileImage}
        />
        <Text style={styles.messageSender}>
          {message.sender} {time}
        </Text>
      </View>
      <View style={styles.messageContent}>
        <Text style={styles.messageText}>{message.text}</Text>
        {message.img && (
          <Image source={{ uri: message.img }} style={styles.messageImage} />
        )}
      </View>
    </View>
  );
};

const styles = {
  message: {
    flexDirection: "row",
    marginBottom: 10,
  },
  owner: {
    flexDirection: "row-reverse",
  },
  messageInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  messageSender: {
    fontWeight: "bold",
    fontSize: 14,
  },
  messageContent: {
    maxWidth: "70%",
    backgroundColor: "#E5E5EA",
    borderRadius: 10,
    padding: 10,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 5,
  },
  messageImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
  },
};

export default Message;
