import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import firebaseDb from '../firebaseDb';
import PastPort from './PastPort';
import budget from '../components/TrackBudget';

 

export default class Portfolio extends React.Component {
   static navigationOptions = {
    title: 'Portfolio',
  };

  onSignOut = () => firebaseDb.auth().signOut().then(() => { 
    alert("Sign Out Successfully!")
    this.props.navigation.replace("Login")
  }).catch(err => console.log(err))

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <OptionButton
          icon="md-pie"
          label="View Current Portfolio"
          onPress={() => {
            const { navigate } = this.props.navigation
            navigate('Overview')
          }}
          />

        <OptionButton
          icon="md-book"
          label="View Past Porfolio"
          onPress={() => {
            const { navigate } = this.props.navigation
            navigate('Past Portfolio')
          }}
        />
        
        <OptionButton
          icon="md-cash"
          label= "Create Budget"
          onPress={() => {
            const { navigate } = this.props.navigation
            navigate('Create Budget')
          }}
        />

        <OptionButton
          icon="md-cash"
          label= "Edit Current Budget"
          onPress={() => {
            const { navigate } = this.props.navigation
            navigate('Edit Current Budget')
          }}
        />
        
        <OptionButton
          icon="ios-contacts"
          label= "Split Expenses with Friends"
          onPress={() => {
            const { navigate } = this.props.navigation
            navigate('Split Expense')
          }}
        />

          <OptionButton
          icon="md-compass"
          label= "Log out"
          onPress={() => {
            this.onSignOut()
          }}
          isLastOption = "true"
        /> 
        
      </ScrollView>
      );
  }
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingTop: 30,

  },
  contentContainer: {
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  lastOption: {
    marginTop: Dimensions.get("window").width - 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'lightblue',
    marginBottom: 20,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
