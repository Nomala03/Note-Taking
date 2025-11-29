import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import { AuthContext } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

export type RootParamList = {
Login: undefined;
Register: undefined;
Home: undefined;
NoteEditor: { mode: 'create' | 'edit'; category?: string; note?: any } | undefined;
Profile: undefined;
};

const Stack = createNativeStackNavigator<RootParamList>();

export default function RootNavigator() {
const { user, loading } = useContext(AuthContext);
if (loading) return (
<View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
<ActivityIndicator size="large" />
</View>
);

return (
<Stack.Navigator screenOptions={{ headerShown: false }}>
{user ? (   
<>

</>
) : (
<>
<Stack.Screen name="Login" component={LoginScreen} />

</>
)}
</Stack.Navigator>
);
}