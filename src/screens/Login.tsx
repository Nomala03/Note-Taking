import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
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

      <View style={{ height: 12 }} />

      <View
        style={{ margin: 12, backgroundColor: "#554463ff", borderRadius: 6 }}>
        <Button 
        title="Submit" 
        color={"#ffffff"}
        onPress={handleLogin} />
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
  input: {
    borderWidth: 1,
    padding: 8,
    margin: 12,
    backgroundColor: "#ffffff",
    borderRadius: 6,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
});
