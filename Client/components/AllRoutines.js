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

import { AuthContext } from '../context/AuthContext';

const AllRoutines = ({ navigation }) => {
  const { routine, getSingleRoutine, singleRoutine, user, logout } =
    useContext(AuthContext);

  const onTouch = (id) => {
    getSingleRoutine(user.id, id).then(() => {
      navigation.navigate('userNoSessionStack', { screen: 'SingleRoutine' });
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
        <View style={styles.textContainer}>
          <Text style={styles.text}>Choose Routine</Text>

          <View>
            <View style={styles.routineContainer}>
              <ScrollView>
                {routine ? (
                  routine.map((routine) => {
                    return (
                      <TouchableOpacity
                        key={routine.id}
                        style={styles.routine}
                        onPress={() => {
                          onTouch(routine.id);
                        }}
                      >
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: 20,
                            fontWeight: 'bold',
                          }}
                        >
                          {routine.name}
                        </Text>

                        {routine.exercises.map((exercise) => {
                          return <Text key={exercise.id}>{exercise.name}</Text>;
                        })}
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <Text>No Routines</Text>
                )}
              </ScrollView>
            </View>
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
  textContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 30,
    opacity: 0.8,
    borderRadius: 5,
    overflow: 'hidden',
    fontSize: 40,
    padding: 10,
  },
  routineContainer: {
    flex: 1,
  },
  routine: {
    margin: 10,
    backgroundColor: 'white',
    opacity: 0.8,
    borderRadius: 5,
    alignItems: 'center',
    padding: 15,
  },
});

export default AllRoutines;
