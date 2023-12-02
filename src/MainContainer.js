import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './Home';
import DetailsScreen from './Details';
import Cart from './Cart';

// Screen names
const homeName = "Home";
const detailsName = "Details";
const cartName = "Cart";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    // <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === detailsName) {
              iconName = focused ? 'list' : 'list-outline';
            } else if (rn === cartName) {
              iconName = focused ? 'cart' : 'cart-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70 }
        }}>

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={cartName} component={Cart} />
        <Tab.Screen name={detailsName} component={DetailsScreen} />

      </Tab.Navigator>
    // </NavigationContainer>
  );
}

export default MainContainer;
