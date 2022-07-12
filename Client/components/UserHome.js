import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import * as Font from 'expo-font';

const UserHome = ({ navigation }) => {
  const { logout, user, getUserHistory, getSession } = useContext(AuthContext);

  const findUserHistory = () => {
    getUserHistory(user.id).then(() => {
      navigation.navigate('UserHistory');
    });
  };

  const getUserCurrentSession = () => {
    getSession(user.id).then(() => {
      navigation.navigate('SingleRoutine');
    });
  };

  useEffect(() => {
    getSession(user.id);
    getUserHistory(user.id);
  }, []);

  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.container}>
          <ImageBackground
            source={require('../../src/assets/background.jpeg')}
            resizeMode="cover"
            style={styles.backgroundImage}
          >
            <View style={styles.image}>
              <Image
                source={{ uri: user.image }}
                style={{ width: 300, height: 300 }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={{ fontSize: 20, fontFamily: Font.helvetica }}>
                {user.firstName}
              </Text>

              <Text style={{ fontSize: 15, fontFamily: Font.helvetica }}>
                Level {user.currentLevel}
              </Text>
              <ProgressBar progress={0.5} />
              <View style={styles.button}>
                <Button
                  color="black"
                  title="Start Workout"
                  onPress={() => {
                    {
                      user.currentSession
                        ? getUserCurrentSession()
                        : navigation.navigate('AllRoutines');
                    }
                  }}
                />
              </View>
              <View style={styles.button}>
                <Button
                  color="black"
                  title="History"
                  onPress={() => {
                    findUserHistory();
                  }}
                />
              </View>
              <View style={styles.button}>
                <Button
                  color="black"
                  title="Character"
                  onPress={() => {
                    navigation.navigate('Character');
                  }}
                />
              </View>
              <View>
                <Button
                  title="logout"
                  style={{ margin: 10 }}
                  onPress={() => {
                    logout();
                  }}
                />
              </View>
            </View>
          </ImageBackground>
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size={'large'} />
        </View>
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 40,
    padding: 10,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 60,
    backgroundColor: 'white',
    borderRadius: 20,
    opacity: 0.8,
  },

  button: {
    borderWidth: 1,
    borderColor: '#3D3D3D',
    backgroundColor: '#7E7E7E',
    borderRadius: 20,
    width: '60%',
    marginRight: 8,
    marginTop: 8,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserHome;
