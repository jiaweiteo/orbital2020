import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import BackBtn from '../components/BackBtn';
import { Dropdown } from 'react-native-material-dropdown';
import PropTypes from "prop-types";
import TrackBudget from '../components/TrackBudget'
import budget from '../components/TrackBudget';
import HomeScreen from './HomeScreen';



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
      value: 'Food',
    }, {
      value: 'Drinks',
    }, {
      value: 'Rent',
    }, {
      value: 'Transport',
    }, {
      value: 'Utilites',
    }, {
      value: 'Insurance',
    }, {
      value: 'Entertainment',
    }, {
      value: 'Others',
    }
  ];


  return (
    
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      
      {/* Input Text */}
      <TextInput style = {styles.item}
        placeholder = "Item"
        onChangeText={this.updateItem}
        value={text}
        ref={input => { this.textInput = input }}
      />

        {/* Slide down choices */}
      <Dropdown style = {styles.category}
        itemCount = {5}
        label="Category"
        data = {data}
        onChangeText = {this.updateCategory}
        value = {category}
      />

        {/* Numbers only */}
      <TextInput style = {styles.item}
        placeholder = "Cost (input numbers only!)"
        onChangeText = {this.updateCost}
        value = {cost}
        ref={input => { this.textInput = input }}
        />

      <BackBtn 
        onPress = { () =>  {this.reset(); alert("Submitted"); 
        budget.updateExpenses(cost)}}></BackBtn>
            
            
    </ScrollView>

   
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
