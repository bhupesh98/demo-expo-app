import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ToastAndroid,
  Platform,
} from 'react-native';
import React from 'react';
import backgroundImage from '@assets/background.png';
import { TextInput, Text, Button } from 'react-native-paper';
import { Link, router } from 'expo-router';
import Theme from '@constants/Theme';
import { checkCredentials } from '@services/authAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function index() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [hidePassword, setHidePassword] = React.useState(true);

  const handleSubmit = async () => {
    if (!email || !password) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
      } else {
        alert('Please fill in all fields');
      }
      return;
    }
    if (await checkCredentials(email, password) === null) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Invalid credentials', ToastAndroid.LONG);
      } else {
        alert('Invalid credentials');
      }
      return;
    }
    console.log('Email: ', email);
    console.log('Password: ', password);
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
                Login
              </Text>
              <TextInput
                mode='outlined'
                autoComplete='email'
                label={'Email'}
                onChangeText={setEmail}
                textContentType='emailAddress'
                value={email}
                keyboardType='email-address'
                left={
                  <TextInput.Icon icon='email' color={Theme.colors.secondary} />
                }
              />
              <TextInput
                mode='outlined'
                autoComplete='password'
                label={'Password'}
                textContentType='password'
                onChangeText={setPassword}
                value={password}
                secureTextEntry={hidePassword}
                right={
                  <TextInput.Icon
                    icon='eye'
                    color={Theme.colors.secondary}
                    onPress={() =>
                      setHidePassword(hidePassword => !hidePassword)
                    }
                  />
                }
                left={
                  <TextInput.Icon icon='lock' color={Theme.colors.secondary} />
                }
              />
              <Button mode='contained-tonal' onPress={handleSubmit}>
                <Text>Sign Up</Text>
              </Button>
              <Text>
                Don't have an account?{' '}
                <Link style={styles.SignUp} href={'/register'}>
                  Sign up
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
