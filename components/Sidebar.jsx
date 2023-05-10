import React from "react";
import { View, StyleSheet } from "react-native";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

const Sidebar = () => {
  return (
    <View style={styles.container}>
      <Navbar />
      <Search />
      <Chats />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default Sidebar;
