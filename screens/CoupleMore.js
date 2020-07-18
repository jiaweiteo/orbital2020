import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import firebaseDb from '../firebaseDb';
import PastPort from './PastPort';
import budget from '../components/TrackBudget';
import trackCouple from '../components/TrackCouple';

 

export default class CoupleMore extends React.Component {
   static navigationOptions = {
    title: 'More',
  };

  promptUser()  {
    const title = "Delete your existing couple?"
    const message = "This will remove your current couple, your couple budget plan and your past couple budget plans."
    const buttons = [
        { text: 'No', onPress: () => {} },
        { text: "Yes", onPress: () => {
            const couple = firebaseDb.firestore().collection("users").doc(trackCouple.state.coupleUID)
            couple.collection('Couple Past Budget').doc('IDs').set({
                temp: [],
            })
            couple.collection('Couple Expense').doc('Budget').set({
                budget: 0,
            }).then();
            couple.collection('Couple Expense').doc('Expenses').set({
                expenses: 0,
            }).then();
            couple.collection('Couple Expense').doc('LeftOver').set({
                leftover: 0
            }).then();
            couple.collection('Couple Expense').doc('Items').set({
                items: [],
            }).then();
            couple.collection('Couple Expense').doc('Cost').set({
                cost: [],
            }).then();
            couple.collection('Couple Expense').doc('Date').set({
                date: "",
                id: "",
                month: "",
            }).then();
            couple.collection('Couple Expense').doc('Category').set({
                category: [],
            })
            couple.update({
                coupleName: "",
                coupleuid: "",
            })

            const user1 = firebaseDb.auth().currentUser;
            const user = firebaseDb.firestore().collection("users").doc(user1.uid)
            user.collection('Couple Past Budget').doc('IDs').set({
                temp: [],
            })
            user.collection('Couple Expense').doc('Budget').set({
                budget: 0,
            }).then();
            user.collection('Couple Expense').doc('Expenses').set({
                expenses: 0,
            }).then();
            user.collection('Couple Expense').doc('LeftOver').set({
                leftover: 0
            }).then();
            user.collection('Couple Expense').doc('Items').set({
                items: [],
            }).then();
            user.collection('Couple Expense').doc('Cost').set({
                cost: [],
            }).then();
            user.collection('Couple Expense').doc('Date').set({
                date: "",
                id: "",
                month: "",
            }).then();
            user.collection('Couple Expense').doc('Category').set({
                category: [],
            }).then(() => {
                trackCouple.updateUser("")
                trackCouple.updateUserDetails([], [], [], 0, 0, "", "", "", "")
            })
            user.update({
                coupleName: "",
                coupleuid: "",
            })
        alert("Deleted Couple! ")
        }}
     ]
    return Alert.alert(title, message, buttons);
  }

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <OptionButton
          icon="md-photos"
          label="Upload Background Photo"
          onPress={() => {this.uploadPhoto}}
        />

        <OptionButton
          icon="md-close"
          label="Delete Couple"
          onPress={() => {this.promptUser()}}/>
      </ScrollView>
      );
  }
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={styles.option2}>
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
  },
  contentContainer: {
    paddingTop: 0,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  option2: {
      flexDirection: "row",
      width: Dimensions.get("screen").width,
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
