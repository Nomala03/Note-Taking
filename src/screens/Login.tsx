import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootParamList } from '../navigation/RootNavigator';


type Props = NativeStackScreenProps<RootParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const { login } = useContext(AuthContext);


async function handleLogin() {
try {
await login({ email, password });
} catch (err: any) {
Alert.alert('Login failed', err.message);
}
}


return (
<View style={{flex:1,padding:16,justifyContent:'center'}}>
<Text style={{fontSize:24, marginBottom:16}}>Login</Text>
<TextInput placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" style={{borderWidth:1,padding:8,marginBottom:12}} />
<TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{borderWidth:1,padding:8,marginBottom:12}} />
<Button title="Login" onPress={handleLogin} />
<View style={{height:12}} />
<Button title="Register" onPress={() => navigation.navigate('Register')} />
</View>
);
}