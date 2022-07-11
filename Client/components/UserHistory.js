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
  const { userHistory } = useContext(AuthContext);
  console.log('userHistory :>> ', userHistory);
  // console.log('userHistory :>> ', userHistory.length);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View style={styles.textContainer}>
          <Text style={styles.text}>UserHistory Page</Text>
          <ScrollView>
            {userHistory.map((history, i) => {
              // console.log('history inside map :>> ', history.sessionExercises);
              return (
                <View key={i}>
                  {/* <Text>{history.routine}</Text> */}
                  <Text>{history.routine.name}</Text>
                  {/* <Text>{history.routineId}</Text>; */}
                </View>
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
