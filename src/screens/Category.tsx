import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, Button, Alert } from "react-native";
import { getNotesForUser, deleteNote } from "../storage/storage";
import { AuthContext } from "../context/AuthContext";
import NoteItem from "../components/NoteItem";
import { Note } from "../types";

export default function CategoryScreen({
  navigation,
  category,
}: {
  navigation: any;
  category: string;
}) {
  const { user } = useContext(AuthContext);
  const [notes, setNotes] = useState<Note[]>([]);

  async function load() {
    if (!user) return;
    const all = await getNotesForUser(user.id);
    setNotes(all.filter((n) => n.category === category));
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", load);
    load();
    return unsubscribe;
  }, [navigation, user]);

  async function handleDelete(id: string) {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          await deleteNote(id);
          await load();
        },
      },
    ]);
  }

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Text style={{ fontSize: 20, textTransform: "capitalize" }}>
          {category} Notes
        </Text>
        <Button
          title="+"
          onPress={() =>
            navigation.navigate("NoteEditor", { mode: "create", category })
          }
        />
      </View>

      <FlatList
        data={notes}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <NoteItem
            note={item}
            onEdit={() =>
              navigation.navigate("NoteEditor", { mode: "edit", note: item })
            }
            onDelete={() => handleDelete(item.id)}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={{ marginTop: 20 }}>No notes yet</Text>
        )}
      />
    </View>
  );
}
