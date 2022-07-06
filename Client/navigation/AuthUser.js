import React, { useContext } from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  Image,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { ProgressBar, MD3Colors } from 'react-native-paper';

const image = {
  uri: 'https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg?cs=srgb&dl=pexels-kaique-rocha-775201.jpg&fm=jpg',
};
const AuthUser = () => {
  const { logout } = useContext(AuthContext);
  // console.log('this is props', props);
  return (
    <Modal animationType="slide">
      <View style={styles.container}>
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <View style={styles.image}>
            <Image source={require('../../src/assets/favicon.png')} />
          </View>
          <View style={styles.inputContainer}>
            <Text>Username</Text>
            <Text>Class</Text>
            <Text>Level 99</Text>
            <ProgressBar progress={0.5} />
            <View style={styles.button}>
              <Button color="black" title="Start workout" />
            </View>
            <View style={styles.button}>
              <Button color="black" title="History" />
            </View>
            <View style={styles.button}>
              <Button color="black" title="Character" />
            </View>

            <View>
              <Button
                title="logout"
                style={{ margin: 10 }}
                onPress={() => {
                  logout();
                }}
              ></Button>
            </View>
          </View>
        </ImageBackground>
      </View>
    </Modal>
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
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 60,
    backgroundColor: 'white',
    borderRadius: 20,
    opacity: 0.8,
  },

  button: {
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: 'grey',
    borderRadius: 20,
    width: '60%',
    marginRight: 8,
    marginTop: 8,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    textDecorationLine: 'underline',
  },
});

export default AuthUser;
