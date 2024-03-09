import React from 'react';
import backgroundImage from '@assets/background.png';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ToastAndroid
} from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
import Theme from '@constants/Theme';
import { Link, router } from 'expo-router';
import { registerUser } from '@services/authAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function register() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [hidePassword, setHidePassword] = React.useState(true);
  const handleSubmit = async () => {
    if (!email || !password || !username) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
      } else {
        alert('Please fill in all fields');
      }
      return;
    }
    const response = registerUser(email, password, username);
    if (response === false) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('User already exists', ToastAndroid.SHORT);
      } else {
        alert('User already exists');
      }
      return;
    }
    console.log('Email: ', email);
    console.log('Password: ', password);
    console.log('Username: ', username);
    await AsyncStorage.setItem('username', username);
    await AsyncStorage.setItem('email', email);
    router.push('/home');
  };

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground source={backgroundImage} style={styles.mainContainer}>
          <View style={styles.bottomCard}>
            <View style={styles.EmailView}>
              <Text variant='headlineLarge' style={styles.LoginText}>
                Sign Up
              </Text>
              <TextInput
                mode='outlined'
                label={'username'}
                autoComplete='username'
                onChangeText={setUsername}
                textContentType='username'
                value={username}
                left={
                  <TextInput.Icon
                    color={Theme.colors.secondary}
                    icon='account-circle'
                  />
                }
              />
              <TextInput
                mode='outlined'
                label={'Email'}
                autoComplete='email'
                onChangeText={setEmail}
                textContentType='emailAddress'
                value={email}
                keyboardType='email-address'
                left={
                  <TextInput.Icon color={Theme.colors.secondary} icon='email' />
                }
              />
              <TextInput
                mode='outlined'
                label={'Password'}
                autoComplete='password'
                textContentType='password'
                onChangeText={setPassword}
                value={password}
                secureTextEntry={hidePassword}
                right={
                  <TextInput.Icon
                    color={Theme.colors.secondary}
                    icon='eye'
                    onPress={() =>
                      setHidePassword(hidePassword => !hidePassword)
                    }
                  />
                }
                left={
                  <TextInput.Icon color={Theme.colors.secondary} icon='lock' />
                }
              />
              <Button mode='contained-tonal' onPress={handleSubmit}>
                <Text>Sign in</Text>
              </Button>
              <Text>
                Alrady have an account?{' '}
                <Link style={styles.SignUp} href={'/'}>
                  Sign In
                </Link>
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomCard: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 40,
    height: '50%',
    bottom: 0,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 0,
    position: 'absolute',
    backgroundColor: Theme.colors.surface,
  },
  mainContainer: {
    width: '100%',
    height: '100%',
  },
  LoginText: {
    color: Theme.colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  EmailView: {
    flex: 1,
    gap: 20,
  },
  SignUp: {
    color: Theme.colors.primary,
    fontWeight: 'bold',
  },
});
