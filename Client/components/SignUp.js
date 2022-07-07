import React, { useContext } from 'react';
import { Layout, Text, Button, Input } from '@ui-kitten/components';
import { AuthContext } from '../context/AuthContext';

const SignUp = ({ navigation }) => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const { signUp } = useContext(AuthContext);
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
        onChangeText={(nextValue) => setEmail(nextValue.toLowerCase())}
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
          signUp(email, password, firstName, lastName);
        }}
      >
        Sign Up
      </Button>
    </Layout>
  );
};

export default SignUp;
