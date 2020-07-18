import React from 'react'
import {StyleSheet, Text, View, TextInput, Image, KeyboardAvoidingView, Button, TouchableOpacity, Dimensions, Platform, ScrollView, StatusBar } from 'react-native'
import BlueButton from "../components/BlueButton";
import firebaseDb from '../firebaseDb';
import budget from '../components/TrackBudget';
import {LinearGradient} from 'expo-linear-gradient';
import {signUp} from "../API/Collection";
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';


class SignUpContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            secureTextEntry: true,
        }
        this.onSignUpPress = this.onSignUpPress.bind(this);
    }

    static navigationOptions = {
        title: 'SignUp',
        header: {
            visible: false,
        },
    };


    checkUser(namea) {
        if (namea === "") {
            return false;
        }
        console.log(namea.length)
        return namea.length >= 6 ? true : false
    }

    validateEmail = emaila => {
        var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(emaila);
    };

    checkPassword(pass) {
        if (pass === "") {
            return false;
        }
        return pass.length >= 6 ? true : false;
    }

    checkExisting(id, mail) {
        let notExist = true;
        var user = firebaseDb.firestore().collection('users')
        user.where("name", "==", id).get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    notExist = false;
                    alert("Username have been taken!")

                });
            }).then(() => {
            user.where("email", "==", mail).get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        notExist = false;
                        alert("Email have been taken!")
                    })
                }).then(() => {
                if (notExist == true) {
                    this.onSignUpPress()
                    this.props.navigation.replace("Create New Budget")
                    budget.updateUser(id)
                }
            })
        }).catch(err => alert(err))
            .catch(function (error) {
                alert("Error getting documents: " + error);
            });
    }


    handleUpdateName = (name) => {
        this.setState({name})
    };
    handleUpdateEmail = (email) => {
        this.setState({email})
    };
    handleUpdatePassword = (password) => {
        this.setState({password})
    };

    onSignUpPress = () => signUp({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
    });

    updateSecureTextEntry = () => {
        this.setState(prevState => ({
            secureTextEntry: !prevState.secureTextEntry
        }))
    };

    render() {
        const {name, email, password} = this.state

        return (
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
                <StatusBar backgroundColor='#009387' barStyle="light-content"/>
                <View style={styles.header}>
                    <Text style={styles.text_header}>Register Now!</Text>
                </View>
                <Animatable.View
                    animation="fadeInUpBig"
                    style={styles.footer}
                >
                    <ScrollView>
                        <Text style={styles.text_footer}>Username</Text>
                        <View style={styles.action}>
                            <FontAwesome
                                name="user-o"
                                color="#05375a"
                                size={20}
                            />
                            <TextInput
                                placeholder="Your Username"
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={this.handleUpdateName}
                                value={name}
                            />
                        </View>

                        <Text style={[styles.text_footer, {
                            marginTop: 35
                        }]}>Email</Text>
                        <View style={styles.action}>
                            <Feather
                                name="lock"
                                color="#05375a"
                                size={20}
                            />
                            <TextInput
                                placeholder="Your Email"
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={this.handleUpdateEmail}
                                value={email}
                                keyboardType = "email-address"
                            />
                        </View>

                        <Text style={[styles.text_footer, {
                            marginTop: 35
                        }]}>Password</Text>
                        <View style={styles.action}>
                            <Feather
                                name="lock"
                                color="#05375a"
                                size={20}
                            />
                            <TextInput
                                placeholder="Your Password"
                                secureTextEntry={this.state.secureTextEntry }
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={this.handleUpdatePassword}
                                value={password}
                            />
                            <TouchableOpacity
                                onPress={()=> {this.updateSecureTextEntry(this.state.secureTextEntry)}}
                            >
                                {this.state.secureTextEntry ?
                                    <Feather
                                        name="eye-off"
                                        color="grey"
                                        size={20}
                                    />
                                    :
                                    <Feather
                                        name="eye"
                                        color="grey"
                                        size={20}
                                    />
                                }
                            </TouchableOpacity>
                        </View>

                        <View style={styles.textPrivate}>
                            <Text style={styles.color_textPrivate}>
                                By signing up you agree to our
                            </Text>
                            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                            <Text style={styles.color_textPrivate}>{" "}and</Text>
                            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity
                                style={styles.signIn}
                                onPress={() => {
                                    if (this.checkUser(name)) {
                                        if (this.validateEmail(email)) {
                                            if (this.checkPassword(password)) {
                                                this.checkExisting(name, email)
                                            } else {
                                                alert("Password must be 6 character length or longer!")
                                                this.setState({
                                                    password: "",
                                                })
                                            }
                                        } else {
                                            alert("Please enter a valid email!")
                                            this.setState({
                                                email: "",
                                            })
                                        }
                                    } else {
                                        alert("Username must be 6 character length or longer!")
                                        this.setState({
                                            name: "",
                                        })
                                    }
                                }}
                            >
                                <LinearGradient
                                    colors={['#08d4c4', '#01ab9d']}
                                    style={styles.signIn}
                                >
                                    <Text style={[styles.textSign, {
                                        color: '#fff'
                                    }]}>Sign Up</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={()=>{this.props.navigation.replace("Login")}}
                                style={[styles.signIn, {
                                    borderColor: '#009387',
                                    borderWidth: 1,
                                    marginTop: 15
                                }]}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#009387'
                                }]}>Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </Animatable.View>
            </KeyboardAvoidingView>
        );
    };
}


const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#009387'
        },
        header: {
            flex: 1,
            justifyContent: 'flex-end',
            paddingHorizontal: 20,
            paddingBottom: 50
        },
        footer: {
            flex: Platform.OS === 'ios' ? 3 : 5,
            backgroundColor: '#fff',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingHorizontal: 20,
            paddingVertical: 30
        },
        text_header: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 30
        },
        text_footer: {
            color: '#05375a',
            fontSize: 18
        },
        action: {
            flexDirection: 'row',
            marginTop: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#f2f2f2',
            paddingBottom: 5
        },
        textInput: {
            flex: 1,
            marginTop: Platform.OS === 'ios' ? 0 : -12,
            paddingLeft: 10,
            color: '#05375a',
        },
        button: {
            alignItems: 'center',
            marginTop: 50
        },
        signIn: {
            width: '100%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10
        },
        textSign: {
            fontSize: 18,
            fontWeight: 'bold'
        },
        textPrivate: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 20
        },
        color_textPrivate: {
            color: 'grey'
        }
    });


export default SignUpContainer