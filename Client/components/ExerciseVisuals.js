import React, { useContext } from 'react';
import { View, Text, ScrollView, Linking, Image } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { styles } from './SessionExercise';

const ExerciseVisuals = ({ navigation }) => {
  const { sessionExercise } = useContext(AuthContext);

  return (
    <View>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: sessionExercise.exercise.image }}
          style={{ width: '100%', height: '100%' }}
        />
      </View>

      <Text
        style={{ color: 'blue', textAlign: 'center' }}
        onPress={() => Linking.openURL(sessionExercise.exercise.video)}
      >
        Checkout video
      </Text>
    </View>
  );
};

export default ExerciseVisuals;
