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
import * as Font from 'expo-font';
import { Bar } from 'react-native-progress';

const UserHome = ({ navigation }) => {
  const {
    logout,
    user,
    getUserHistory,
    getSession,
    getUserItems,
    getCurrentOpponent,
    getAllItems,
  } = useContext(AuthContext);

  const findUserHistory = () => {
    getUserHistory(user.id).then(() => {
      navigation.navigate('HistoryUserStack', { screen: 'UserHistory' });
    });
  };

  const getUserCurrentSession = () => {
    getSession(user.id).then(() => {
      navigation.navigate('userNoSessionStack', { screen: 'SingleRoutine' });
    });
  };

  const getCharacterInfo = () => {
    getUserItems(user.id).then(() => {
      navigation.navigate('Character');
    });
  };

  useEffect(() => {
    getSession(user.id);
    getCurrentOpponent(user.id);
    getUserHistory(user.id);
    getAllItems();
  }, []);

  let levelCounter = 10;
  const levelExp = {};
  for (let i = 1; i <= 100; i++) {
    if (i === 1) {
      levelExp[i] = 0;
    } else {
      levelExp[i] = levelCounter;
      levelCounter += 11;
    }
  }

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
                style={{ width: 300, height: 350 }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={{ fontSize: 20, fontFamily: Font.helvetica }}>
                {user.firstName}
              </Text>

              <Text style={{ fontSize: 15, fontFamily: Font.helvetica }}>
                Level: {user.currentLevel}
              </Text>
              <Bar
                progress={
                  user.currentLevelExp /
                  levelExp[(user.currentLevel + 1).toString()]
                }
                color={'red'}
                height={15}
              />

              <View style={styles.button}>
                <Button
                  color="black"
                  title="Start Workout"
                  onPress={() => {
                    {
                      user.currentSession
                        ? getUserCurrentSession()
                        : navigation.navigate('userNoSessionStack', {
                            screen: 'AllRoutines',
                          });
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
                    getCharacterInfo();
                  }}
                />
              </View>
              <View>
                <Button
                  title="Logout"
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
    marginTop: 60,
  },

  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 60,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    opacity: 0.8,
    padding: 20,
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
