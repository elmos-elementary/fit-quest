import React, { useState, useContext } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { ImageBackground, View, Button, TextInput } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { styles } from './SignUp';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  return (
    <Layout style={{ flex: 1, justifyContent: 'center' }}>
      <ImageBackground
        source={require('../../src/assets/background.jpeg')}
        resizeMode="cover"
        imageStyle={{ opacity: 0.9 }}
        style={styles.backgroundImage}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.text1}>Login</Text>
          <Text category="s1">Don't have an account?</Text>

          <Text
            category="s1"
            status="primary"
            onPress={() => {
              navigation.navigate('SignUp');
            }}
          >
            Sign up here.
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputHeader}>EMAIL</Text>
          <TextInput
            placeholder="hello@reallygreatsite.com"
            style={styles.textInput}
            value={email}
            onChangeText={(nextValue) => setEmail(nextValue)}
          />
          <Text style={styles.inputHeader}>PASSWORD</Text>
          <TextInput
            placeholder="****"
            style={styles.textInput}
            value={password}
            secureTextEntry={true}
            onChangeText={(nextValue) => setPassword(nextValue)}
          />
          <View>
            <Text
              category="s1"
              status="primary"
              style={{ textAlign: 'right', margin: 2 }}
              onPress={() => {
                navigation.navigate('PasswordRecovery');
              }}
            >
              forgot password?
            </Text>
          </View>

          <View>
            <View style={styles.button}>
              <Button
                title="Log In"
                color="white"
                onPress={() => {
                  login(email.toLowerCase(), password);
                }}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </Layout>
  );
};

export default Login;
