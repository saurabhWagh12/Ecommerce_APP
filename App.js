import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Provider from './src/context/Provider';
import Middleware from './Middleware'
import { NavigationContainer } from '@react-navigation/native';
// import { StripeProvider } from '@stripe/stripe-react-native';

// const Stack = createNativeStackNavigator();

export default function App() {

  return(
    <NavigationContainer>
    <Provider> 
      <Middleware/>
    </Provider>
  </NavigationContainer>
  );
}

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
});
