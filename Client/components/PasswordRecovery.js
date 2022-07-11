import React, { useState, useContext } from 'react';
import { View, ImageBackground, TextInput, Button, Alert } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { styles } from './Login';
import { AuthContext } from '../context/AuthContext';

const PasswordRecovery = ({ navigation }) => {
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
            onChangeText={(nextValue) =>
              setNewPassword(nextValue.toLowerCase())
            }
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="send"
              color="white"
              onPress={() => {
                Alert.alert("Don't be Dumb!!!");
                navigation.navigate('SignUp');
              }}
            />
          </View>
        </View>
      </ImageBackground>
    </Layout>
  );
};

export default PasswordRecovery;
