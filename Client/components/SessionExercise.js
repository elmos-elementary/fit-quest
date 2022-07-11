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
  Image,
} from 'react-native';
import { image } from './UserHome';
import { AuthContext } from '../context/AuthContext';

const SessionExercise = ({ navigation }) => {
  const onTouch = () => {};

  const { sessionExercise } = useContext(AuthContext);
  console.log('sessionExercise :>> ', sessionExercise);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../src/assets/background.jpeg')}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.text}>{sessionExercise.exercise.name}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text style={{ fontSize: 15 }}>Set</Text>
            <TextInput>1</TextInput>
            <TextInput>2</TextInput>
            <TextInput>3</TextInput>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text>Weight (lbs)</Text>
            <TextInput>{sessionExercise.weight1}</TextInput>
            <TextInput>{sessionExercise.weight2}</TextInput>
            <TextInput>{sessionExercise.weight3}</TextInput>
          </View>
          <View style={{ alignItems: 'center', padding: 2 }}>
            <Text>Reps</Text>
            <TextInput>{sessionExercise.set1}</TextInput>
            <TextInput>{sessionExercise.set2}</TextInput>
            <TextInput>{sessionExercise.set3}</TextInput>
          </View>
        </View>

        <ScrollView>
          <Text>{sessionExercise.exercise.description}</Text>
        </ScrollView>
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

export default SessionExercise;
