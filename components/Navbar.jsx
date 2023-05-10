import React, { useContext } from "react";
import { View, Text, Image } from "react-native";
import { AuthContext } from "../context/AuthContext";
// import Venom1 from "../img/venom50.png";
import Dalm1 from "../img/dalm11.png";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <View style={styles.navbar}>
      <View style={styles.logo}>
        <Image source={Dalm1} style={styles.logoImage} />
      </View>
      <View style={styles.user}>
        <Image
          source={{ uri: currentUser.photoURL }}
          style={styles.userImage}
        />
        <Text>{currentUser.displayName}</Text>
        {/* <TouchableOpacity onPress={()=>signOut(auth)}><Text>Logout</Text></TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = {
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  logo: {
    marginRight: 8,
  },
  logoImage: {
    width: 50,
    height: 50,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
};

export default Navbar;
