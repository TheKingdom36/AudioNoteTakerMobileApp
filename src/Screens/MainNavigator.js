import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './Home.Screen';
import RecordingInfoScreen from './AudioInfo.Screen';
import CreateNewRecordingScreen from './CreateNewRecording.Screen';
import ConfirmNewRecordingScreen from './ConfirmNewRecording.Screen';
import ProfileScreen from './Profile.Screen';
import RecordingsListScreen from './RecordingsList.Screen';
import LoginScreen from './Login.Screen';
import AudioInfo from './AudioInfo.Screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MainStackNav = createStackNavigator(); // creates object for Stack Navigator

export const ScreenNames = {
  Home: 'Home',
  Profile: 'Profile',
  RecordingInfo: 'RecordingInfo',
  NewRecording: 'NewRecording',
  ConfirmNewRecording: 'ConfirmNewRecording',
  AudioInfo: 'AudioInfo',
};

const MainScreenNavigator = () => {
  return (
    <MainStackNav.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MainStackNav.Screen name={ScreenNames.Home} component={MainTabNav} />

      <MainStackNav.Screen
        name={ScreenNames.RecordingInfo}
        component={RecordingInfoScreen}
      />
      <MainStackNav.Screen
        name={ScreenNames.NewRecording}
        component={CreateNewRecordingScreen}
      />
      <MainStackNav.Screen
        name={ScreenNames.ConfirmNewRecording}
        component={ConfirmNewRecordingScreen}
      />
      <MainStackNav.Screen name={ScreenNames.AudioInfo} component={AudioInfo} />
    </MainStackNav.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const MainTabNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#e81e73',
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="RecordingsTab"
        children={() => <RecordingsListScreen />}
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
};

export default MainScreenNavigator;
