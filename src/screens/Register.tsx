import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../navigation/RootNavigator";

type RegisterProps = NativeStackScreenProps<RootParamList, "Register">;

export default function RegisterScreen({ navigation }: RegisterProps) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useContext(AuthContext);

  async function handleRegister() {
    try {
      await register({ email, password, username });
    } catch (err: any) {
      Alert.alert("Registration failed", err.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <View style={{ margin: 12, backgroundColor: "#554463ff", borderRadius: 6 }}>
        <Button title="Register" onPress={handleRegister} color={"#ffffff"} />
      </View>
      <View style={{ margin: 4 }}>
              <Button
                title="Register"
                color={"#35266bff"}
                onPress={() => navigation.navigate("Register")}
              />
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
    title: {
    fontSize: 24,
    marginBottom: 18,
    textAlign: "center",
    color: "#35266bff",
  },
    input: {
    borderWidth: 1,
    padding: 8,
    margin: 12,
    borderRadius: 6,
    backgroundColor: "#ffffff",
  },

})