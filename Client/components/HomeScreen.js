import { CurrentRenderContext } from '@react-navigation/native';
import { Layout } from '@ui-kitten/components';
import React from 'react';
import { ImageBackground } from 'react-native';
import { View, StyleSheet, Text, Button } from 'react-native';
import { image } from './UserHome';

const HomeScreen = ({ navigation }) => (
  <Layout style={{ flex: 1, justifyContent: 'center' }}>
    <ImageBackground
      source={require('../../src/assets/background.jpeg')}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View style={styles.textContainer}>
        <Text style={styles.text} category="h1">
          FIT QUEST
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="Get Started"
            color="black"
            onPress={() => {
              navigation.navigate('SignUp');
            }}
          />
        </View>
      </View>
    </ImageBackground>
  </Layout>
);

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    // fontFamily: 'Palatino-Bold',
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    padding: 15,
    opacity: 0.7,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '40%',
    padding: 1,
    opacity: 0.8,
  },
});

export default HomeScreen;
