import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists && setMessages(doc.data().messages);
    });

    return () => unsubscribe();
  }, [data.chatId]);

  console.log(messages);

  return (
    <View style={styles.messages}>
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </View>
  );
};

const styles = {
  messages: {
    flex: 1,
    padding: 10,
  },
};

export default Messages;
