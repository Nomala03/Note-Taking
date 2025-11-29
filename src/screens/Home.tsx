import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CategoryScreen from "./Category";
import { AuthContext } from "../context/AuthContext";
import { View, Text, Button } from "react-native";

const Tab = createBottomTabNavigator();

export default function HomeScreen({ navigation }: any) {
  const { logout, user } = useContext(AuthContext);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Work">
        {(props: any) => <CategoryScreen {...props} category="work" />}
      </Tab.Screen>
      <Tab.Screen name="Study">
        {(props: any) => <CategoryScreen {...props} category="study" />}
      </Tab.Screen>
      <Tab.Screen name="Personal">
        {(props: any) => <CategoryScreen {...props} category="personal" />}
      </Tab.Screen>
      <Tab.Screen name="Profile">
        {() => (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 18 }}>Logged in as: {user?.username}</Text>
            <View style={{ height: 12 }} />
            <Button
              title="Add Note"
              onPress={() =>
                navigation.navigate("NoteEditor", { mode: "create" })
              }
            />
            <View style={{ height: 12 }} />
            <Button
              title="Manage Profile"
              onPress={() => navigation.navigate("Profile")}
            />
            <View style={{ height: 12 }} />
            <Button title="Logout" onPress={logout} />
          </View>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
