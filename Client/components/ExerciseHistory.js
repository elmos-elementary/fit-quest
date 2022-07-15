import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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
          <View key={i}>
            <ScrollView>
              <View>
                <Text style={styles.date}>{exercise.session.date}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.routineName}>Set</Text>
                  <Text>1</Text>
                  <Text>2</Text>
                  <Text>3</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.routineName}>Weight (lbs)</Text>
                  <Text>{exercise.weight1}</Text>
                  <Text>{exercise.weight2}</Text>
                  <Text>{exercise.weight3}</Text>
                </View>
                <View style={{ alignItems: 'center', padding: 2 }}>
                  <Text style={styles.routineName}>Reps</Text>
                  <Text>{exercise.set1}</Text>
                  <Text>{exercise.set2}</Text>
                  <Text>{exercise.set3}</Text>
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                }}
              />
            </ScrollView>
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
  date: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  routineName: {
    textAlign: 'center',
    padding: 5,
    fontWeight: 'bold',
  },
});

export default ExerciseHistory;
