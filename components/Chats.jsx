import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <View style={styles.container}>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => {
          const hasNewMessage =
            chat[1].lastMessage?.senderId !== currentUser.uid &&
            !chat[1].lastMessage?.read;
          return (
            <TouchableOpacity
              style={styles.userChat}
              key={chat[0]}
              onPress={() => handleSelect(chat[1].userInfo)}
            >
              <Image
                source={{ uri: chat[1].userInfo.photoURL }}
                style={styles.userChatImage}
              />
              <View style={styles.userChatInfo}>
                <Text style={styles.userChatName}>
                  {chat[1].userInfo.displayName}
                </Text>
                <Text style={styles.userChatMessage}>
                  {chat[1].lastMessage?.text}
                </Text>
                {hasNewMessage && (
                  <View style={styles.newMessageIndicator}></View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  userChat: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userChatImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userChatInfo: {
    flex: 1,
  },
  userChatName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  userChatMessage: {
    color: "#777",
  },
  newMessageIndicator: {
    backgroundColor: "blue",
    width: 10,
    height: 10,
    borderRadius: 5,
    position: "absolute",
    top: 5,
    right: 5,
  },
});

export default Chats;
