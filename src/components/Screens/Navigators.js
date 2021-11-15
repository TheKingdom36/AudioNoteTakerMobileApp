import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./HomeScreen";
import RecordingInfoScreen from "./RecordingInfoScreen";
import NewRecordingScreen from "./NewRecordingScreen";
import ConfirmNewRecordingScreen from "./ConfirmNewRecordingScreen";
import { useNavigation } from "@react-navigation/native";

const HomeStack = createStackNavigator();  // creates object for Stack Navigator

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
        length: 4,
        createdAt: 3323,
        tags: ["work", "personal"]
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
        length: 4,
        createdAt: 3232,
        tags: ["rel"]
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
        length: 5,
        createdAt: 32323,
        tags: ["work"]
    }, {
        id: '58694a0r-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
        length: 5,
        createdAt: 32323,
        tags: ["work"]
    },
];

export const ScreenNames = {
    Home: "Home",
    Profile: "Profile",
    RecordingInfo: "RecordingInfo",
    NewRecording: "NewRecording",
    ConfirmNewRecording: "ConfirmNewRecording"
};


const HomeScreenNavigator = () => {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false,
            }}>

            <HomeStack.Screen
                name={ScreenNames.Home}
                component={HomeScreen}
            />
            <HomeStack.Screen
                name={ScreenNames.RecordingInfo}
                component={RecordingInfoScreen}
            />
            <HomeStack.Screen
                name={ScreenNames.NewRecording}
                component={NewRecordingScreen}
            />
            <HomeStack.Screen
                name={ScreenNames.ConfirmNewRecording}
                component={ConfirmNewRecordingScreen}
            />
        </HomeStack.Navigator>
    );
}

export default HomeScreenNavigator;
