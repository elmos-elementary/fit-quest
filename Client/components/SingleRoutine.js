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
  Alert,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';

const SingleRoutine = ({ navigation }) => {
  const {
    singleRoutine,
    getSessionExercise,
    completeSession,
    user,
    getSession,
  } = useContext(AuthContext);

  const onTouch = (id) => {
    getSessionExercise(id).then(() => {
      navigation.navigate('SessionExercise');
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../src/assets/background.jpeg')}
        resizeMode="cover"
        imageStyle={{ opacity: 0.9 }}
        style={styles.backgroundImage}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.text}>Current Routine: </Text>
          <Text>{new Date().toLocaleString()}</Text>
        </View>

        <ScrollView>
          {singleRoutine.sessionExercises.map((exercise) => {
            return (
              <View key={exercise.id} style={{ margin: 20 }}>
                <View style={styles.routineContainer}>
                  <Text style={styles.routineName}>
                    {exercise.exercise.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View>
                      <Text style={{ fontSize: 15 }}>Set</Text>
                      <Text>1</Text>
                      <Text>2</Text>
                      <Text>3</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                      <Text>Weight (lbs)</Text>
                      <Text>{exercise.weight1}</Text>
                      <Text>{exercise.weight2}</Text>
                      <Text>{exercise.weight3}</Text>
                    </View>
                    <View style={{ alignItems: 'center', padding: 2 }}>
                      <Text>Reps</Text>
                      <Text>{exercise.set1}</Text>
                      <Text>{exercise.set2}</Text>
                      <Text>{exercise.set3}</Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="Complete Workout"
              color="white"
              onPress={() => {
                completeSession(user.id);
                Alert.alert('Good Job', 'Want to try some more?', [
                  {
                    text: 'No',
                    onPress: () => navigation.navigate('UserHome'),
                    style: 'cancel',
                  },
                  {
                    text: 'yes',
                    onPress: () => navigation.navigate('AllRoutines'),
                  },
                ]);
              }}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },

  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 35,
    opacity: 0.8,
    borderRadius: 15,
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    backgroundColor: 'black',
    padding: 2,
    margin: 50,
    borderRadius: 15,
    width: '50%',
  },
  routineContainer: {
    backgroundColor: 'white',
    opacity: 0.9,
    // padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  routineName: {
    textAlign: 'center',
    fontSize: 20,
    padding: 5,
    fontWeight: 'bold',
  },
  addRoutine: {
    backgroundColor: '#7E7E7E',
    borderWidth: 1,
  },
});

export default SingleRoutine;
