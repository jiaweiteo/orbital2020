import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import budget from '../components/TrackBudget';


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
};


  render() {
    const budgetDate = budget.getBudgetDate();
    var date = new Date().getDate();
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        
        <Text style={styles.dateText}>{date + " " + monthInWords(month) + " " + year}</Text>

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
            <View>
              <Text style = {styles.expenseText}>${budget.state.expenses}</Text>
            </View>

              {/*  Budget - Expenses */}
            <Text style={styles.headerText}>Current Budget left: </Text>
            <View>
              <Text style = {styles.expenseText}>{budget.remainder()}</Text>
            </View>

            <Text style={styles.headerText}>Days Left to end of Monthy Budget: </Text>
            <View>
              <Text style = {styles.expenseText}> {daysLeft(date, month, budgetDate)}</Text>
            </View>

          </View>
        </ScrollView>
      </View>
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
  if (budgetDate === 0) {
    return "No Budget Plan Yet"
  }
  var daysInMonth = 0
  if (month === "1" || month === "3" || month === "5" || month === "7" || month === "8" || month === "10" || month === "12") {
    daysInMonth = 31    
  } else if (month === "4" || month === "6" || month === "9" || month == "11") {
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
    flex: 1,
    backgroundColor: '#fff',
  },
  expenseText: {
    marginTop: 20,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,100)',
    fontSize: 40,
    lineHeight: 40,
    textAlign: 'center',
  },

  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
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
    marginTop: 10,
    marginLeft: 16,
    fontSize: 20,
    color: 'rgba(96,100,0, 10)',
    textAlign: 'left',
  },

});

export default HomeScreen