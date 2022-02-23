import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Input, Text, Button} from '@ui-kitten/components';
import {useDispatch} from 'react-redux';
import {fetchToken} from '../Slices/AuthSlice';
import Config from 'react-native-config';
import Loader from '../Components/Loader.component';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../Utils/Colors';
import PasswordInput from '../Components/PasswordInput';
import {LoginNavScreenNames} from './LoginNavigator';
import UserApi from '../Utils/ClientApis/UserApi';
import {fetchUser, setUser} from '../Slices/UserSlice';

function LoginScreen({navigation, setSignedIn}) {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorText, setErrortext] = useState('');
  const dispatch = useDispatch();
  const AlertIcon = props => (
    <MaterialCommunityIcons {...props} name="record-rec" />
  );
  const passwordInputRef = createRef();

  const handleLogin = () => {
    setErrortext('');
    if (!Email) {
      alert('Please fill Email');
      return;
    }
    if (!Password) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
    let dataToSend = {username: Email, password: Password};

    dispatch(fetchToken(dataToSend))
      .then(response => {
        //Hide Loader
        console.log('response', response);
        setLoading(false);
        // If server response message same as Data Matched
        if (response.meta.requestStatus === 'fulfilled') {
          setSignedIn(true);
          dispatch(fetchUser());
        } else {
          if (response.meta.requestStatus === 'rejected') {
            setErrortext(
              'Your sign-in was rejected please check your email and password',
            );
            alert(
              'Your sign-in was rejected please check your email and password',
            );
          }
        }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  const handleSignUp = () => {
    navigation.navigate(LoginNavScreenNames.Signup);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container}>
        <Loader loading={loading} />

        <Input
          style={styles.inputView}
          value={Email}
          label="Email"
          placeholder="email.."
          onChangeText={nextValue => setEmail(nextValue)}
        />

        <PasswordInput
          style={styles.inputView}
          password={Password}
          setPassword={setPassword}
        />

        <Button style={[styles.loginBtn]} onPress={() => handleLogin()}>
          Login
        </Button>

        <Text>Dont have an account sign up</Text>
        <Button style={[styles.signUpBtn]} onPress={() => handleSignUp()}>
          Sign-Up
        </Button>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondaryColor,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 10,
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  forgot_button: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 70,
    marginBottom: 10,
  },

  signUpBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
});

export default LoginScreen;
