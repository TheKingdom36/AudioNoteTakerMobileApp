import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Text, Button, ButtonGroup} from '@ui-kitten/components';
import {black} from 'react-native-paper/lib/typescript/styles/colors';
import {useSelector} from 'react-redux';
import {Colors} from '../Utils/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScreenNames} from '../Screens/MainNavigator';
import {useNavigation} from '@react-navigation/native';
useNavigation;
const WelcomeBanner = ({style}) => {
  const userInfo = useSelector(state => {
    console.log('User Stats', state.user);
    return state.user.User;
  });

  const ListIcon = props => (
    <MaterialCommunityIcons name="playlist-music" color={'black'} size={60} />
  );

  const RecordIcon = props => (
    <MaterialCommunityIcons name="record-rec" color={'black'} size={60} />
  );

  const CustomButton = ({icon, text, onPress}) => {
    return (
      <View style={styles.singleButton}>
        <Pressable onPress={onPress}>
          <View style={{alignSelf: 'center'}}>{icon}</View>
          <Text style={{marginTop: 'auto'}}>{text}</Text>
        </Pressable>
      </View>
    );
  };

  const navigation = useNavigation();

  const navToRecordScreen = () => {
    navigation.navigate(ScreenNames.NewRecording);
  };

  const navToRecordingList = () => {
    navigation.navigate(ScreenNames.RecordingList);
  };

  return (
    <View style={styles.container}>
      <Text category="h4">
        Welcome back, {userInfo ? userInfo.firstName : ' '}
      </Text>

      <View style={styles.buttonGroup}>
        <CustomButton
          icon={<RecordIcon />}
          text="Record"
          onPress={navToRecordScreen}
        />
        <CustomButton
          icon={<ListIcon />}
          text="View Recordings"
          onPress={navToRecordingList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  buttonGroup: {
    height: '75%',
    paddingTop: 20,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  singleButton: {
    width: '40%',
    padding: 10,
    borderRadius: 30,
    backgroundColor: Colors.secondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WelcomeBanner;
