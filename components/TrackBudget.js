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
          user: "",
          budget: 0,
          expenses: 0,
          itemH : [],
          costH : [],
          catH : [],
          history: [],
          date: 0,
        };
      }

      updateUser(name) {
        this.state.user = name;
      }

      getUser() {
        return this.state.user;
      }
      
      updateDate(dd) {
        this.state.date = 0
        const numdd = Number(dd.substring(0,2))
        this.state.date += numdd
      }

      updateExpenses(c) {
        this.state.expenses += Number(c)
      }

      updateBudget(money) {
        this.state.budget = 0
        this.state.budget += Number(money)
      }
  
      updateHistory(item, cost, category) {
        this.state.itemH.push(item + "\n");
        this.state.costH.push(cost + "\n");
        this.state.catH.push(category + "\n");
        this.state.history.push([String(item), String(cost), String(category)])
      }

      getBudgetDate() {
        return this.state.date
      }

      budget() {
          return this.state.budget
      }

      expenses() {
        if (this.state.costH === null) {
          return 0
        } else {
          let c = 0
          for (let x = 0; x < this.state.costH.lenght; x++) {
            c += this.state.costH[x]
          }
          this.state.expenses = c
          return c
        }
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