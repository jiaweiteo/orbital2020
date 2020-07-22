import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Dimensions } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import BackBtn from '../components/BackBtn';
import { Dropdown } from 'react-native-material-dropdown';
import PropTypes from "prop-types";
import TrackBudget from '../components/TrackBudget'
import budget from '../components/TrackBudget';
import trackCouple from '../components/TrackCouple';

import { LinearGradient } from 'expo-linear-gradient';

class EditBudget extends React.Component {
    static navigationOptions = {
        title: 'Edit Current Budget',
    };
    constructor(props) {
        super(props);
        this.state = {
          money: "",
        };
      }
    
      updateBudget = money => this.setState({money})

      reset = () => {
        this.setState({
          money: '',
        })
      }
    
      render() {
        const { money } = this.state;
    
        const promptUser = () => {
          const title = 'Edit current budget?';
          const message = 'This action cannot be reverted!';
          const buttons = [
              { text: 'No', onPress: () => this.reset()  },
              { text: 'Yes', onPress: () => {
                  budget.updateCurrentBudget(money)
                  this.props.navigation.replace("Root")}
                 }
          ];
          Alert.alert(title, message, buttons);
        }

        const promptCouple = () => {
          const title = 'Edit current couple budget?';
          const message = 'This action cannot be reverted!';
          const buttons = [
              { text: 'No', onPress: () => this.reset()  },
              { text: 'Yes', onPress: () => {
                  trackCouple.updateCurrentBudget(money)
                  this.props.navigation.replace("Root")}
                 }
          ];
          Alert.alert(title, message, buttons);
        }
    
    
      return (
        <View style = {styles.container}>           
          <LinearGradient
            colors={['rgba(20, 193, 164, 0.2)', 'rgba(0, 147, 135, 1)']}
            style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  height: 800,
                }}
          />
        <ScrollView contentContainerStyle={styles.contentContainer}>
          
          {/* Input Text */}
          <TextInput style = {styles.item}
            placeholder = "Budget Amount"
            placeholderTextColor = "white"
            onChangeText={this.updateBudget}
            value={money}
            keyboardType = {'numeric'}
          />
    

          <View style = {styles.container2}> 
          <LinearGradient
            colors={['rgba(209, 9, 9, 1)', 'rgba(211, 213, 217, 1)']}
            style={styles.signIn}>
              <BackBtn style = {styles.button}
                onPress = { () => {
                  if (trackCouple.getUser() == "") {
                    alert("You do not have a couple to start a shared budget plan!")
                  } else {
                  if (this.state.money.trim() == "") {
                    alert("Cannot have empty fields!");
                    this.reset();
                  } else if (isNaN(this.state.money)) {
                    alert("Budget is not a Number!");
                    this.reset();
                  } else{ promptCouple()}}}
                }
                >Couple Budget</BackBtn>
            </LinearGradient>
            
          <LinearGradient
            colors={['rgba(1, 86, 196, 1)', 'rgba(211, 213, 217, 1)']}
            style={styles.signIn}>
              <BackBtn style = {styles.button2}
                onPress = { () => {
                  if (this.state.money.trim() == "") {
                    alert("Cannot have empty fields!");
                    this.reset();
                  } else if (isNaN(this.state.money)) {
                    alert("Budget is not a Number!");
                    this.reset();
                  }else{ promptUser()}}}
                > Individual Budget</BackBtn>
            </LinearGradient>
          </View>
          
                
        </ScrollView>
        </View>
       
      );
    }
    }
    
    
const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'column',
      },
      contentContainer: {
        paddingTop: 15,
      },
      item: {
        fontSize: 20,
        fontWeight: 'bold',
        flex: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        backgroundColor: "rgba(20, 193, 164, 0.5)",
        alignSelf: 'center',
        alignContent: 'stretch',
        textAlign: "center",
        padding: 20,
        width: "80%",
        borderRadius: 30,
      },
      button: {
        width: 150,
        backgroundColor: "transparent",
      },
      button2: {
        width: 150,
        backgroundColor: "transparent",
      },
      container2: {
        flexDirection: "row",
        alignSelf: "center",
      },
      signIn: {
        width: 150,
        height: 100,
        marginTop: 30,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        flexDirection: 'row'
    },
});
    

export default EditBudget