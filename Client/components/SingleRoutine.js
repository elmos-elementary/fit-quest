import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { image } from './UserHome';
import { AuthContext } from '../context/AuthContext';

const SingleRoutine = ({ navigation }) => {
  const { singleRoutine } = useContext(AuthContext);
  console.log(singleRoutine);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View style={styles.textContainer}>
          <Text style={styles.text}>Current Routine: {singleRoutine.date}</Text>
          <ScrollView>
            {/* {singleRoutine.exercises.map((exercise) => {
              return (
                <View key={exercise.id}>
                  <Text>{exercise.name}</Text>
                </View>
              );
            })} */}
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

export default SingleRoutine;
