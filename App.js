/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, Dimensions} from 'react-native';

import HomeScreenNavigator from './src/components/Screens/Navigators';
import ProfileScreen from './src/components/Screens/ProfileScreen';
import RecordingsListScreen from './src/components/Screens/RecordingsListScreen';
import LoginScreen from './src/components/Screens/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Provider} from 'react-redux';
import store from './src/store';
import {ApplicationProvider, Layout} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState('');

  const ReactNavigation = require('react-navigation');
  ReactNavigation.SafeAreaView.setStatusBarHeight(0);
  const HEIGHT = Dimensions.get('window').height;
  const WIDTH = Dimensions.get('window').width;
  return (
    <SafeAreaView style={[styles.container]}>
      <ApplicationProvider
        {...eva}
        style={[styles.container]}
        theme={eva.light}>
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="MainTabView" component={MainTabNav} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </ApplicationProvider>
    </SafeAreaView>
  );
}

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    length: 4,
    createdAt: 3323,
    tags: ['work', 'personal'],
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    length: 4,
    createdAt: 3232,
    tags: ['rel'],
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    length: 5,
    createdAt: 32323,
    tags: ['work'],
  },
  {
    id: '58694a0r-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    length: 5,
    createdAt: 32323,
    tags: ['work'],
  },
];

function MainTabNav() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#e81e73',
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreenNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="RecordingsTab"
        children={() => <RecordingsListScreen audioData={DATA} />}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="menu" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
