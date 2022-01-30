import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import RecordingInfoScreen from './AudioInfo.Screen';
import SignupScreen from './SignupScreen';
import LoginScreen from './Login.Screen';

const LoginNav = createStackNavigator(); // creates object for Stack Navigator

export const LoginNavScreenNames = {
  Login: 'Login',
  Signup: 'Signup',
};

const LoginNavigator = () => {
  return (
    <LoginNav.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <LoginNav.Screen
        name={LoginNavScreenNames.Login}
        component={LoginScreen}
      />

      <LoginNav.Screen
        name={LoginNavScreenNames.Signup}
        component={SignupScreen}
      />
    </LoginNav.Navigator>
  );
};

export default LoginNavigator;
