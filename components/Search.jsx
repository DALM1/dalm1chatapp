import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "@react-native-firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { TextInput, View, Text, TouchableOpacity, Image } from "react-native";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async (searchTerm) => {
    setUsername(searchTerm);

    const q = query(
      collection(db, "users"),
      where("displayName", "==", searchTerm)
    );

    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size > 0) {
        setErr(false);
        setUser(querySnapshot.docs[0].data());
      } else {
        setErr(true);
        setUser(null);
      }
    } catch (err) {
      setErr(true);
      setUser(null);
    }
  };

  const handleSelect = async () => {
    setHasNewMessage(true);

    //check whether the group(chats in firestore) exists, if not create

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("");
  };

  return (
    <View style={styles.search}>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.input}
          placeholder="Find a user"
          onChangeText={(text) => handleSearch(text)}
          value={username}
        />
      </View>
      {err && <Text></Text>}
      {user && (
        <TouchableOpacity style={styles.userChat} onPress={handleSelect}>
          <Image source={{ uri: user.photoURL }} style={styles.userImage} />
          <View style={styles.userChatInfo}>
            <Text>{user.displayName}</Text>
            {hasNewMessage ? (
              <View style={styles.newMessageIndicator}></View>
            ) : (
              ""
            )}
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchForm: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});

export default Search;
