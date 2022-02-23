/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import MainScreenNavigator from './src/Screens/MainNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import store from './src/Slices/store';

import {ApplicationProvider, Button, Layout} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import LoginNavigator from './src/Screens/LoginNavigator';

const Stack = createStackNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <SafeAreaView style={[styles.container]}>
      <ApplicationProvider
        {...eva}
        style={[styles.container]}
        theme={eva.light}>
        <Provider store={store}>
          <NavigationContainer>
            {isSignedIn ? (
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}>
                <Stack.Screen
                  name="MainTabView"
                  component={MainScreenNavigator}
                />
              </Stack.Navigator>
            ) : (
              //<LoginScreen setSignedIn={setIsSignedIn} />
              <LoginNavigator setIsSignedIn={setIsSignedIn} />
            )}
          </NavigationContainer>
        </Provider>
      </ApplicationProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
