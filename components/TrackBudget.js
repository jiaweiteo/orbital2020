import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import BackBtn from '../components/BackBtn';
import { Dropdown } from 'react-native-material-dropdown';
import firebase from "firebase";
import { useLinkBuilder } from '@react-navigation/native';


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
          month: "",
          dateID: "",
          coupleName: "",
          email: "",
          uri: "",
        };
        this.addPortfolio = this.addPortfolio.bind(this)
      }

      addPortfolio() {
        const id = this.state.dateID
        var user = firebase.auth().currentUser;
        var checkMonth = firebase.firestore().collection("users").doc(user.uid)

        checkMonth.collection("Current").doc('Expenses').set({
            expenses: this.state.expenses,
        }).then();
        checkMonth.collection("Current").doc('Items').set({
            items: this.state.itemH
        }).then();
        checkMonth.collection("Current").doc('Cost').set({
            cost: this.state.costH
        }).then();
        checkMonth.collection("Current").doc('Category').set({
            category: this.state.catH
        }).then();
    }


    updateUri(link) {
      this.state.uri = link
    }

      updateUser(name) {
        this.state.user = name;
      }

      updateUserDetails(items, cost, category, budget, expenses, date, month, id, coupleN, email, uri) {
   
        this.state.budget = budget;
        this.state.expenses = expenses
        this.state.itemH = items
        this.state.costH = cost
        this.state.catH = category
        this.state.date = date
        this.state.month = month
        this.state.dateID = id
        this.state.coupleName = coupleN
        this.state.email = email
        this.state.uri = uri
        const tempHistory = []
        for (let i = 0; i < items.length; i++) {
          const itemx = items[i].substring(0, items[i].indexOf("\n"))
          const costx = cost[i].substring(0, cost[i].indexOf("\n"))
          const catx = category[i].substring(0, category[i].indexOf("\n"))

          let hList = [itemx, costx, catx]
          tempHistory.push(hList)
        }
        this.state.history = tempHistory

        try {
          this.state.itemH.push(1)
          this.state.itemH.pop()
      } catch {
        this.state.itemH = []
        this.state.costH = []
        this.state.catH = []
        this.state.expenses = 0
      }
      }
      
      getUser() {
        return this.state.user;
      }
      

      updateExpenses(c) {
        this.state.expenses += Number(c)
      }

      updateCurrentBudget(money) {
        this.state.budget = 0
        this.state.budget += Number(money)
        const user = firebase.auth().currentUser
        const docRef = firebase.firestore().collection("users").doc(user.uid)

        docRef.collection("Current").doc("Budget").set({
          budget: this.state.budget,
        }).then();
      }

      newBudget(money, datee) {

        const user = firebase.auth().currentUser
        const docRef = firebase.firestore().collection("users").doc(user.uid)
        var months = [ "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December" ];

        this.state.date = 0
        const numdd = Number(datee.substring(0,2))
        const monthNumber = Number(datee.substring(3,5))

        this.state.budget = 0
        this.state.budget += Number(money)

        docRef.collection("Current").doc('Budget').set({
            budget: this.state.budget,
        }).then();

        this.state.month = months[monthNumber - 1]
        this.state.date += numdd
        this.state.dateID = datee

        docRef.collection("Current").doc('Date').set({
          date: this.state.date,
          month: this.state.month,
          id: datee
        }).then();
      }

      updateBudget(money, datee) {
        const user = firebase.auth().currentUser;
        const docRef = firebase.firestore().collection("users").doc(user.uid)
        const past = docRef.collection("Past Budget").doc("IDs")
        const id = this.state.dateID
        let tempArr = []
        let count = 0;
        past.onSnapshot( doc => {
          tempArr = doc.data().temp
          tempArr.push(id)
          if (count == 0) {
            past.set({
              temp: tempArr
            }).then()
            count++
          }
        })

        past.collection(id).doc('Budget').set({
          budget: this.state.budget,
        }).then();
        past.collection(id).doc('Expenses').set({
          expenses: this.state.expenses,
        }).then();
        past.collection(id).doc('LeftOver').set({
            leftover: this.state.budget - this.state.expenses
        }).then();
        past.collection(id).doc('Items').set({
            items: this.state.itemH
        }).then();
        past.collection(id).doc('Cost').set({
            cost: this.state.costH
        }).then();
        past.collection(id).doc('Category').set({
            category: this.state.catH
        })
        past.collection(id).doc('Date').set({
          date: this.state.date,
          month: this.state.month,
          id: id
        }).then();

        var months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];
        const numdd = Number(datee.substring(0,2))
        const monthNumber = Number(datee.substring(3,5))
        this.updateUserDetails([], [], [], Number(money), 0, numdd, months[monthNumber - 1], datee, this.state.coupleName)
        this.addPortfolio()
        docRef.collection("Current").doc('Budget').set({
          budget: this.state.budget
        }).then()
        docRef.collection("Current").doc('Date').set({
          date: this.state.date,
          month: this.state.month,
          id: this.state.dateID
        }).then()
        docRef.collection("Current").doc('LeftOver').set({
          leftover: this.state.budget
        }).then()
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
      
      getBudgetMonth() {
        return this.state.month
      }

      budget() {
          return this.state.budget
      }

      percentage() {
        const p = Math.floor((100 * (this.state.expenses)/ (this.state.budget)))
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
            firebase.firestore().collection("users").doc(user.uid).collection("Current").doc('LeftOver').set({
                leftover: leftover,
            }).then();
            return leftover;

        } else {
            var leftover = '$' + String(this.state.budget - this.state.expenses);

            var user = firebase.auth().currentUser;
            firebase.firestore().collection("users").doc(user.uid).collection("Current").doc('LeftOver').set({
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
        this.addPortfolio()
        return store
      }





    }

const budget = new TrackBudget()
export default budget

