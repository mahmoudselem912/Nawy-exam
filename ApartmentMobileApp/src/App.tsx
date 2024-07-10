import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ApartmentList from './src/screens/ApartmentList';
import ApartmentDetails from './src/screens/ApartmentDetails';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ApartmentList">
        <Stack.Screen
          name="ApartmentList"
          component={ApartmentList}
          options={{title: 'Apartment List'}}
        />
        <Stack.Screen
          name="ApartmentDetails"
          component={ApartmentDetails}
          options={{title: 'Apartment Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
