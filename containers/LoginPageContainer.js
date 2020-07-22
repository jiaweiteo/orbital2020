import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    KeyboardAvoidingView,
    TouchableOpacity,
    Platform,
    StatusBar,
    Alert
} from 'react-native'
import firebaseDb from '../firebaseDb';
import budget from '../components/TrackBudget';
import trackCouple from '../components/TrackCouple'
import {LinearGradient} from 'expo-linear-gradient';
import pushNotification from "./PushNotification";
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';



class LoginPageContainer extends React.Component {

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
        secureTextEntry: true,
        tempBudget: 0,
        tempExpenses: 0,
        tempItem: [],
        tempCost: [],
        tempCat: [],
        date: 0,
        month: "",
        dateID: "",
        uri: "",


        coupleNoti: false,
        coupleuid: "",
        coupleName: "",
        coupleExpense: 0,
        coupleBudget: 0,
        coupleItem: [],
        coupleCost: [],
        coupleCat: [],
        coupleDate: 0,
        coupleMonth: "",
        coupleDateID: "",
        coupleUID: "",

        friendNoti: false,
        friendExpense: [],

        count: 0,

    };
    validateEmail = (emaila) => {
        var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(emaila);
    };

    checkPassword(pass) {
        if (pass === "") {
            return false;
        }
        return pass.length >= 6 ? true : false;
    }

    handleUpdateEmail = (email) => {
        this.setState({email})
    };
    handleUpdatePassword = (password) => {
        this.setState({password})
    };

    promptUser = (name, uid) => {
        this.state.count += 1;
        const title = 'Accept ' + name + ' as couple?';
        const message = name + " has sent an invitation to be your couple on this app. Click ok to accept and start a shared expense tracker!";
        const buttons = [
            {
                text: 'No', onPress: () => {
                    const currentUser = firebaseDb.auth().currentUser;
                    firebaseDb.firestore().collection("users").doc(currentUser.uid).update({
                        coupleName: "",
                        coupleNoti: false,
                        coupleuid: "",

                    })
                    trackCouple.updateUserDetails([], [], [],
                        0, 0, "", "", "", "")
                }
            },
            {
                text: 'Yes', onPress: () => {
                    const currentUser = firebaseDb.auth().currentUser;
                    firebaseDb.firestore().collection("users").doc(uid).update({
                        coupleName: this.state.name,
                        coupleuid: currentUser.uid,
                        coupleNoti: false,
                    })
                    var user = firebaseDb.firestore().collection('users').doc(currentUser.uid);
                    user.update({coupleNoti: false})
                    alert("Accepted! Please login aganin to have the new changes reflected!")
                }
            }
        ];
        Alert.alert(title, message, buttons);
    }

    promptUser2 = (friendExpense) => {
        this.state.count += 1;
        const title = 'Add ' + friendExpense[0] + ' to personal expense?';
        const message = friendExpense[3] + " has sent a shared expense of $" + friendExpense[1] + "."
        const buttons = [
            {
                text: 'No', onPress: () => {
                    const currentUser = firebaseDb.auth().currentUser;
                    firebaseDb.firestore().collection("users").doc(currentUser.uid).update({
                        friendNoti: false,
                        friendExpense: [],
                    })
                }
            },
            {
                text: 'Yes', onPress: () => {
                    const currentUser = firebaseDb.auth().currentUser;
                    firebaseDb.firestore().collection("users").doc(currentUser.uid).update({
                        friendNoti: false,
                        friendExpense: [],
                    })
                    budget.updateExpenses(Number(friendExpense[1]))
                    budget.updateHistory(friendExpense[0], friendExpense[1], friendExpense[2])
                    budget.addPortfolio()
                    alert("Added! Login again to see the changes reflected!")
                }
            }
        ];
        Alert.alert(title, message, buttons);
    }

    onLoginPress = () =>
        firebaseDb.auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                var user = firebaseDb.auth().currentUser;
                let docRef = firebaseDb.firestore().collection('users').doc(user.uid)

                docRef.collection('Couple Expense').doc('Budget').onSnapshot(doc => {
                    this.setState({coupleBudget: doc.data().budget})
                })
                docRef.collection('Couple Expense').doc('Expenses').onSnapshot(doc => {
                    this.setState({coupleExpense: doc.data().expenses})
                })
                docRef.collection('Couple Expense').doc('Items').onSnapshot(doc => {
                    this.setState({coupleItem: doc.data().items})
                })
                docRef.collection('Couple Expense').doc('Cost').onSnapshot(doc => {
                    this.setState({coupleCost: doc.data().cost})
                })
                docRef.collection('Couple Expense').doc('Category').onSnapshot(doc => {
                    this.setState({coupleCat: doc.data().category})
                })
                docRef.collection('Couple Expense').doc('Date').onSnapshot(doc => {
                    this.setState({coupleDate: doc.data().date})
                    this.setState({coupleMonth: doc.data().month})
                    this.setState({coupleDateID: doc.data().id})
                })

                docRef.collection('Current').doc('Budget').onSnapshot(doc => {
                    this.setState({tempBudget: doc.data().budget})
                })
                docRef.collection('Current').doc('Expenses').onSnapshot(doc => {
                    this.setState({tempExpenses: doc.data().expenses})
                })
                docRef.collection('Current').doc('Items').onSnapshot(doc => {
                    this.setState({tempItem: doc.data().items})
                })
                docRef.collection('Current').doc('Cost').onSnapshot(doc => {
                    this.setState({tempCost: doc.data().cost})
                })
                docRef.collection('Current').doc('Category').onSnapshot(doc => {
                    this.setState({tempCat: doc.data().category})
                })
                docRef.collection('Current').doc('Date').onSnapshot(doc => {
                    this.setState({date: doc.data().date})
                    this.setState({month: doc.data().month})
                    this.setState({dateID: doc.data().id})
                })
                docRef.onSnapshot(doc => {
                    this.setState({
                        coupleName: doc.data().coupleName,
                        coupleuid: doc.data().coupleuid,
                        coupleNoti: doc.data().coupleNoti,
                        name: doc.data().name,
                        email: doc.data().email,
                        friendNoti: doc.data().friendNoti,
                        friendExpense: doc.data().friendExpense
                    })
                    let imageRef = firebaseDb.storage().ref(this.state.name + "/").child("personal-image")
                    imageRef
                      .getDownloadURL()
                      .then((url) => {
                        //from url you can fetched the uploaded image easily
                        this.setState({uri: url});
                        budget.updateUri(url)
                      })
                      .catch((e) => console.log('getting downloadURL of image error => ', e));
                    trackCouple.updateUser(doc.data().coupleName)
                    trackCouple.updateUserDetails(this.state.coupleItem, this.state.coupleCost, this.state.coupleCat,
                        this.state.coupleBudget, this.state.coupleExpense, this.state.coupleDate, this.state.coupleMonth,
                        this.state.coupleDateID, this.state.coupleuid)

                    budget.updateUser(doc.data().name)
                    budget.updateUserDetails(this.state.tempItem, this.state.tempCost, this.state.tempCat,
                        this.state.tempBudget, this.state.tempExpenses, this.state.date, this.state.month, this.state.dateID, this.state.coupleName, this.state.email, this.state.uri)

                    const update = pushNotification.registerForPushNotificationsAsync()
                    pushNotification.componentDidMount()
                    pushNotification._handleNotification();
                    pushNotification.sendPushNotification(this.state.tempBudget, this.state.tempExpenses)

                    this.props.navigation.replace("Root")

                    if (this.state.coupleNoti == true && this.state.count == 0) {
                        this.promptUser(this.state.coupleName, this.state.coupleuid)
                    }

                    if (this.state.friendNoti == true && this.state.count == 0) {
                        this.promptUser2(this.state.friendExpense)
                    }
                })
            })
            .then(() => {
                this.setState({
                    name: '',
                    email: '',
                    password: '',
                    isSignUpSuccessful: true
                })
            })
            .catch(err => alert(err))

    updateSecureTextEntry = () => {
        this.setState(prevState => ({
            secureTextEntry: !prevState.secureTextEntry
        }))
    };

    render() {
        const {email, password} = this.state

        return (
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
                <StatusBar backgroundColor='#009387' barStyle="light-content"/>
                <View style={styles.header}>
                    <Text style={styles.text_header}>Welcome to SmartTrack!</Text>
                </View>
                <Animatable.View
                    animation="fadeInUpBig"
                    style={styles.footer}
                >
                    <Text style={styles.text_footer}>Email</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Email"
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={this.handleUpdateEmail}
                            value={email}
                            keyboardType={'email-address'}
                        />
                    </View>
                    {email == "" ? null : this.validateEmail(email) ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>This is not a valid email!</Text>
                        </Animatable.View>
                    }

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
                            placeholderTextColor="#666666"
                            secureTextEntry={this.state.secureTextEntry }
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={this.handleUpdatePassword}
                            value={password}
                        />
                        <TouchableOpacity
                            onPress={() => {this.updateSecureTextEntry(this.state.secureTextEntry)}}
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
                    {password == "" ? null : this.checkPassword(password) ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Password must be at least 6 characters long.</Text>
                        </Animatable.View>
                    }
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => {
                                if (this.validateEmail(email)) {
                                    if (this.checkPassword(password)) {
                                        this.onLoginPress()
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
                            }}
                        >
                            <LinearGradient
                                colors={['#08d4c4', '#01ab9d']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Log In</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {this.props.navigation.replace("Sign Up")}}
                            style={[styles.signIn, {
                                borderColor: '#009387',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#009387'
                            }]}>Sign Up</Text>
                        </TouchableOpacity>

                        
                        <TouchableOpacity
                            onPress={() => {this.props.navigation.replace("SplashScreen")}}
                            style={[ {
                                width: 100,
                                borderColor: '#009387',
                                marginTop: 15,
                                position: "absolute",
                                bottom: -150,
                            }]}
                        >
                            <LinearGradient
                                colors={['#08d4c4', '#01ab9d']}
                                style={styles.signIn}
                            >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Back</Text>
                          </LinearGradient>
                        </TouchableOpacity>
                        
                    </View>
                </Animatable.View>
            </KeyboardAvoidingView>
        )
    }
}

export default LoginPageContainer

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
        flex: 3,
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
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
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
    }
});