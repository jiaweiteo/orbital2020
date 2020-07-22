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
import BlueButton from "../components/BlueButton";
import DatePicker from "react-native-datepicker"
import { LinearGradient } from 'expo-linear-gradient';


class NewBudget extends React.Component {
    static navigationOptions = {
        title: 'Create New Budget',
    };
    constructor(props) {
        super(props);
        this.state = {
          money: "",
          date: "",
          category: ""
        };
      }
    
      updateBudget = money => this.setState({money})
    
      updateDate = date => this.setState({date})
    
      updateCategory = category => this.setState({category})
    
      reset = () => {
        this.setState({
          money: '',
          date: '',
        })
      }
    
      render() {
        const { money, date } = this.state;
        const promptUser = () => {
          const title = 'Create new budget?';
          const message = 'Budget will be set for 30 days. This action cannot be reverted.';
          const buttons = [
              { text: 'No', onPress: () => this.reset()  },
              { text: 'Yes', onPress: () => {
                  budget.newBudget(money, date)
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
      
  
          <DatePicker
              style={styles.datePicker}
              date={this.state.date}
              mode="date"
              placeholder="Select Date"
              format="DD-MM-YYYY"
              minDate="01-05-2020"
              maxDate="01-01-2050"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  right: 50,
                },
                dateInput: {
                  borderWidth: 0,
                },
                dateText: {
                  fontSize: 20,
                  fontWeight: 'bold',
                  flex: 2,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                },
                placeholderText: {
                  fontSize: 20,
                  fontWeight: 'bold',
                  flex: 2,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }
              }}
              onDateChange={(date) => {this.setState({date: date})}}
            />            
  
            <View style = {styles.container2}> 
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
                  > Create Budget</BackBtn>
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
      padding: 10,
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
    datePicker: {
      width: "80%",
      paddingTop: 10,
      margin: 20,
      backgroundColor: "rgba(20, 193, 164, 0.5)",
      alignSelf: "center",
      borderRadius: 30,
    },
  });
    

export default NewBudget