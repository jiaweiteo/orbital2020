import * as React from 'react';
import { Image, View, Text, StyleSheet, FlatList, TextInput, Alert, useWindowDimensions} from 'react-native';
import { RectButton, ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import _ from "lodash"
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';

import budget from '../components/TrackBudget';
import firebase from "firebase";

class PastPort extends React.Component {
    static navigationOptions = {
        title: 'Past Portfolio',
    };
    constructor(props) {
        super(props);
        this.count = 0;
        this.state = {
            pastBudgets: [],
            pastExpenses: [],
            arrayID: [],
            storeArr: [],
        }
      }


    updateID() {
        const user = firebase.auth().currentUser
        const docRef = firebase.firestore().collection("users").doc(user.uid)
        const past = docRef.collection("Past Budget").doc("IDs")
        past.onSnapshot( doc => {
            this.setState({ arrayID: doc.data().temp})
            for (let i = 0; i < this.state.arrayID.length; i++) {
                const id = this.state.arrayID[i];
                let tempArr = this.state.pastBudgets
                let tempArr2 = this.state.pastExpenses
                let tempArr3 = this.state.storeArr
                past.collection(id).doc("Budget").onSnapshot(d => {
                    tempArr.push(d.data().budget)
                    this.setState({ pastBudgets: tempArr})
                })
                past.collection(id).doc("Expenses").onSnapshot(d => {
                    tempArr2.push(d.data().expenses)
                    this.setState({ pastExpenses: tempArr2})
                    tempArr3.push({
                      id: this.state.arrayID[i],
                      expenses: d.data().expenses
                    })
                    this.setState({ storeArr: tempArr3})
                })
              }
            }
        )

    }

    promptUser(key)  {
      const id = Number(key)
      const expenseID = Number(this.state.pastExpenses[id])
      const budgetID = Number(this.state.pastBudgets[id])
      const dateID = this.state.arrayID[id]
      const percent = Math.floor((expenseID/ budgetID) * 100)
  
      const title = "Budget Date: " + dateID + "\n";
      const budget = "Budget Allocated: $" + budgetID + "\n";
      const spent = "Total Spent: $" + expenseID + "\n";
      const percentage = "Percentage: " + percent + "%";
      const message = budget + spent + percentage;
      const buttons = [
          { text: 'Ok', onPress: () => {} } ]
      return Alert.alert(title, message, buttons);
    }

    FlatListItemSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#607D8B",
          }}
        />
      );
    }
      componentDidMount() {
         this.updateID()

      }
     

    render() {
        
        const chartConfig = {
            backgroundGradientFrom: "#91D0FF",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#B5B5B5",
            backgroundGradientToOpacity: 0,
            color: (opacity = 1) => `rgba(11, 37, 172, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 1,
            useShadowColorFromDataset: false // optional
          };

        const data = {
            labels: this.state.arrayID,
            datasets: [
              {
                data: this.state.pastExpenses
              }
            ]
          };

        return (
            <View style = {styles.MainContainer}>       
              <LinearGradient
                colors={['rgba(0, 147, 135, 1)', 'transparent',]}
                style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      height: 700,
                    }}
              />
            <Text style = {styles.header}>Your past expenses analysis</Text>
            <ScrollView horizontal = {true} contentContainerStyle = {styles.box2}>
            <BarChart styles = {styles.box2}
                data={data}
                width={Dimensions.get('window').width + 50}
                height={Dimensions.get('window').height/2 + 25}
                yAxisLabel="$"
                chartConfig={chartConfig}
                verticalLabelRotation={90}
                fromZero
                />
              </ScrollView>
              <Animatable.View
                style={styles.footer}
                animation="fadeInUpBig"
                >
                <LinearGradient
                    colors={['rgba(0, 147, 135, 1)', 'transparent',]}
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      borderTopLeftRadius: 30,
                      borderTopRightRadius: 30,
                      height: 250,
                    }}
                  />
                <FlatList style = {styles.list}
                scrollEnabled = {true}
                  data={this.state.storeArr}
                  width='100%'
                  extraData={this.state.storeArr}
                  keyExtractor={(item, index) => String(item.key)}
                  ItemSeparatorComponent={this.FlatListItemSeparator}
                  renderItem={({item, index}) => (
                        <TouchableOpacity 
                        underlayColor = 'rgba(255, 0, 0, 0.5)' 
                        onPress = {() => this.promptUser(index)}>
                        <View style = {styles.box}>
                        <Text style = {{marginLeft: 5,}}> Budget Date: </Text>
                        <Text style = {styles.item1}>{item.id} </Text> 
                        <Text style = {styles.cost}> ${item.expenses} spent </Text>  
                        
                        </View>
                        </TouchableOpacity>
                  )
                  }
                  numColumns={1}
                  />
                  </Animatable.View>
                  <View style = {styles.buttons}>
                      <OptionButton
                          icon="md-home"
                          label="Home"
                          onPress={() => {
                          this.props.navigation.reset({
                              index: 0,
                              routes: [{ name: 'Root' }],
                          });
                          }}
                      />
                    </View>
                </View>
        );
    }
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton onPress={onPress}>
      <View style={styles.getStartedContainer2}>
        <View>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={{fontWeight: 'bold'}}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
 
    MainContainer: {
      justifyContent: "flex-start",
      alignItems: "flex-start",
      flex: 1,
    },

    footer: {
      backgroundColor: 'transparent',
      flex: 1,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 10,
      width: "100%",
    },
  
    buttons: {
      height: 50,
      alignSelf: "center",
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute', //Here is the trick
      bottom: 0, //Here is the trick
      marginBottom: 10,
    },
    getStartedContainer2: {
      backgroundColor: 'rgba(20, 180, 150, 0.7)',
      padding: 10,
      borderRadius: 100,
      width: 100,
      alignItems: 'center',
      marginHorizontal: 10,
      alignSelf: "center"
    },
    box: {
      backgroundColor: "rgba(216, 216, 216, 0.2)",
      borderRadius: 20,
    },
    box2: {
      marginBottom: -250,
    },
    item1: {
      fontSize: 18,
      marginLeft: 10,
      height: 35,
      fontWeight: 'bold',
    },
    header: {
      alignSelf: "center",
    },
    cost: {
      fontSize: 18,
      height: 30,
      height: 35,
      alignSelf: "flex-end",
      marginRight: 10,
      marginTop: -30,
      color: 'rgb(32, 128, 8)',
  },
  list: {
    flex: 1,
  }
  
})

const PassPort = new PastPort()
export default PastPort