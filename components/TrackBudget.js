import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import BackBtn from '../components/BackBtn';
import { Dropdown } from 'react-native-material-dropdown';
import ExpenseScreen from '../screens/ExpenseScreen';
import firebase from "firebase";


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
        this.addPortfolio = this.addPortfolio.bind(this),
        this.state.budget = 0;

      }
      addPortfolio() {
        var user = firebase.auth().currentUser;
        var checkMonth = firebase.firestore().collection("users").doc(user.uid)

        checkMonth.collection('June').doc('Expenses').set({
            expenses: this.state.expenses,
        }).then();
        checkMonth.collection('June').doc('Items').set({
            items: firebase.firestore.FieldValue.arrayUnion.apply(null, this.state.itemH),
        }).then();
        checkMonth.collection('June').doc('Cost').set({
            cost: firebase.firestore.FieldValue.arrayUnion.apply(null, this.state.costH),
        }).then();
        checkMonth.collection('June').doc('Category').set({
            category: firebase.firestore.FieldValue.arrayUnion.apply(null, this.state.catH),
        }).then();
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

        var user = firebase.auth().currentUser;
        var checkMonth = firebase.firestore().collection("users").doc(user.uid)

        checkMonth.collection('June').doc('Budget').set({
            budget: this.state.budget,
        }).then();
      }
  
      updateHistory(item, cost, category) {
        this.state.itemH.push(item + "\n");
        this.state.costH.push(cost + "\n");
        this.state.catH.push(category + "\n");
        this.state.history.push([String(item), Number(cost), String(category)])
      }

      getBudgetDate() {
        return this.state.date
      }

      budget() {
          return this.state.budget
      }

      percentage() {
        const p = (100 * (this.state.expenses)/ (this.state.budget))
        const pString = String(p) + "% Spent"
        return pString
      }

      percentageNum() {
        return (100 * (this.state.expenses)/ (this.state.budget))
      }

      color() {
        return this.state.color
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
            var leftover = 'Exceeded by $ ' + String(-1 * (this.state.budget - this.state.expenses));

            var user = firebase.auth().currentUser;
            firebase.firestore().collection("users").doc(user.uid).collection('June').doc('LeftOver').set({
                leftover: leftover,
            }).then();
            return leftover;

        } else {
            var leftover = '$' + String(this.state.budget - this.state.expenses);

            var user = firebase.auth().currentUser;
            firebase.firestore().collection("users").doc(user.uid).collection('June').doc('LeftOver').set({
                leftover: leftover,
            }).then();
            return leftover;
        }
    }
      deleteItem(key) {
        const id = Number(key)
        const newHistory = []
        const newItemH = []
        const newCostH = []
        const newCatH = []
        const store = []
        for (let i = 0; i < this.state.history.length; i++) {
          if (i == id) {
            this.state.expenses -= this.state.costH[i]
          }
          if (i != id) {
            newHistory.push(this.state.history[i])
            newItemH.push(this.state.itemH[i])
            newCostH.push(this.state.costH[i])
            newCatH.push(this.state.catH[i])
          }
        }
        store.push(newHistory)
        store.push(newItemH)
        store.push(newCostH)
        store.push(newCatH)
        this.state.history = newHistory
        this.state.itemH = newItemH
        this.state.costH = newCostH
        this.state.catH = newCatH
        return store
      }





    }

const budget = new TrackBudget()
export default budget

