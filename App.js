import {NavigationContainer,  DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {Platform, Appearance , StatusBar, StyleSheet, View, Text, Button} from 'react-native';
import {Provider as PaperProvider, DefaultTheme as PaperDefaultTheme} from 'react-native-paper';
import {createDrawerNavigator} from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";


import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import CurrentPort from './screens/CurrentPort'
import HomeScreen from './screens/HomeScreen';
import Portfolio from './screens/Portfolio'
import PastPort from './screens/PastPort'
import CreateBudget from './screens/CreateBudget'
import NewBudget from './screens/NewBudget'
import EditBudget from './screens/EditBudget'
import SignUpContainer from './containers/SignUpContainer'
import LoginPageContainer from './containers/LoginPageContainer'
import ExpenseScreen from './screens/ExpenseScreen';
import Overview from './screens/Overview';
import Search from './screens/Search';
import CoupleScreen from './screens/CoupleScreen';
import CoupleOverview from './screens/CoupleOverview';
import CoupleCurrentPort from './screens/CoupleCurrentPort';
import PastCouplePort from './screens/PastCouplePort';
import SplashScreen from "./containers/SplashScreen";
import CoupleMore from './screens/CoupleMore';
import SplitExpense from './screens/SplitExpense';
import DrawerScreen from "./screens/DrawerScreen";



const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const HomeStack = createStackNavigator()

const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
        ...NavigationDefaultTheme.colors,
        ...PaperDefaultTheme.colors,
        background: '#ffffff',
        text: '#333333'
    }
}

class HomeStackScreen extends React.Component {
    static navigationOptions = {
        title: 'HomeStackScreen',
    }

    render() {
        console.disableYellowBox = true;
        return (
            <Stack.Navigator>
                <Stack.Screen options={{headerShown: false}} name="SplashScreen" component={SplashScreen}/>
                <Stack.Screen options={{headerShown: false}} name="Sign Up" component={SignUpContainer}/>
                <Stack.Screen options={{headerShown: false}} name="Login" component={LoginPageContainer}/>
                <Stack.Screen options={{headerShown: false}} name="Root" component={BottomTabNavigator}/>
                <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen}/>
                <Stack.Screen options={{headerShown: false}} name="Expense" component={ExpenseScreen}/>
                <Stack.Screen name="Port" component={Portfolio}/>
                <Stack.Screen options={{headerStyle: {backgroundColor: '#009387',},  headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' }}} name="My Portfolio" component={CurrentPort}/>
                <Stack.Screen options={{headerStyle: {backgroundColor: '#009387',},  headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' }}} name="Past Portfolio" component={PastPort}/>
                <Stack.Screen options={{headerStyle: {backgroundColor: '#009387',},  headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' }}} name="Create Budget" component={CreateBudget}/>
                <Stack.Screen options={{headerStyle: {backgroundColor: '#009387',},  headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' }}} name="Create New Budget" component={NewBudget}/>
                <Stack.Screen options={{headerStyle: {backgroundColor: '#009387',},  headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' }}} name="Edit Current Budget" component={EditBudget}/>
                <Stack.Screen options={{headerStyle: {backgroundColor: '#009387',},  headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' }}} name="Overview" component={Overview}/>
                <Stack.Screen options={{headerStyle: {backgroundColor: '#009387',},  headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' }}} name="Search Users" component={Search}/>
                <Stack.Screen options={{headerShown: false}} name="Couplescreen" component={CoupleScreen}/>
                <Stack.Screen options={{headerStyle: {backgroundColor: '#d02860',},  headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' }}} name="Couple Overview" component={CoupleOverview}/>
                <Stack.Screen options={{headerStyle: {backgroundColor: '#d02860',},  headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' }}} name="Couple Portfolio" component={CoupleCurrentPort}/>
                <Stack.Screen options={{headerStyle: {backgroundColor: '#d02860',},  headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' }}} name="Couple Past Portfolio" component={PastCouplePort}/>
                <Stack.Screen options={{headerStyle: {backgroundColor: '#d02860',},  headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' }}} name="More" component={CoupleMore}/>
                <Stack.Screen options={{headerStyle: {backgroundColor: '#009387',},  headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' }}} name="Split Expense" component={SplitExpense}/>

            </Stack.Navigator>
        )
    }
}

export default function App(props) {
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            // <PaperProvider theme={CustomDefaultTheme}>
            //     {Platform.OS === 'ios' && <StatusBar barStyle="dark-content"/>}
                <NavigationContainer theme = {CustomDefaultTheme} linking={LinkingConfiguration}>
                    <Drawer.Navigator drawerContent={props => <DrawerScreen {...props} />}>
                        <Drawer.Screen name="HomeDrawer" component={HomeStackScreen} />
                        <Drawer.Screen name="SupportScreen" component={Portfolio} />
                        <Drawer.Screen name="SettingsScreen" component={ExpenseScreen} />
                        <Drawer.Screen name="BookmarkScreen" component={CurrentPort} />
                    </Drawer.Navigator>
                </NavigationContainer>
            // </PaperProvider>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});