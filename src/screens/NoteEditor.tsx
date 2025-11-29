import React, { useState, useContext } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { createNote, updateNote } from "../storage/storage";
import { Note } from "../types";

export default function NoteEditorScreen({ navigation, route }: any) {
  const { user } = useContext(AuthContext);
  const { mode, category, note } = route.params || {};
  const [title, setTitle] = useState(note?.title || "");
  const [body, setBody] = useState(note?.body || "");
  const [cat, setCat] = useState<string>(
    note?.category || category || "personal"
  );

  async function handleSave() {
    if (!title.trim()) return Alert.alert("Validation", "Title is required");
    if (!user) return Alert.alert("Error", "Not authenticated");

    if (mode === "create") {
      const newNote: Note = {
        id: Date.now().toString(),
        userId: user.id,
        title,
        body,
        category: cat,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      await createNote(newNote);
    } else if (mode === "edit") {
      const updated: Note = {
        ...note,
        title,
        body,
        category: cat,
        updatedAt: Date.now(),
      };
      await updateNote(updated);
    }
    navigation.goBack();
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
      />
      <TextInput
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        multiline
        style={{
          borderWidth: 1,
          padding: 8,
          height: 200,
          textAlignVertical: "top",
        }}
      />
      <View style={{ height: 12 }} />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}
