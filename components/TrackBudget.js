import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import BackBtn from '../components/BackBtn';
import { Dropdown } from 'react-native-material-dropdown';
import ExpenseScreen from '../screens/ExpenseScreen';


class TrackBudget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          budget: 1000,
          expenses: 500,
          cat: []
        };
      }


      updateExpenses(c) {
        this.setState({
            expenses: Number(c) + Number(this.state.expenses)}
        );
        this.state.expenses += Number(c)
      }

      budget() {
          () => this.setState({
              budget: 10000
          })
          return this.state.budget
      }

      expenses() {
          return this.state.expenses
      }

      remainder() {
          if (this.state.budget - this.state.expenses < 0) {
              return 'Exceeded by $ ' + String(-1 * (this.state.budget - this.state.expenses));
          } else {
            return '$' + String(this.state.budget - this.state.expenses)
          }
      }


    }

const budget = new TrackBudget()

export default budget