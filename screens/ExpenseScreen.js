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
import HomeScreen from './HomeScreen';
import { LinearGradient } from 'expo-linear-gradient';
import trackCouple from '../components/TrackCouple'



export default class ExpenseScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      cost: "",
      category: ""
    };
  }

  updateItem = text => this.setState({text})

  updateCost = cost => this.setState({cost})

  updateCategory = category => this.setState({category})

  reset = () => {
    this.setState({
      cost: '',
      text: '',
      category: '',
    })
  }

  render() {
    const { text, cost, category} = this.state;

    let data = [{
      value: 'Grocery',
    }, {
      value: 'Food and Dining',
    }, {
      value: 'Shopping',
    }, {
      value: 'Transport',
    }, {
      value: 'Utilites',
    }, {
      value: 'Insurance',
    }, {
      value: 'Entertainment',
    }, {
      value: 'Personal Care',
    }, {
      value: 'Miscellaneous'
    }, {
      value: 'Others'
    }
  ];
 
  const promptUser = () => {
    if (trackCouple.getUser() == "") {
      alert("Added!");
      budget.updateExpenses(cost.trim())
      budget.updateHistory(text.trim(), cost.trim(), category)
      budget.addPortfolio()
      this.props.navigation.replace('Root');
    } else {
      const title = 'Submit Expense?';
      const message = "Tap on Individual to include expense in own budget." + "\n" + 
      "Tap on Couple to incluse expense in couple budget.";
      const buttons = [
          { text: 'Cancel', onPress: () => {}},
          { text: 'Couple', onPress: () =>  {
            alert("Added to Couple Expense!")
            trackCouple.updateExpenses(cost.trim())
            trackCouple.updateHistory(text.trim(), cost.trim(), category)
            trackCouple.addPortfolio()
            this.props.navigation.replace('Root');
            }
          },
          { text: 'Individual', onPress: () => {
            alert("Added to Individual Expense!");
            budget.updateExpenses(cost.trim())
            budget.updateHistory(text.trim(), cost.trim(), category)
            budget.addPortfolio()
            this.props.navigation.replace('Root');
            }
          }
      ];
      Alert.alert(title, message, buttons);
    }
    
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

      <View style = {styles.header1}>
        <Text style = {styles.header}> Add new expense </Text>
      </View>
      <View style = {styles.content}>
      {/* Input Text */}
      <TextInput style = {styles.item}
        placeholder = "Item"
        onChangeText={this.updateItem}
        value={text}
      />
      </View>

        {/* Slide down choices */}
      <Dropdown style = {styles.category}
        itemCount = {5}
        label="Category"
        data = {data}
        onChangeText = {this.updateCategory}
        value = {category}
      />

      <View style = {styles.content}>
        {/* Numbers only */}
      <TextInput style = {styles.item}
        placeholder = "Cost"
        onChangeText = {this.updateCost}
        value = {cost}
        keyboardType = {'numeric'}
        />
        </View>

      <BackBtn 
        onPress = { () =>  {
            if (this.state.text.trim() == "" || this.state.category == "" || this.state.cost.trim() == "") {
              alert("Cannot have empty fields!")
              this.reset();
            } else if (isNaN(this.state.cost) ) {
              alert("Invalid Expense! Expense must be a number");
              this.setState({cost: ""});
            } else {
              this.reset(); 
              promptUser();
            }
          }}> Submit </BackBtn>
      
            
    </ScrollView>
    </View>
  );
}
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
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
    alignContent: 'stretch',
    textAlign: "center",
    width: Dimensions.get("screen").width
  },
  category: {
    marginBottom: 20,
    alignSelf:'center',
  },
  content: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  header: {
      fontSize: 30,
      color: 'black',
      textAlign: 'center',
      fontWeight: 'bold',
  },
  header1: {
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    backgroundColor: 'rgba(50, 125, 255, 0.5)'
  }
});
