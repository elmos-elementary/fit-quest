import React, { useContext } from 'react';
import { Layout, Text, Button, Input } from '@ui-kitten/components';
import { AuthContext } from '../context/AuthContext';
import { ImageBackground } from 'react-native';

const image = {
  uri: 'https://imgur.com/rJ1GVWj.jpg',
};

const SignUp = ({ navigation }) => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const { signUp } = useContext(AuthContext);

  const onTouch = async (email, password, firstName, lastName) => {
    await signUp(email.toLowerCase(), password, firstName, lastName);
    await navigation.navigate('CreateCharacter');
    console.log('line 15');
  };

  return (
    <Layout style={{ flex: 1, justifyContent: 'center' }}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <Text category="h1">Create New Account</Text>
        <Text category="s1">Already registered?</Text>
        <Text
          category="s1"
          status="primary"
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
          Login here.
        </Text>
        <Input
          placeholder="First Name"
          value={firstName}
          onChangeText={(nextValue) => setFirstName(nextValue)}
        />
        <Input
          placeholder="Last Name"
          value={lastName}
          onChangeText={(nextValue) => setLastName(nextValue)}
        />
        <Input
          placeholder="Email"
          value={email}
          onChangeText={(nextValue) => setEmail(nextValue)}
        />
        <Input
          placeholder="password"
          value={password}
          secureTextEntry={true}
          onChangeText={(nextValue) => setPassword(nextValue)}
        />

        <Button
          style={{ margin: 10 }}
          onPress={() => {
            onTouch(email, password, firstName, lastName);
          }}
        >
          Sign Up
        </Button>
      </ImageBackground>
    </Layout>
  );
};

export default SignUp;
