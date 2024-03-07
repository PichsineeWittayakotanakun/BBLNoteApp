import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '@/features/auth/LoginScreen';
import HomeScreen from '@/features/main/HomeScreen';
import NoteScreen from '@/features/main/NoteScreen';
import CommentScreen from '@/features/main/CommentScreen';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList} from './RootStackParamList';

const AuthStack = createNativeStackNavigator<RootStackParamList>();
const MainStack = createNativeStackNavigator<RootStackParamList>();

function AuthRoute() {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}

function MainRoute() {
  return (
    <MainStack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Note" component={NoteScreen} />
      <MainStack.Screen name="Comment" component={CommentScreen} />
    </MainStack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator
        initialRouteName="AuthStack"
        screenOptions={{headerShown: false}}>
        <AuthStack.Screen name="AuthStack" component={AuthRoute} />
        <AuthStack.Screen name="MainStack" component={MainRoute} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
