import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Dalm1 from "../img/dalm11.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("/");
    } catch (error) {
      setErr(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.logoContainer}>
          <Image source={Dalm1} style={styles.logo} />
        </View>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        {err && <Text style={styles.error}>Something went wrong</Text>}
        <Text style={styles.registerText}>
          You don't have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("/register")}
          >
            Register
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    width: "80%",
    alignItems: "center",
  },
  logoContainer: {
    width: "100%",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 50,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007AFF",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  registerText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
  },
  link: {
    color: "#007AFF",
  },
});

export default Login;
