import { StyleSheet, Text, View, SafeAreaView, ScrollView,TouchableOpacity} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react'
import {NativeStackNavigationProps,NativeStackScreenProps} from '@react-navigation/native-stack'
import { Button } from '@rneui/themed';
import Login from './components/Login';
import App from '../Middleware';
import UserContext from './context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainContainer from './MainContainer';


const Details = ({route,navigation}) => {
  const {isLoggedIn} = useContext(UserContext);
  const {setIsLoggedIn} = useContext(UserContext);

  function Travel(){
    return isLoggedIn ? <MainContainer /> : <Login />
  }

  const loggingOut = async()=>{
    try {
      await AsyncStorage.removeItem('token');
      const value = await AsyncStorage.getItem('token');
      if(value===null){
        setIsLoggedIn(false)
        Travel()
      }else{
        console.log('Error in Logout')
      }
      
    } catch (error) {
      console.log(error)
    }
      
  }
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
        <View>
        <TouchableOpacity style={styles.loginButton} onPress={loggingOut}>
            <Text style={styles.loginButtonText}>Logout</Text>
        </TouchableOpacity>
        </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  )
}

export default Details

const styles = StyleSheet.create({
    container: {
      flex: 1,

      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      textAlign: 'center',
      fontSize: 20,
    },
    loginButton: {
      marginTop:15,
      backgroundColor: 'tomato',
      paddingHorizontal:10,
      paddingVertical: 15,
      borderRadius: 5,
      width:'100%',
    },
    loginButtonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });