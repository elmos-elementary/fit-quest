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
import { AuthContext } from '../context/AuthContext';

const ExerciseHistory = ({ exerciseId }) => {
  const { user, getExerciseHistory, exerciseHistory } = useContext(AuthContext);

  useEffect(() => {
    getExerciseHistory(user.id, exerciseId);
  }, []);

  return (
    <View style={styles.container}>
      {exerciseHistory.map((exercise, i) => {
        return (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            key={i}
          >
            <View>
              <Text>{exercise.session.date}</Text>
            </View>
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
        );
      })}
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

export default ExerciseHistory;