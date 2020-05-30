import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Button } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import CurrentPort from './screens/CurrentPort'
import HomeScreen from './screens/HomeScreen';
import Portfolio from './screens/Portfolio'
import PastPort from './screens/PastPort'
import CreateBudget from './screens/CreateBudget'
import EditBudget from './screens/EditBudget'
import ViewCategory from './screens/ViewCategory'
import SignUpContainer from './containers/SignUpContainer'
import LoginPageContainer from './containers/LoginPageContainer'


const Stack = createStackNavigator();

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator>
            <Stack.Screen name = "Sign Up" component = {SignUpContainer} />
            <Stack.Screen name = "Login" component = {LoginPageContainer} />

            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen name = "Home" component= {HomeScreen} />
            <Stack.Screen name = "Port" component= {Portfolio} />
            <Stack.Screen name = "My Portfolio" component= {CurrentPort} />
            <Stack.Screen name = "Past Portfolio" component = {PastPort} />
            <Stack.Screen name = "Create New Budget" component = {CreateBudget} />
            <Stack.Screen name = "Edit Current Budget" component = {EditBudget} />
            <Stack.Screen name = "View By Category" component = {ViewCategory} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
