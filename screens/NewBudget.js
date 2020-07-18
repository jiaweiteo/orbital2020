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
            placeholder = "Budget Amount"
            onChangeText={this.updateBudget}
            value={money}
            keyboardType = {'numeric'}
          />
    

        <DatePicker
            style={{width: Dimensions.get("window").width - 1}}
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
                left: 5,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 45
              }
            }}
            onDateChange={(date) => {this.setState({date: date})}}
          />            

    
          <BackBtn 
            onPress = { () => {
              if (this.state.money == "" || this.state.date == "") {
                alert("Cannot have empty fields!");
              } else{ promptUser(money, date)}}}
            >Create budget</BackBtn>
          
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
        textAlign: "center",
        width: Dimensions.get("screen").width,
      },
      category: {
        marginBottom: 20,
        alignSelf:'center',
      },
      button: {
        marginTop: 42,
    },
    });
    

export default NewBudget