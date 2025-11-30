import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  async function handleLogin() {
    try {
      await login({ email, password });
    } catch (err: any) {
      Alert.alert("Login failed", err.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <View style={{ height: 6 }} />

      <View
        style={{ margin: 8, backgroundColor: "#554463ff", borderRadius: 6 }}>
        <Button title="Submit" color={"#ffffff"} onPress={handleLogin} />
      </View>
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account?</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerLink}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#dca6e7ff",
  },
  input: {
    borderWidth: 1,
    padding: 8,
    margin: 8,
    backgroundColor: "#ffffff",
    borderRadius: 6,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  registerContainer: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  registerText: {
    color: "#35266bff",
    fontSize: 16,
  },
  registerLink: {
    marginLeft: 6,
    color: "#35266bff",
    fontSize: 16,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});
