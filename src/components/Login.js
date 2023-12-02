import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import UserContext from '../context/UserContext';
import Register from './Register';

const Stack = createNativeStackNavigator();

const Login = ({ navigation }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn, setIsLoggedIn, backendURL } = useContext(UserContext);
      function check(){
        return isLoggedIn?(<MainContainer/>):(<Login/>);
      }

  const handleLogin = async () => {
    try {
              const response = await axios.post(backendURL+"/login/", {
                username: username,
                password: password,
              });
          
              if (response.data.status === 200) {
                try {
                  await AsyncStorage.setItem('token', response.data.token);
                  const token = await AsyncStorage.getItem('token');
                  setIsLoggedIn(true)
                    // goTomainPage();
                    check();
                  // Navigate to MainContainer or handle login success
                } catch (error) {
                  console.error('Error saving token to AsyncStorage:', error);
                }
              } else {
                console.log('Error In Login:', response.data);
              }
          
            } catch (error) {
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Response Error:', error.response.data);
                console.error('Response Status:', error.response.status);
                console.error('Response Headers:', error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Request Setup Error:', error.message);
              }
              console.error('Error:', error.config);
            }
  };

  const handleRegisterClick = () => {
    navigation.navigate('Register');
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.RegisterButton}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={handleRegisterClick}>
          <Text style={styles.RegisterButtonText}> Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    height: 40,
    fontSize: 20,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: 'tomato',
    paddingVertical: 15,
    borderRadius: 5,
    width: '45%',
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  RegisterButton: {
    marginTop: 13,
    flexDirection: 'row',
  },
  RegisterButtonText: {
    color: '#007BFF',
    textAlign: 'center',
  },
});

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
