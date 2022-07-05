import React, { useContext } from 'react';
import { Layout, Text, Button, Input } from '@ui-kitten/components';
import { AuthContext } from '../context/AuthContext';

const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  console.log('in login', useContext(AuthContext));
  const { login } = useContext(AuthContext);

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category="h1">Login</Text>
      <Text category="s1">Don't have an account?</Text>
      <Text></Text>
      <Text
        category="s1"
        status="primary"
        onPress={() => {
          navigation.navigate('SignUp');
        }}
      >
        Sign up here.
      </Text>
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
          login();
        }}
      >
        Log In
      </Button>
    </Layout>
  );
};

export default Login;
