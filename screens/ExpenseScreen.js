import {Ionicons} from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Alert,
    Image,
    Dimensions,
    Platform,
    KeyboardAvoidingView,
    StatusBar, TouchableOpacity
} from 'react-native';
import {RectButton, ScrollView} from 'react-native-gesture-handler';
import BackBtn from '../components/BackBtn';
import {Dropdown} from 'react-native-material-dropdown';
import PropTypes from "prop-types";
import TrackBudget from '../components/TrackBudget'
import budget from '../components/TrackBudget';
import HomeScreen from './HomeScreen';
import {LinearGradient} from 'expo-linear-gradient';
import trackCouple from '../components/TrackCouple'
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import {getLocalAssets} from "expo-asset/build/PlatformUtils";
import KeyboardAwareScrollView from "@pietile-native-kit/keyboard-aware-scrollview";


export default class ExpenseScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            cost: "",
            category: ""
        };
    }

    updateItem = text => this.setState({text})

    updateCost = cost => this.setState({cost})

    updateCategory = category => this.setState({category})

    reset = () => {
        this.setState({
            cost: '',
            text: '',
            category: '',
        })
    }

    render() {
        const {text, cost, category} = this.state;

        let data = [{
            value: 'Grocery',
        }, {
            value: 'Food and Dining',
        }, {
            value: 'Shopping',
        }, {
            value: 'Transport',
        }, {
            value: 'Utilites',
        }, {
            value: 'Insurance',
        }, {
            value: 'Entertainment',
        }, {
            value: 'Personal Care',
        }, {
            value: 'Miscellaneous'
        }, {
            value: 'Others'
        }
        ];

        const promptUser = () => {
            if (trackCouple.getUser() == "") {
                alert("Added!");
                budget.updateExpenses(cost.trim())
                budget.updateHistory(text.trim(), cost.trim(), category)
                budget.addPortfolio()
                this.props.navigation.replace('Root');
            } else {
                const title = 'Submit Expense?';
                const message = "Tap on Individual to include expense in own budget." + "\n" +
                    "Tap on Couple to incluse expense in couple budget.";
                const buttons = [
                    {
                        text: 'Cancel', onPress: () => {
                        }
                    },
                    {
                        text: 'Couple', onPress: () => {
                            alert("Added to Couple Expense!")
                            trackCouple.updateExpenses(cost.trim())
                            trackCouple.updateHistory(text.trim(), cost.trim(), category)
                            trackCouple.addPortfolio()
                            this.props.navigation.replace('Root');
                        }
                    },
                    {
                        text: 'Individual', onPress: () => {
                            alert("Added to Individual Expense!");
                            budget.updateExpenses(cost.trim())
                            budget.updateHistory(text.trim(), cost.trim(), category)
                            budget.addPortfolio()
                            this.props.navigation.replace('Root');
                        }
                    }
                ];
                Alert.alert(title, message, buttons);
            }

        }


        return (
            <KeyboardAwareScrollView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
                <LinearGradient
                    colors={['#4682b4', "transparent"]}
                    style={{
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          top: 0,
                          height: 250,
                        }}
                  />  
                <Animatable.Image
                        animation="bounceIn"
                        duraton="1500"
                        source={require('../assets/images/Logo.png')}
                        style={styles.logo}
                        resizeMode="stretch"
                    />            
                <Animatable.View
                    animation="fadeInUpBig"
                    style={styles.footer}
                >
                <LinearGradient
                    colors={["#rgba(70, 130, 180, 0.5)", "transparent"]}
                    style={{
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          top: 0,
                          borderTopLeftRadius: 30,
                          borderTopRightRadius: 30,
                          height: 600,
                        }}
                  />  
                    <View style={styles.action}>
                        <TextInput
                            placeholderTextColor="#fff"
                            style={styles.textInput}
                            autoCapitalize="none"
                            placeholder="Item"
                            onChangeText={this.updateItem}
                            value={text}
                        />

                    </View>

                    <Dropdown
                              itemCount={5}
                              label="Category"
                              data={data}
                              onChangeText={this.updateCategory}
                              value={category}
                              baseColor= "white"
                              textColor= "white"
                              itemColor= "black"
                              selectedItemColor= "rgba(70, 130, 180, 1)"
                              containerStyle= {styles.category}
                              labelTextStyle= {styles.textSign2}
                              inputContainerStyle= {styles.textSign2}
                    />

                    <View style={styles.action}>
                        <TextInput
                            placeholderTextColor="#fff"
                            style={styles.textInput}
                            placeholder = "Cost"
                            onChangeText = {this.updateCost}
                            value = {cost}
                            keyboardType = {'numeric'}
                        />
                    </View>

                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress = { () =>  {
                            if (this.state.text.trim() == "" || this.state.category == "" || this.state.cost.trim() == "") {
                                alert("Cannot have empty fields!")
                                this.reset();
                            } else if (isNaN(this.state.cost) ) {
                                alert("Invalid Expense! Expense must be a number");
                                this.setState({cost: ""});
                            } else {
                                this.reset();
                                promptUser();
                            }
                        }}
                    >
                        <LinearGradient
                            colors={['#08d4c4', '#01ab9d']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Submit</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                </Animatable.View>
            </KeyboardAwareScrollView>
        )
    }
}


const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    logo: {
        width: height_logo,
        height: height_logo,
        flexDirection: "column",
        alignSelf: "center",
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 80
    },
    footer: {
        flex: 9,
        backgroundColor: 'transparent',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 80,
        paddingVertical: -20,
    },
    text_header: {
        marginTop: 10,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    category: {
        backgroundColor: "#4682b4",
        marginTop: 10,
        borderRadius: 8,
        textAlign: "center",
    },
    action: {
        flexDirection: 'row',
        borderWidth: 2,
        padding: 15,
        borderColor: "#4682b4",
        borderRadius: 8,
        marginTop: 30,
        marginBottom: 30,
        alignItems: "center",
        backgroundColor: '#4682b4',
    },
    textInput: {
        fontSize: 20,
        fontWeight: 'bold',
        flex: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        color: "#fff",
        alignSelf: 'center',
        alignContent: 'stretch',
        textAlign: "center",
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 10,
    },
    signIn: {
        width: "110%",
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: "center",
    },
    textSign2: {
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: "center",
        paddingLeft: 90,
    },
});