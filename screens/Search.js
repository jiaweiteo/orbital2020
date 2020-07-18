import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import BackBtn from '../components/BackBtn';
import { Dropdown } from 'react-native-material-dropdown';
import PropTypes from "prop-types";
import TrackBudget from '../components/TrackBudget'
import budget from '../components/TrackBudget';
import { LinearGradient } from 'expo-linear-gradient';
import firebaseDb from "../firebaseDb";
import trackCouple from '../components/TrackCouple';


class Search extends React.Component {
    static navigationOptions = {
        title: 'Search Users',
    };
    constructor(props) {
        super(props);
        this.state = {
          id: "",
          count: 0,
        };
      }
    
      updateName = id => this.setState({id})
    
    
    
      reset = () => {
        this.setState({
          id: '',
        })
      }
    
      render() {
        const { id } = this.state;
    
        const promptUser = (name, uid) => {
          const title = 'Add ' + name + ' as couple?';
          const message = 'This will send an invitation request to the existing user.';
          const buttons = [
              { text: 'No', onPress: () => this.reset()  },
              { text: 'Yes', onPress: () => {
                let existCouple = false;
                let temp = false;
                if (trackCouple.getUser() != "") {
                  alert("You have " + trackCouple.getUser() + " as a couple already!")
                } else if (name == budget.getUser()) {
                  alert("You cannot add yourself as a couple!")
                  this.reset();
                } else if (this.state.count == 100) {
                  alert("You have already sent an couple invitation to another user. You cannot add another couple with a pending couple.")
                }  else {
                  const existingCouple = firebaseDb.firestore().collection("users").doc(uid)
                  existingCouple.get().then(doc => {
                    if (this.state.count != 100) {
                    if (doc.data().coupleName != "" && doc.data().coupleName != budget.getUser()) {
                      alert(name + " already has a couple!")
                      existCouple = true;
                    } else if (doc.data().coupleName == budget.getUser()) {
                      alert("You are already a couple with " + name + "!");
                    } else {
                      temp = true;
                    }}}).then()
                    existingCouple.get().then( (doc) => {
                    if (temp == true) {
                        const currentUser = firebaseDb.auth().currentUser;
                        existingCouple.set({
                          coupleuid: currentUser.uid,
                          coupleNoti: true,
                          coupleName: budget.getUser(),
                          email: doc.data().email,
                          name: doc.data().name,
                          password: doc.data().password,                        
                        }).then(() => {
                          firebaseDb.firestore().collection('users').doc(currentUser.uid).update({
                            coupleNoti: false,
                          })
                        })
                        this.state.count += 100;
                        alert("Invitation sent!");
                      }
                    }).then()
                      }
                  
                 
                }

            }];
          Alert.alert(title, message, buttons);
        }
    
    
      return (
        <View style = {styles.container}>           
          <LinearGradient
            colors={['rgba(0, 147, 135, 1)', 'transparent',]}
            style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  height: 700,
                }}
          />
        <ScrollView contentContainerStyle={styles.contentContainer}>
          
          {/* Input Text */}
          <TextInput style = {styles.item}
            placeholder = "Search Username"
            onChangeText={this.updateName}
            value={id}
            
          />
    

          <BackBtn 
            onPress = { () => {
                let exist = false;
              if (this.state.id == "" || this.state.id == "-" || this.state.id == " " || this.state.id == ",") {
                alert("Invalid Field!");
              } else {
                var user = firebaseDb.firestore().collection("users")
                user.where("name", "==", id).get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            promptUser(id, doc.id)
                            exist = true;
                        });
                    }).then(() => {if (exist == false) {alert("User does not exist!")}})
                    .catch(function(error) {
                        alert("Error getting documents: " + error);
                    });
                }
                this.reset();
              }}> Search
          </BackBtn>
          
                
        </ScrollView>
        </View>
       
      );
    }
    }
    
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fafafa',
        flexDirection: 'column',
      },
      contentContainer: {
        paddingTop: 15,
      },
      optionIconContainer: {
        marginRight: 12,
      },
      option: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: '#ededed',
      },
      lastOption: {
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      optionText: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginTop: 1,
      },
      item: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 15,
        alignSelf: 'center',
      },
      category: {
        marginBottom: 20,
        alignSelf:'center',
      }
    });
    

export default Search