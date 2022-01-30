import React, {useState, createRef} from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Input, Text, Button} from '@ui-kitten/components';
import {useSelector, useDispatch} from 'react-redux';
import {fetchToken} from '../Utils/AuthSlice';
import Config from 'react-native-config';
import Loader from '../Components/Loader.component';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../Utils/Colors';

const PasswordInput = ({password, setPassword, props}) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = props => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <MaterialCommunityIcons name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );
  return (
    <Input
      {...props}
      value={password}
      label="Password"
      placeholder="password.."
      accessoryRight={renderIcon}
      secureTextEntry={secureTextEntry}
      onChangeText={nextValue => setPassword(nextValue)}
    />
  );
};

export default PasswordInput;
