import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TextInput,
  Image,
  Linking,
} from 'react-native';
import ExerciseHistory from './ExerciseHistory';
import ExerciseVisuals from './ExerciseVisuals';
import { AuthContext } from '../context/AuthContext';

const SessionExercise = ({ navigation }) => {
  const { sessionExercise, updateSessionExercise, user, getSession } =
    useContext(AuthContext);

  const [weight1, setWeight1] = useState(sessionExercise.weight1);
  const [weight2, setWeight2] = useState(sessionExercise.weight2);
  const [weight3, setWeight3] = useState(sessionExercise.weight3);
  const [set1, setSet1] = useState(sessionExercise.set1);
  const [set2, setSet2] = useState(sessionExercise.set2);
  const [set3, setSet3] = useState(sessionExercise.set3);
  const [description, setDescription] = useState('about');
  const [visual, setVisual] = useState('visual');

  const onTouch = (id) => {
    updateSessionExercise(id, {
      weight1,
      weight2,
      weight3,
      set1,
      set2,
      set3,
    })
      .then(() => {
        getSession(user.id);
      })
      .then(() => {
        navigation.navigate('SingleRoutine');
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
          <Text style={styles.text}>{sessionExercise.exercise.name}</Text>
        </View>

        <View style={styles.routineContainer}>
          <View style={styles.navigationContainer}>
            <View>
              <Text style={styles.routineText}>Set</Text>
              <TextInput style={styles.textInput1}>1</TextInput>
              <TextInput style={styles.textInput1}>2</TextInput>
              <TextInput style={styles.textInput1}>3</TextInput>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text style={styles.routineText}>Weight (lbs)</Text>
              <TextInput
                onChangeText={(nextValue) => setWeight1(nextValue)}
                style={styles.textInput}
              ></TextInput>
              <TextInput
                onChangeText={(nextValue) => setWeight2(nextValue)}
                style={styles.textInput}
              ></TextInput>
              <TextInput
                onChangeText={(nextValue) => setWeight3(nextValue)}
                style={styles.textInput}
              ></TextInput>
            </View>

            <View style={{ alignItems: 'center', padding: 2 }}>
              <Text style={styles.routineText}>Reps</Text>
              <TextInput
                onChangeText={(nextValue) => setSet1(nextValue)}
                style={styles.textInput}
              ></TextInput>
              <TextInput
                onChangeText={(nextValue) => setSet2(nextValue)}
                style={styles.textInput}
              ></TextInput>
              <TextInput
                onChangeText={(nextValue) => setSet3(nextValue)}
                style={styles.textInput}
              ></TextInput>
            </View>
          </View>

          <Button
            title="Record Exercise"
            onPress={() => {
              onTouch(sessionExercise.id);
            }}
          />
        </View>
        <View>
          <View style={styles.navigationContainer}>
            <View style={styles.navButton}>
              <Button
                title="About"
                color="black"
                onPress={() => {
                  setDescription('about');
                }}
              />
            </View>

            <Button
              title="History"
              color="black"
              onPress={() => {
                setDescription('history');
              }}
            />
            <Button
              title="Visual"
              color="black"
              onPress={() => {
                setVisual('visual');
              }}
            />
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          {description === 'about' ? (
            <ScrollView>
              <Text style={{ textAlign: 'center' }}>
                {sessionExercise.exercise.description}
              </Text>
            </ScrollView>
          ) : (
            <ExerciseHistory exerciseId={sessionExercise.exercise.id} />
          )}
        </View>
        {visual === 'visual' ? (
          <>
            <Text>Visual</Text>
          </>
        ) : (
          <View></View>
        )}
      </ImageBackground>
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

  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 50,
    opacity: 0.8,
    borderRadius: 5,
  },

  textContainer: {
    alignItems: 'center',
    margin: 10,
  },

  text: {
    fontSize: 30,
    borderRadius: 5,
    borderColor: '#3D3D3D',
    padding: 4,
    margin: 10,
    alignItems: 'center',
  },

  routineContainer: {
    backgroundColor: '#dddddd',
    opacity: 0.9,
    borderRadius: 10,
    margin: 10,
    padding: 10,
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
  descriptionContainer: {
    flex: 2,
    backgroundColor: '#dddddd',
    opacity: 0.9,
    margin: 20,
    padding: 40,
    borderRadius: 5,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#dddddd',
    opacity: 0.9,
    margin: 15,
    borderRadius: 15,
  },
  imageContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    overflow: 'hidden',
    margin: 20,
  },

  routineText: {
    fontWeight: 'bold',
    fontSize: 15,
  },

  textInput1: {
    padding: 5,
    borderRadius: 5,
    margin: 5,
  },
  textInput: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    margin: 5,
    width: 50,
  },
  navButton: {
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 2,
  },
});

export default SessionExercise;
