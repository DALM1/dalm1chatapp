import React, { useContext, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { ChatContext } from "../context/ChatContext";
import Burger from "./Burger";

const Chat = () => {
  const { data } = useContext(ChatContext);
  const [showBurger, setShowBurger] = useState(false);

  const handleShowBurger = () => {
    setShowBurger(!showBurger);
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingTop: 16,
        }}
      >
        <Text>{data.user?.displayName}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => signOut(auth)}>
            <Text style={{ marginRight: 16 }}>LOG OUT</Text>
          </TouchableOpacity>
          <Image
            source={Cam}
            style={{ width: 24, height: 24, marginRight: 16 }}
          />
          <Image
            source={Add}
            style={{ width: 24, height: 24, marginRight: 16 }}
          />
          <TouchableOpacity onPress={handleShowBurger}>
            <Image source={More} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </View>
      </View>
      <Messages />
      <Input />
      {showBurger && <Burger setShowBurger={handleShowBurger} />}
    </View>
  );
};

export default Chat;
