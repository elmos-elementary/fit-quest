import React from 'react';
import { Layout, Text, Button, Input } from '@ui-kitten/components';

const Login = () => {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category="h1">Login</Text>
      <Input
        placeholder="username"
        value={userName}
        onChangeText={(nextValue) => setUserName(nextValue)}
      />
      <Input
        placeholder="password"
        value={password}
        secureTextEntry={true}
        onChangeText={(nextValue) => setPassword(nextValue)}
      />

      <Button style={{ margin: 10 }}>Log In</Button>
    </Layout>
  );
};

export default Login;
