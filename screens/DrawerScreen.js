import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';

import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebaseDb from "../firebaseDb";
import budget from "../components/TrackBudget";


export default function DrawerContent(props) {

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: 'row', marginTop: 15}}>
                            <Avatar.Image
                                source= {{uri : budget.state.uri}}
                                size={50}
                            />
                            <View style={{marginLeft: 15, flexDirection: 'column'}}>
                                <Title style={styles.title}>{budget.getUser()}</Title>
                                <Caption style={styles.caption}>{budget.state.email}</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>${budget.state.expenses}</Paragraph>
                                <Caption style={styles.caption}>Spent</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>${budget.state.budget - budget.state.expenses}</Paragraph>
                                <Caption style={styles.caption}>Remaining</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="google-analytics"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="View Current Portfolio"
                            onPress={() => {
                                const { navigate } = props.navigation
                                navigate('Overview')
                            }}                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="history"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="View Past Portfolio"
                            onPress={() => {
                                const { navigate } = props.navigation
                                navigate('Past Portfolio')
                            }}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="currency-usd"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Create Budget"
                            onPress={() => {
                                const { navigate } = props.navigation
                                navigate('Create Budget')
                            }}                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="eyedropper"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Edit Current Budget"
                            onPress={() => {
                                const { navigate } = props.navigation
                                navigate('Edit Current Budget')
                            }}                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="account-multiple-plus"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Split Expense"
                            onPress={() => {
                                const { navigate } = props.navigation
                                navigate('Split Expense')
                            }}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => firebaseDb.auth().signOut().then(() => {
                        alert("Sign Out Successfully!")
                        props.navigation.navigate('Login')
                    }).catch(err => console.log(err))
                    }
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});