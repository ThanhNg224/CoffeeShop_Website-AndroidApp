import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const API_URL = 'http://192.168.0.197:8080/';

  const handleSubmit = () => {
    axios.post(API_URL, { email, password })
      .then(response => {
        if (response.data.length > 0) {
          navigation.navigate('Home', { user: response.data[0] });
        } else {
          Alert.alert('Invalid credentials', 'Please try again.');
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
        Alert.alert('Error', 'Something went wrong. Please try again later. ${error.message}');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default Login;