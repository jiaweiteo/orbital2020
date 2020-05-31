import React from 'react'
import {StyleSheet, Text, View, TextInput, Image, KeyboardAvoidingView } from 'react-native'
import BlueButton from "../components/BlueButton";
import firebaseDb from '../firebaseDb';
import budget from '../components/TrackBudget';
import { LinearGradient } from 'expo-linear-gradient';


class SignUpContainer extends React.Component {

    static navigationOptions = {
        title: 'Login',
        header: {
            visible: false,
        },
      };

    state = {
        name: '',
        email: '',
        password: '',
        isSignUpSuccessful: false
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

     onLoginPress = () =>
            firebaseDb.auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.setState({
                    name: '',
                    email: '',
                    password: '',
                    isSignUpSuccessful: true
            })
            this.props.navigation.replace("Root")
        })
        .catch(err => alert("Invalid Email or Password!"))

    render() {
    const {name, email, password, isSignUpSuccessful} = this.state

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
                     <LinearGradient
          colors={['transparent', 'rgba(255,100,0,0.8)']}
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
                        if (this.checkEmail(email)) {
                            if (this.checkPassword(password)) {
                                    this.onLoginPress()
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
                    }
                }
                >
                 Login
            </BlueButton>
            {isSignUpSuccessful ? (<Text style={styles.text}>Sign Up Successful</Text>) : null}

            <Text style = {styles.text2}> New User? Click here to sign up </Text>
            <BlueButton style = {styles.button2}
                    onPress = {() => {
                        this.props.navigation.replace("Sign Up")
                    }}> Sign Up </BlueButton>
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
        backgroundColor: 'orange',
    },

    button2: {
        marginTop: 20,
        backgroundColor: 'blue',
    },
});


export default SignUpContainer