import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView,Alert } from 'react-native';
import UserContext from '../context/UserContext';
import axios from 'axios';

import { useNavigation } from '@react-navigation/native';


const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const {backendURL} = useContext(UserContext);
  const navigation = useNavigation();

  const createTwoButtonAlert = (message) =>
  Alert.alert(
    "Status",
    message,
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );



  async function HandleForm(){
    console.log('Registering')
    try {
        const response = await axios.post(backendURL+"/register/",{username:username,email:email,password:password})
        if(response.data.status===200){
            console.log(response.data);
            createTwoButtonAlert(response.data.message);
            navigation.goBack();
        }else{
            console.log('Error')
        }
    } catch (error) {
        
    }
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      {/* <Image source={require('./path/to/your/image.png')} style={styles.logo} /> */}
      <Text style={styles.title}>Register</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>

      <TouchableOpacity style={styles.RegisterButton} onPress={()=>{HandleForm()}}>
        <Text style={styles.RegisterButtonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgotPasswordButton}>
        {/* <Text style={styles.forgotPasswordButtonText}>Forgot Password?</Text> */}
      </TouchableOpacity>
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
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    alignItems:'center',
    marginBottom: 20,
  },
  input: {
    width:'90%',
    height: 40,
    fontSize:20,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  RegisterButton: {
    backgroundColor: 'tomato',
    paddingVertical: 15,
    borderRadius: 5,
    width:'45%',
  },
  RegisterButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    marginTop: 10,
  },
  forgotPasswordButtonText: {
    color: '#007BFF',
    textAlign: 'center',
  },
});

export default Register;
