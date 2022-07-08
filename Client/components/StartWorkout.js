import React, { useContext } from 'react';
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

const StartWorkout = ({ navigation }) => {
  const { routine, getSingleRoutine, singleRoutine } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View style={styles.textContainer}>
          <Text style={styles.text}>Choose Routine</Text>
          <ScrollView>
            {routine.map((routine) => {
              return (
                <TouchableOpacity
                  key={routine.id}
                  style={{ margin: 10, backgroundColor: 'white', opacity: 0.8 }}
                  onPress={() => {
                    // getSingleRoutine(routine.id);
                    // navigation.navigate('SingleRoutine');
                  }}
                >
                  <Text>{routine.name}</Text>
                  <Text>{routine.id}</Text>
                  {routine.exercises.map((exercise) => {
                    return <Text key={exercise.id}>{exercise.name}</Text>;
                  })}
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

export default StartWorkout;
