import * as React from 'react';
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import HomeScreen from '../screens/HomeScreen';
import Portfolio from '../screens/Portfolio';
import ExpenseScreen from '../screens/ExpenseScreen'
import CoupleScreen from '../screens/CoupleScreen';
import {createStackNavigator} from "@react-navigation/stack";
import { LinearGradient } from 'expo-linear-gradient';

const HomeStack = createStackNavigator()
const BottomTab = createMaterialBottomTabNavigator()
const INITIAL_ROUTE_NAME = 'Home';


export default function BottomTabNavigator({navigation, route}) {
    navigation.setOptions({headerTitle: getHeaderTitle(route)});

    return (
        <BottomTab.Navigator 
            initialRouteName={INITIAL_ROUTE_NAME} 
            activeColor="#fff"
            inactiveColor="#A7A3A3"
            barStyle={{             
                backgroundColor: 'transparent',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                borderColor: 'transparent',
                overflow: "scroll",
            }}
            shifting = {true}
            >

            <BottomTab.Screen
                name="addExpense"
                component={ExpenseNavigateScreen}
                options={{
                    tabBarLabel: 'Add',
                    tabBarColor: '#009387',
                    tabBarIcon: ({color}) => (
                        <Icon name="ios-add" color={color} size={26}/>
                    )
                }}
            />
            <BottomTab.Screen
                name="Home"
                component={HomeNavigateScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarColor: '#009387',
                    tabBarIcon: ({color}) => (
                        <Icon name="ios-home" color={color} size={26}/>
                    ),
                }}
            />
            {/* <BottomTab.Screen
                name="Portfolio"
                component={PortfolioNavigateScreen}
                options={{
                    tabBarLabel: 'PortFolio',
                    tabBarColor: '#009387',
                    tabBarIcon: ({color}) => (
                        <Icon name="md-book" color={color} size={26}/>
                    )
                }}

            /> */}
            <BottomTab.Screen
                name="CoupleScreen"
                component={CoupleNavigateScreen}
                options={{
                    tabBarLabel: 'Couple',
                    tabBarColor: '#d02860',
                    tabBarIcon: ({color}) => (
                        <Icon name="md-heart" color={color} size={26}/>
                    )
                }}
            />
            
        </BottomTab.Navigator>
    );
}

function getHeaderTitle(route) {
    const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

    switch (routeName) {
        case 'Home':
            return 'SmartTrack';
        case 'Couple':
            return 'Couple';
        case 'addExpense':
            return 'Add new expense'
    }
}
const ExpenseNavigateScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="Home" component={ExpenseScreen} options={{
            title:'Add',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
        }} />
    </HomeStack.Navigator>
);
const HomeNavigateScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
            title:'Home',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
        }} />
    </HomeStack.Navigator>
);
// const PortfolioNavigateScreen = ({navigation}) => (
//     <HomeStack.Navigator screenOptions={{
//         headerStyle: {
//             backgroundColor: '#009387',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//             fontWeight: 'bold'
//         }
//     }}>
//         <HomeStack.Screen name="Home" component={Portfolio} options={{
//             title:'Portfolio',
//             headerLeft: () => (
//                 <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
//             )
//         }} />
//     </HomeStack.Navigator>
// );
const CoupleNavigateScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#d02860',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="Home" component={CoupleScreen} options={{
            title:'Couple',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#d02860" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
        }} />
    </HomeStack.Navigator>
);

