import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, SafeAreaView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import firebaseDb from '../firebaseDb';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import BlueButton from "../components/BlueButton";



import budget from '../components/TrackBudget';


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerLeft: null,
};
  state = {
    budgett : budget.budget(),
    budgetView : budget.remainder(),
    showingPercentage: false,
    colour: 'red'
  }


  render() {
    const budgetDate = budget.getBudgetDate();
    var date = new Date().getDate();
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;



    return (
      <SafeAreaView style={styles.container}>
         <LinearGradient
          colors={['transparent', 'rgba(0,100,200,0.8)']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 800,
          }}
        />
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style = {styles.text2}>
        
        <Text style={styles.dateText}>Welcome back {budget.getUser()}</Text>

        <Text style={styles.dateText2}>{date + " " + monthInWords(month) + " " + year}</Text>
        
        </View>
          <View style={styles.welcomeContainer}>
            <Image style = {styles.welcomeImage}
              source={
                require('../assets/images/Logo.png')
              }
            />
          </View>
              
          <View style={styles.getStartedContainer}>
            {/* Add Budget Component from budget plan */}
            <Text style={styles.headerText}>Current Budget for the Month: </Text>
            <View>
              <Text style = {styles.expenseText}>${budget.budget()}</Text>
            </View>

              {/* Add current expenses from porfolio page */}
            <Text style={styles.headerText}>Current Expenses for the Month: </Text>
            <View style = {styles.text3}>
              <Text style = {styles.expenseText}>${budget.state.expenses}</Text>
            </View>

              {/*  Budget - Expenses */}
            <Text style={styles.headerText}>Current Budget left: </Text>
            <View>
                 <Text style = {[styles.expenseText1, {color: this.state.color}]}        
                 onPress={() => {
                  if (this.state.showingPercentage == false) {
                    this.setState({
                      budgetView: budget.percentage(),
                      showingPercentage: true,
                    })
                  } else {
                    this.setState({
                      budgetView: budget.remainder(),
                      showingPercentage: false,
                    })
                  }
                  if (budget.percentageNum() < 50) {
                    this.setState({
                      color: 'green',
                    })
                  } else if (budget.percentageNum() < 75) {
                    this.setState({
                      color: 'yellow',
                    })
                  } else if (budget.percentageNum() < 90) {
                    this.setState({
                      color: 'orange',
                    })
                  } else if (budget.percentage() == 'NaN% Spent') {
                    this.setState({
                      color: 'black',
                    })
                  } else {
                    this.setState({
                      color: 'red',
                    })
                  }
                }}> {this.state.budgetView} </Text>
            </View>
            <View>
        
            </View>
            <Text style={styles.headerText}>Days Left to end of Monthy Budget: </Text>
            <View>
              <Text style = {styles.expenseText}> {daysLeft(date, month, budgetDate)}</Text>
            </View>

          </View>
        </ScrollView>
      </SafeAreaView>
    );
    }

  }


function monthInWords(month) {
  if (month == 1) {
    return 'January';
  } else if (month == 2) {
    return 'February';
  } else if (month == 3) {
    return 'March'
  } else if (month == 4) {
    return 'April';
  } else if (month == 5) {
    return 'May'
  } else if (month == 6) {
    return 'June';
  } else if (month == 7) {
    return 'July'
  } else if (month == 8) {
    return 'August';
  } else if (month == 9) {
    return 'September'
  } else if (month == 10) {
    return 'October';
  } else if (month == 11) {
    return 'November'
  } else if (month == 12) {
    return 'December';
  }
}

function daysLeft(date, month, budgetDate) {
  if (budgetDate == 0) {
    return "No Budget Date"
  }
  var daysInMonth = 0
  if (month == "1" || month == "3" || month == "5" || month == "7" || month == "8" || month == "10" || month == "12") {
    daysInMonth = 31    
  } else if (month == "4" || month == "6" || month == "9" || month == "11") {
    daysInMonth = 30
  } else {
    daysInMonth = 28 //Feb
  }

  if (date > budgetDate) {
    return daysInMonth - date + budgetDate
  } else {
    return budgetDate - date
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    flex: 1,
  },
  expenseText: {
    marginTop: 20,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,100)',
    fontSize: 40,
    lineHeight: 40,
    textAlign: 'center',
  },
  expenseText1: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 40,
    lineHeight: 40,
    textAlign: 'center',
    marginLeft: 30,
    marginRight: 30,

  },

  welcomeContainer: {
    alignItems: 'center',

  },
  welcomeImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },

  headerText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },

  dateText: {
    marginTop: 0,
    marginLeft: 10,
    fontSize: 20,
    color: 'rgba(96,100,0, 10)',
    textAlign: 'left',
  },

  dateText2: {
    marginTop: 0,
    marginLeft: 10,
    paddingLeft: 0,
    fontSize: 20,
    color: 'rgba(96,100,0, 10)',
    textAlign: "left",
  },

  text2: {
    flexDirection: 'column',
  },

  text3: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0)'
  }

});

export default HomeScreen