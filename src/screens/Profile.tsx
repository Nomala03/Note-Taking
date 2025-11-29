import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function ProfileScreen() {
  const { user, updateProfile } = useContext(AuthContext);
  const [email, setEmail] = useState(user?.email || "");
  const [username, setUsername] = useState(user?.username || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  async function handleUpdate() {
    try {
      await updateProfile({
        email: email.trim(),
        username: username.trim(),
        currentPassword: currentPassword || undefined,
        newPassword: newPassword || undefined,
      });
      Alert.alert("Success", "Profile updated");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      Alert.alert("Update failed", err.message);
    }
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>Edit Profile</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
      />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
      />
      <Text style={{ marginBottom: 8 }}>
        To change email or password, enter your current password below
      </Text>
      <TextInput
        placeholder="Current password"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
      />
      <TextInput
        placeholder="New password (optional)"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
      />
      <Button title="Save changes" onPress={handleUpdate} />
    </View>
  );
}
