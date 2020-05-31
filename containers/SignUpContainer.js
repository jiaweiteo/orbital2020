import React from 'react'
import {StyleSheet, Text, View, TextInput, Image, KeyboardAvoidingView } from 'react-native'
import BlueButton from "../components/BlueButton";
import firebaseDb from '../firebaseDb';
import budget from '../components/TrackBudget';
import { LinearGradient } from 'expo-linear-gradient';


class SignUpContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            isSignUpSuccessful: false,
        }
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

    checkEmail(emaila) {
        let dotCounter = 0;
        let atCounter = 0;
        if (emaila.length === 0) {
            return false;
        } else {
        
             for (let i = 0; i < emaila.length; i++) {
                if (emaila.charAt(i) === "@") {
                    atCounter += 1
                 }
                 if (emaila.charAt(i) === ".") {
                    dotCounter += 1
                }
            }
        }

        if (dotCounter >= 1 && atCounter === 1) {
            return true;
        } else {
            return false;
        }
    }

    checkPassword(pass) {
        if (pass === "") {
            return false;
        }
        return pass.length >= 6 ? true : false;
    }


    handleUpdateName = (name) => {this.setState({name})};
    handleUpdateEmail = (email) => {this.setState({email})};
    handleUpdatePassword = (password) => {this.setState({password})};

    handleCreateUser = () =>
        firebaseDb
            .firestore()
            .collection('users')
            .add({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
            .then(() =>
                this.setState({
                    name: '',
                    email: '',
                    password: '',
                    isSignUpSuccessful: true
            }))
            .catch(err => console.error(err))
            
        
    onSignUpPress = () =>
            firebaseDb.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() =>
                this.setState({
                    name: '',
                    email: '',
                    password: '',
                    isSignUpSuccessful: true
            }))
            .catch(err => console.error(err))

    render() {
    const {name, email, password, isSignUpSuccessful} = this.state

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
                     <LinearGradient
          colors={['transparent', 'rgba(0,100,200,0.8)']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 800,
          }}
        />
            <Image style={styles.image} source={require('../assets/images/Logo.png')}/>
            <TextInput
                style={styles.textInput}
                placeholder="Name"
                onChangeText={this.handleUpdateName}
                value={name}
            />
            

            <TextInput
                style={styles.textInput}
                placeholder="Email"
                onChangeText={this.handleUpdateEmail}
                value={email}
            />

            <TextInput
                style={styles.textInput}
                secureTextEntry = {true}
                placeholder="Password"
                onChangeText={this.handleUpdatePassword}
                value={password}
            />
            <BlueButton
                style={styles.button}
                onPress={() => {
                    if (this.checkUser(name)) {
                        if (this.checkEmail(email)) {
                            if (this.checkPassword(password)) {
                                    this.handleCreateUser()
                                    this.onSignUpPress()
                                    this.props.navigation.replace("Create New Budget")
                                    budget.updateUser(name)
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
                }
                }
                >
                 Sign up
            </BlueButton>
            {isSignUpSuccessful ? (<Text style={styles.text}>Sign Up Successful</Text>) : null}

            <Text style = {styles.text2}> Already have an account? Click here to login </Text>
            <BlueButton style = {styles.button2}
                    onPress = {() => {
                        this.props.navigation.replace("Login")
                    }}> Login </BlueButton>
        </KeyboardAvoidingView>
    );
}
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text :{
        fontSize: 20,
        paddingHorizontal: 19,
        paddingVertical :20,
        borderRadius :5,
        color: 'black',
        textAlign: 'center',
        marginTop: 40,
    },
    text2: {
        marginTop: 30,
    },
    image :{
        marginBottom: 50,
    },
    textInput:{
        borderWidth: 1,
        borderColor: 'black',
        fontSize: 20,
        marginBottom: 8,
        width: 200,
        height: 30,
        backgroundColor: 'white'
    },
    button: {
        margin: 42,
    },

    button2: {
        marginTop: 20,
        backgroundColor: 'orange',
    },
});


export default SignUpContainer