import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';


export default function RegisterScreen() {
const [email, setEmail] = useState('');
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const { register } = useContext(AuthContext);


async function handleRegister() {
try {
await register({ email, password, username });
} catch (err: any) {
Alert.alert('Registration failed', err.message);
}
}


return (
<View style={{flex:1,padding:16,justifyContent:'center'}}>
<Text style={{fontSize:24, marginBottom:16}}>Register</Text>
<TextInput placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" style={{borderWidth:1,padding:8,marginBottom:12}} />
<TextInput placeholder="Username" value={username} onChangeText={setUsername} style={{borderWidth:1,padding:8,marginBottom:12}} />
<TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{borderWidth:1,padding:8,marginBottom:12}} />
<Button title="Create account" onPress={handleRegister} />
</View>
);
}