import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import SignupScreen from './SignupScreen';
import LoginScreen from './Login.Screen';

const LoginNav = createStackNavigator(); // creates object for Stack Navigator

export const LoginNavScreenNames = {
  Login: 'Login',
  Signup: 'Signup',
};

const LoginNavigator = props => {
  return (
    <LoginNav.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <LoginNav.Screen
        name={LoginNavScreenNames.Login}
        children={() => <LoginScreen setSignedIn={props.setIsSignedIn} />}
      />

      <LoginNav.Screen
        name={LoginNavScreenNames.Signup}
        component={SignupScreen}
      />
    </LoginNav.Navigator>
  );
};

export default LoginNavigator;
