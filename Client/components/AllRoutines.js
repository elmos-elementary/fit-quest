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
        <View style={styles.headerContainer}>
          <Text style={styles.text}>Choose Routine</Text>

          <ScrollView>
            {routine ? (
              routine.map((routine) => {
                return (
                  <View style={styles.routineContainer}>
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
                  </View>
                );
              })
            ) : (
              <Text>No Routines</Text>
            )}
          </ScrollView>
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
    flex: 1,
    alignItems: 'center',
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 20,
    marginTop: 50,
    opacity: 0.8,
    borderRadius: 5,
    overflow: 'hidden',
    fontSize: 40,
    padding: 10,
  },

  routineContainer: {
    backgroundColor: '#dddddd',
    opacity: 0.9,
    borderRadius: 5,
    margin: 20,
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
