import { Layout, Text, Button } from '@ui-kitten/components';

const HomeScreen = ({navigation}) => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category="h1">FitQuest</Text>
    <Text category="s1">Time to gamify your body</Text>
    <Button style={{ margin: 10 }}>Sign Up</Button>
    <Button style={{ margin: 10 }} onPress={() => {navigation.navigate('Login')}}>Log In</Button>
  </Layout>
);

export default HomeScreen;
