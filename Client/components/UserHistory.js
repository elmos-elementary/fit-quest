import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { image } from './UserHome';
import { AuthContext } from '../context/AuthContext';

const UserHistory = ({ navigation }) => {
  const { userHistory, user } = useContext(AuthContext);
  // console.log('userHistory :>> ', userHistory);
  // console.log('userHistory :>> ', userHistory.length);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../src/assets/background.jpeg')}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View style={styles.textContainer}>
          <Text style={styles.text}>Past Workouts</Text>
          <ScrollView>
            {userHistory.map((history, i) => {
              // console.log(
              //   'history inside map :>>*********************** ',
              //   history
              // );
              return (
                <TouchableOpacity key={i} style={{ margin: 20 }}>
                  <Text>{history.date}</Text>
                  <Text>{history.routine.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  text: {
    fontSize: 30,

    borderRadius: 5,
    borderColor: '#3D3D3D',
    borderWidth: 1,
    padding: 4,
    margin: 5,
  },
});

export default UserHistory;
