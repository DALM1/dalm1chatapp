import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  CheckBox,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [acceptCGU, setAcceptCGU] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.cancelled) {
      setAvatar(result.uri);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    // Regex to check if displayName contains spaces at the beginning or end
    const regex = /^[^\s]+[a-zA-Z0-9_]+[^\s]+$/; // regex to check for spaces at the start and
    if (regex.test(displayName)) {
      setErr(true);
      setLoading(false);
      return;
    }

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, avatar).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigation.navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.formWrapper}>
        <View style={styles.logo}>
          <Image source={require("./Dalm1.png")} />
        </View>
        <Text style={styles.title}>Register</Text>
        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="display name" required />
          <TextInput
            style={styles.input}
            placeholder="email"
            required
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="password"
            required
            secureTextEntry
          />
          <View style={styles.fileContainer}>
            <TouchableOpacity style={styles.fileButton}>
              <Image source={require("./Add.png")} />
              <Text>Add an avatar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cgu}>
            <TouchableOpacity
              style={styles.acceptCGU}
              onPress={() => setAcceptCGU(!acceptCGU)}
            >
              <Text>
                J'accepte les conditions générales d'utilisation
                <Text style={styles.cguLink}>CGU</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setAcceptCGU(!acceptCGU)}
            >
              {acceptCGU && <Image source={require("./Check.png")} />}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.button, !acceptCGU || (loading && styles.disabled)]}
            disabled={!acceptCGU || loading}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
          {loading && (
            <Text>Uploading and compressing the image please wait...</Text>
          )}
          {err && <Text>Something went wrong</Text>}
        </View>
        <Text style={styles.loginLink}>
          You do have an account? <Text style={styles.link}>Login</Text>
        </Text>
      </View>
    </View>
  );
};

export default Register;
