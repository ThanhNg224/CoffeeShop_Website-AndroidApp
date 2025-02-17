import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import HomePage from './components/HomePage';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import MenuPage from './components/MenuPage';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomePage} 
          options={{ headerTitle: 'Home Page' }}
        />
        <Stack.Screen 
          name="AboutUs" 
          component={AboutUs} 
        />
        <Stack.Screen 
          name="Contact" 
          component={Contact}
        />
        <Stack.Screen 
          name="Menu" 
          component={MenuPage}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
