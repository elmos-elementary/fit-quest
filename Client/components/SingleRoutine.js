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

const SingleRoutine = ({ navigation }) => {
  const { singleRoutine, getSessionExercise } = useContext(AuthContext);
  // console.log('inside single routine ', singleRoutine.sessionExercises);

  const onTouch = (id) => {
    getSessionExercise(id).then(() => {
      navigation.navigate('SessionExercise');
      console.log('in on touch');
    });
  };

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
            {singleRoutine.sessionExercises.map((exercise) => {
              // console.log('exercise :>> ', exercise);
              return (
                <View key={exercise.id} style={{ margin: 20 }}>
                  <Text>{exercise.exercise.name}</Text>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text>Set 1</Text>
                      <TextInput>Reps</TextInput>
                      <TextInput>Weight</TextInput>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text>Set 2</Text>
                      <TextInput>Reps</TextInput>
                      <TextInput>Weight</TextInput>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text>Set 3</Text>
                      <TextInput>Reps</TextInput>
                      <TextInput>Weight</TextInput>
                    </View>
                    <Button
                      title="Record Exercise =>"
                      onPress={() => {
                        onTouch(exercise.exerciseId);
                      }}
                    />
                  </View>
                </View>
              );
            })}
            <Button title="Complete Workout" />
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
