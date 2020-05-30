import * as React from 'react';
import { View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import budget from '../components/TrackBudget';


class CurrentPort extends React.Component {
    static navigationOptions = {
        title: 'My Portfolio',
    };

    render() {
      var month = new Date().getMonth() + 1;

        return(
            <View style={styles.container}>
                   <View style = {styles.getStartedContainer}>
                    <Text style = {styles.header}> Total Expenses for the month of {monthInWords(month)}:</Text>
                    <Text style = {styles.header2}> ${budget.state.expenses}</Text>

                  </View>

                  <OptionButton
                    icon="md-book"
                     label="View By Category"
                     onPress={() => {
                     const { navigate } = this.props.navigation
                        navigate('View By Category')
                    }}
                  />

                  <OptionButton
                    icon="md-book"
                     label="Home"
                     onPress={() => {
                      this.props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'Root' }],
                      });
                    }}
                  />


                  <View style =  {styles.welcomeContainer}>
                        <View style = {styles.catContainer1}>
                            <Text style = {styles.header2}> Item </Text>
                         </View>
                         <View style = {styles.catContainer2}>
                            <Text style = {styles.header2}> Cost </Text>
                         </View>
                         <View style = {styles.catContainer3}>
                            <Text style = {styles.header2}> Category </Text>
                         </View>
                  </View>



                <ScrollView style={styles.container} contentContainerStyle={styles.welcomeContainer}>

                  <View style = {styles.viewContainer}>
                    <Text style = {styles.text}> {budget.state.itemH}</Text>
                  </View>
                  <View style = {styles.viewContainer}>
                    <Text style = {styles.text}> {budget.state.costH}</Text>
                  </View>
                   <View style = {styles.viewContainer}>
                    <Text style = {styles.text}> {budget.state.catH}</Text>
                  </View>




                </ScrollView>
                </View>

        )
    }
}


function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={styles.getStartedContainer2}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.header3}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
      },
      welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 0,
        flexDirection: 'row',

      },
      getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
      },

      getStartedContainer2: {
        backgroundColor: 'rgba(50, 200, 1000, 0.3)',
        padding: 10,
        borderRadius: 200,
        alignItems: 'center',
        marginHorizontal: 50,
      },
      viewContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: -1,
        marginBottom: 0,
        borderRightWidth: StyleSheet.hairlineWidth,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
      },

      
      catContainer1: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 0,
        borderTopWidth: 3,
        borderBottomWidth: 3,
        borderRightWidth: StyleSheet.hairlineWidth,

        backgroundColor: 'powderblue'
      },


      catContainer2: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 0,
        borderTopWidth: 3,
        borderBottomWidth: 3,
        backgroundColor: 'skyblue'
      },

      catContainer3: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 0,
        borderTopWidth: 3,
        borderBottomWidth: 3,
        borderRightWidth: StyleSheet.hairlineWidth,

        backgroundColor: 'steelblue'
      },



      header: {
        marginTop: 20,
        fontSize: 15,
        textAlign: 'center',
        color: 'rgba(96,100,109, 1)',
        fontWeight: 'bold',
      },
      header2: {
        marginBottom: 10,
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
      },
      text: {
        fontSize: 20,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
        textAlignVertical: 'top'
      },
})


export default CurrentPort