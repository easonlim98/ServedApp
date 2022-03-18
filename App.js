import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from './src/constant/Colors';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CommonStore } from './store/CommonStore';
import LoginScreen from './src/screen/LoginScreen';
import HomeScreen from './src/screen/HomeScreen';
import ServiceListScreen from './src/screen/ServiceListScreen';
import ServiceDetailsScreen from './src/screen/ServiceDetailsScreen';
import OrderListScreen from './src/screen/OrderListScreen';
import ChatScreen from './src/screen/ChatScreen';
import ChatMessageScreen from './src/screen/ChatMessageScreen';
import ProfileScreen from './src/screen/ProfileScreen';
import SellerServiceScreen from './src/screen/SellerServiceScreen';
import AddServiceScreen from './src/screen/AddServiceScreen';
import CustomerOrderScreen from './src/screen/CustomerOrderScreen';

import { Firestore, getFirestore } from 'firebase/firestore'
import firebaseConfig from './constants/firebaseConfig';
import { initializeApp } from 'firebase/app';
import { onAuthStateChanged , getAuth } from 'firebase/auth';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const headerOption = {
  headerTitleAlign: 'center',
  //headerTintColor: Colors.black,
  headerStyle: {
    backgroundColor: Colors.primaryColor,
  },
};

function LoginScreenStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function HomeScreenStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name='ServiceListScreen' component={ServiceListScreen} options={ headerOption } />
      <Stack.Screen name='ServiceDetailsScreen' component={ServiceDetailsScreen} options={ headerOption } />
    </Stack.Navigator>
  );
}

function OrderListStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='OrderListScreen' component={OrderListScreen} options={ headerOption } />
    </Stack.Navigator>
  );
}

function ChatStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='ChatScreen' component={ChatScreen} options={ headerOption } />
      <Stack.Screen name='ChatMessageScreen' component={ChatMessageScreen} options={ headerOption } />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='ProfileScreen' component={ProfileScreen} options={ headerOption } />
      <Stack.Screen name='SellerServiceScreen' component={SellerServiceScreen} options={ headerOption } />
      <Stack.Screen name='AddServiceScreen' component={AddServiceScreen} options={ headerOption } />
      <Stack.Screen name='CustomerOrderScreen' component={CustomerOrderScreen} options={ headerOption } />
    </Stack.Navigator>
  );
}

const auth = getAuth();

export default function App() {

  const isLoggedIn = CommonStore.useState(s => s.isLoggedIn);
  initializeApp(firebaseConfig)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      CommonStore.update(s => {
        s.isLoggedIn = true;
      });
    } else {
      CommonStore.update(s => {
        s.isLoggedIn = false;
      });
    }
  });


  return (
    <NavigationContainer>
      { isLoggedIn ?
      <Tab.Navigator
        screenOptions={({ route }) => ({
            "tabBarActiveBackgroundColor": "#FFF500",
            "tabBarInactiveBackgroundColor": "#FFF500",
            "tabBarShowLabel": false,
            "tabBarStyle": [
              {
                "display": "flex"
              },
              null
            ],
            tabBarStyle: {
            height: 50,
            borderTopWidth: 0,
          },
          tabBarVisible: route.state ? route.state.index > 0 ? false : true : null,
          tabBarIcon: ({ focused, color, size }) => {

            if (route.name === 'HomeScreenStack') {
              return (
                <Ionicons name={'md-home-outline'} size={25} color={Colors.black}/>
              );
            } else if (route.name === 'OrderListStack') {
              return (
                <Ionicons name={'md-newspaper-outline'} size={25} color={Colors.black}/>
              );
            }
            else if (route.name === 'ChatStack') {
              return (
                <AntDesign name={'message1'} size={23} color={Colors.black}/>
              );
            }
            else if (route.name === 'ProfileStack') {
              return (
                <Ionicons name={'md-person-outline'} size={25} color={Colors.black}/>
              );
            }
            // You can return any component that you like here!
            return <Feather name={'home'} size={32} color={Colors.grey}/>;
          
          },
        })}>
        <Tab.Screen name="HomeScreenStack" component={HomeScreenStack} options={{ headerShown: false }}/>
        <Tab.Screen name="OrderListStack" component={OrderListStack} options={{ headerShown: false }}/>
        <Tab.Screen name="ChatStack" component={ChatStack} options={{ headerShown: false }}/>
        <Tab.Screen name="ProfileStack" component={ProfileStack} options={{ headerShown: false }}/>
      </Tab.Navigator>
      :
      <Stack.Navigator>
        <Stack.Screen name='LoginScreenStack' component={LoginScreenStack} options={{ headerShown: false }}/>
      </Stack.Navigator>
      }
    </NavigationContainer>
  )
}