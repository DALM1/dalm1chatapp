import React from "react";
import { View, StyleSheet } from "react-native";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

const Home = () => {
  return (
    <View style={styles.home}>
      <View style={styles.container}>
        <Sidebar />
        <Chat />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: "row",
  },
});

export default Home;
