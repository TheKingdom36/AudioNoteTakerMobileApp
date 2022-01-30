import React from 'react';
import {Text, View, Button} from 'react-native';

const ProfileScreen = ({navigation}) => {
  return (
    <View>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('HomeTab')}
      />

      <Text>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;
