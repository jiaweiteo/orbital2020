import React from 'react'
import {StyleSheet, Text, View, TextInput, Image, KeyboardAvoidingView } from 'react-native'
import BlueButton from "../components/BlueButton";
import firebaseDb from '../firebaseDb';

class SignUpContainer extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        isSignUpSuccessful: false
    };

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


    render() {
    const {name, email, password, isSignUpSuccessful} = this.state

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Image style={styles.image} source={require('../assets/Logo.png')}/>
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
                placeholder="Password"
                onChangeText={this.handleUpdatePassword}
                value={password}
            />
            <BlueButton
                style={styles.button}
                onPress={() => {
                    if (name.length && email.length && password.length) {
                        this.handleCreateUser()
                    }
                }
                }
                >
                 Sign up
            </BlueButton>
            {isSignUpSuccessful ? (<Text style={styles.text}>Sign Up Successful</Text>) : null}
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
    },
    button: {
        marginTop: 42,
    },
});


export default SignUpContainer