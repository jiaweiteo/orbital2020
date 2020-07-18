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
    

          <View style = {styles.container2}> 
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
            </View>
          
                
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
        width: Dimensions.get("screen").width
      },
      category: {
        marginBottom: 20,
        alignSelf:'center',
      },
      button: {
        marginTop: 42,
        width: 150,
        backgroundColor: "#F75E5E",
        borderWidth: 2,
      },
      button2: {
        marginTop: 42,
        width: 150,
        marginLeft: 20,
        backgroundColor: "#5E9EF7",
        borderWidth: 2,
      },
      container2: {
        flexDirection: "row",
        alignSelf: "center",
      }
    });
    

export default EditBudget