import React, { useContext, useState } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { AuthContext } from '../context/AuthContext';
import {
  View,
  ImageBackground,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
} from 'react-native';

const SignUp = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState('');
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const { signUp, confirmUserEmail } = useContext(AuthContext);

  const isValid = async (email, password, firstName, lastName) => {
    if (email) {
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!email.match(validRegex)) {
        setEmailErrorMessage('Please input a valid email');
        return;
      }
    }
    if (firstName) {
      setFirstNameErrorMessage('');
    }
    if (lastName) {
      setLastNameErrorMessage('');
    }
    if (password) {
      setPasswordErrorMessage('');
    }

    if (!email || !password || !firstName || !lastName) {
      {
        if (!firstName) {
          setFirstNameErrorMessage('Please input first name');
        }
        if (!lastName) {
          setLastNameErrorMessage('Please input last name');
        }
        if (!email) {
          setEmailErrorMessage('Please input email');
        }
        if (!password) {
          setPasswordErrorMessage('Please input Password');
        }
      }
    } else {
      if ((await confirmUserEmail(email.toLowerCase())) === 'No user found') {
        signUp(email.toLowerCase(), password, firstName, lastName);
      } else {
        setEmailErrorMessage('Email already in use');
      }
    }
  };

  return (
    <Layout style={{ flex: 1, justifyContent: 'center' }}>
      <ImageBackground
        source={require('../../src/assets/background.jpeg')}
        resizeMode="cover"
        imageStyle={{ opacity: 0.9 }}
        style={styles.backgroundImage}
      >
        <ScrollView>
          <View style={styles.headerContainer}>
            <Text style={styles.text1}>Create new Account</Text>
            <Text category="s1">Already Registered?</Text>
            <Text
              category="s1"
              status="primary"
              onPress={() => {
                navigation.navigate('Login');
              }}
            >
              log in here.
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputHeader}>FIRST NAME</Text>

            <TextInput
              placeholder="John"
              style={styles.textInput}
              value={firstName}
              onChangeText={(nextValue) => setFirstName(nextValue)}
            />
            <Text style={styles.errorMessage}>{firstNameErrorMessage}</Text>
            <Text style={styles.inputHeader}>LAST NAME</Text>
            <TextInput
              placeholder="Doe"
              style={styles.textInput}
              value={lastName}
              onChangeText={(nextValue) => setLastName(nextValue)}
            />
            <Text style={styles.errorMessage}>{lastNameErrorMessage}</Text>
            <Text style={styles.inputHeader}>EMAIL</Text>
            <TextInput
              placeholder="hello@reallygreatsite.com"
              style={styles.textInput}
              value={email}
              onChangeText={(nextValue) => setEmail(nextValue)}
            />
            <Text style={styles.errorMessage}>{emailErrorMessage}</Text>
            <Text style={styles.inputHeader}>PASSWORD</Text>

            <TextInput
              placeholder="****"
              style={styles.textInput}
              value={password}
              secureTextEntry={true}
              onChangeText={(nextValue) => setPassword(nextValue)}
            />

            <Text style={styles.errorMessage}>{passwordErrorMessage}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="sign up"
                color="white"
                onPress={() => {
                  isValid(email, password, firstName, lastName);
                }}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </Layout>
  );
};

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 80,
    opacity: 0.8,
    borderRadius: 15,
    width: '60%',
    height: '20%',
  },

  inputContainer: {
    backgroundColor: 'white',
    opacity: 0.8,
    borderRadius: 15,
    margin: 30,
    paddingTop: 0,
  },

  text1: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  textInput: {
    height: 45,
    margin: 15,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 2,
    borderWidth: 2,
  },
  inputHeader: {
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  buttonContainer: {
    flex: 1,
  },

  button: {
    backgroundColor: 'black',
    padding: 1,
    margin: 30,
  },

  errorMessage: {
    color: 'red',
    paddingLeft: 20,
    paddingBottom: 10,
  },
});
export default SignUp;
