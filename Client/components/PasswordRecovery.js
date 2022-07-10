import React, { useState, useContext } from 'react';
import { View, ImageBackground, TextInput, Button } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import SignUp, { styles } from './SignUp';
import { AuthContext } from '../context/AuthContext';

const PasswordRecovery = () => {
  const [newPassword, setNewPassword] = useState('');
  const { signUp } = useContext(AuthContext);

  return (
    <Layout style={{ flex: 1, justifyContent: 'center' }}>
      <ImageBackground
        source={require('../../src/assets/background.jpeg')}
        resizeMode="cover"
        imageStyle={{ opacity: 0.9 }}
        style={styles.backgroundImage}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.text1}>Forgot Password</Text>
          <Text category="s1">New Password</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputHeader}>EMAIL</Text>

          <TextInput
            placeholder="hello@reallygreatsite.com"
            style={styles.textInput}
            value={newPassword}
            onChangeText={(nextValue) => setNewPassword(nextValue)}
          />

          <View>
            <View style={styles.button}>
              <Button
                title="send"
                color="white"
                onPress={() => {
                  signUp(newPassword);
                  navigation.navigate('Login');
                }}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </Layout>
  );
};

export default PasswordRecovery;
