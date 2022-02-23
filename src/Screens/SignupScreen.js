import React from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Input, Button, ButtonGroup} from '@ui-kitten/components';
import PasswordInput from '../Components/PasswordInput';

const SignupScreen = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      Email: '',
      Password: '',
    },
  });
  const onSubmit = data => console.log('onSubmit', data);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Text style={styles.label}>Title</Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="Title"
          rules={{required: true}}
        />
        <Text style={styles.label}>Password</Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <PasswordInput
              style={styles.input}
              password={value}
              setPassword={onChange}
            />
          )}
          name="Password"
          rules={{required: true}}
        />
      </KeyboardAvoidingView>
      <ButtonGroup style={[styles.bottomButtons]}>
        <Button style={[styles.btn]} onPress={() => reset()} status={'basic'}>
          <Text>Reset</Text>
        </Button>
        <Button
          style={[styles.btn]}
          onPress={handleSubmit(onSubmit)}
          status={'basic'}>
          <Text>Create</Text>
        </Button>
      </ButtonGroup>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: 'black',
    margin: 20,
    paddingLeft: 10,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#ec5990',
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    padding: 8,
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'white',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  bottomButtons: {
    paddingTop: 30,
    marginTop: 'auto',
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SignupScreen;
