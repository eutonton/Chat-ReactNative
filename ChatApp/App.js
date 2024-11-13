// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatSelectionScreen from './ChatSelectionScreen';
import ChatScreen from './ChatScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ChatSelection">
        <Stack.Screen name="ChatSelection" component={ChatSelectionScreen} options={{ title: 'Escolher Chat' }} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ title: 'Chat' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
