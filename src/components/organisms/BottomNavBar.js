import React from 'react';
import {Text, View, Button} from 'react-native';


import HomeScreen from './src/components/Scenes/home';
import ProfileScreen from './src/components/Scenes/profile';
import LoginScreen from './src/components/Scenes/login'
import {NavigationContainer,} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator, createAppContainer } from "react-navigation";

var Route = {
  key: string,
  title?: string,
  icon?: IconSource,
  color?: string
};

var NavigationState = {
  index: number
};

function BottomNavBar(props) {



  return 
  
}

export default BottomNavBar;
