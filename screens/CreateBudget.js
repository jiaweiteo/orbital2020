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

class CreateBudget extends React.Component {
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
          category: '',
        })
      }
    
      render() {
        const { money, date, category } = this.state;
    
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
            placeholder = "Budget Amount"
            onChangeText={this.updateBudget}
            value={money}
          />
    

    
            {/* Numbers only */}
          <TextInput style = {styles.item}
            placeholder = "Date of Budget: (DD-MM-YY)"
            onChangeText = {this.updateDate}
            value = {date}
            />
    
          <BackBtn 
            onPress = { () =>  {this.reset(); alert("Submitted");
            budget.updateBudget(money)
            budget.updateDate(date)
              }}></BackBtn>
          
                
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
    

export default CreateBudget