import * as React from 'react';
import { View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import { RectButton, ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import _ from "lodash"


import budget from '../components/TrackBudget';


class CurrentPort extends React.Component {
    static navigationOptions = {
        title: 'My Portfolio',
    };

    state = {
      list: budget.state.history,
      original: budget.state.history,
      bool: true,
      itemLs: budget.state.itemH,
      itemTemp: "",
      costLs: budget.state.costH,
      costTemp: "",
      catLs: budget.state.catH,
      catTemp: "",
      userSelection: "",
    }

    render() {
      
        const promptUser = () => {
          const title = 'Delete Item?';
          const message = 'This action cannot be reverted!';
          const buttons = [
              { text: 'No', onPress: () => this.setState({userSelection: 'delete'}) },
              { text: 'Yes', onPress: () => this.setState({userSelection: 'noDelete'}) }
          ];
          Alert.alert(title, message, buttons);
        }
        var month = new Date().getMonth() + 1;

        return(
            <View style={styles.container}>
          <LinearGradient
            colors={['transparent', 'rgba(0, 147, 135, 1)']}
            style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  height: 1000,
                }}
          />

              <View style = {styles.getStartedContainer}>
                <Text style = {styles.header}> Total Expenses for the month of {monthInWords(month)}:</Text>
                <Text style = {styles.header3}> ${budget.state.expenses}</Text>
              </View>
              <Animatable.View
                          style={styles.footer}
                          animation="fadeInUpBig"
                      >
              <LinearGradient
                    colors={['rgba(0, 147, 135, 0.65)', 'rgba(216, 247, 237, 0.65)',]}
                    style={{
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          top: 0,
                          borderTopRightRadius: 30,
                          borderTopLeftRadius: 30,
                          borderBottomLeftRadius: 30,
                          borderBottomRightRadius: 30,
                          height: 650,
                        }}
                  />

                  <View style =  {styles.welcomeContainer}>
                        <View style = {styles.catContainer1}>
      
                          <TouchableOpacity onPress = { () => {
                            if (this.state.bool) {
                              const temp = _.cloneDeep(this.state.list)
                              const tempItem = _.cloneDeep(this.state.itemLs)
                              const tempCost = _.cloneDeep(this.state.costLs)
                              const tempCat = _.cloneDeep(this.state.catLs)
                              const newLs = sortByItem(temp)
                              this.setState({
                                itemLs: newLs[0],
                                costLs: newLs[1],
                                catLs: newLs[2],
                                itemTemp: tempItem,
                                costTemp: tempCost,
                                catTemp: tempCat,
                                bool: false,
                            })
                          } else { 
                            this.setState({
                              itemLs: this.state.itemTemp,
                              costLs: this.state.costTemp,
                              catLs: this.state.catTemp,
                              bool: true,
                            })
                          }
                        }}>
                            <Text style = {styles.header2}  > Item </Text></TouchableOpacity>
                         </View>

                         
                         <View style = {styles.catContainer2}>
                           <TouchableOpacity onPress = { () => {
                            if (this.state.bool) {
                              const temp = _.cloneDeep(this.state.list)
                              const tempItem = _.cloneDeep(this.state.itemLs)
                              const tempCost = _.cloneDeep(this.state.costLs)
                              const tempCat = _.cloneDeep(this.state.catLs)
                              const newLs = sortByCost(temp)
                              this.setState({
                                itemLs: newLs[0],
                                costLs: newLs[1],
                                catLs: newLs[2],
                                itemTemp: tempItem,
                                costTemp: tempCost,
                                catTemp: tempCat,
                                bool: false,
                            })
                          } else { 
                            this.setState({
                              itemLs: this.state.itemTemp,
                              costLs: this.state.costTemp,
                              catLs: this.state.catTemp,
                              bool: true,
                            })
                          }
                        }}>
                         <Text style = {styles.header2}  >Cost </Text></TouchableOpacity>
                         </View>

                         <View style = {styles.catContainer3}>
                           <TouchableOpacity onPress = { () => {
                            if (this.state.bool) {
                              const temp = _.cloneDeep(this.state.list)
                              const tempItem = _.cloneDeep(this.state.itemLs)
                              const tempCost = _.cloneDeep(this.state.costLs)
                              const tempCat = _.cloneDeep(this.state.catLs)
                              const newLs = sortByCat(temp)
                              this.setState({
                                itemLs: newLs[0],
                                costLs: newLs[1],
                                catLs: newLs[2],
                                itemTemp: tempItem,
                                costTemp: tempCost,
                                catTemp: tempCat,
                                bool: false,
                            })
                          } else { 
                            this.setState({
                              itemLs: this.state.itemTemp,
                              costLs: this.state.costTemp,
                              catLs: this.state.catTemp,
                              bool: true,
                            })
                          }
                        }}>
                         <Text style = {styles.header2}> Category </Text></TouchableOpacity>  
                         </View>

                  </View>




                <ScrollView style={styles.container} contentContainerStyle={styles.welcomeContainer}>

                  <View style = {styles.viewContainer}>
                    <Text style = {styles.text}> {this.state.itemLs}</Text>
                  </View>
                  <View style = {styles.viewContainer}>
                    <Text style = {styles.text}> {this.state.costLs}</Text>
                  </View>
                   <View style = {styles.viewContainer}>
                    <Text style = {styles.text}> {this.state.catLs}</Text>
                  </View>




                </ScrollView>

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
                      
                <OptionButton
                    icon="md-pie"
                     label="Overview"
                     onPress={() => {
                      this.props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'Overview' }],
                      });
                    }}
                  />
                  </View>
                </View>

            
                

        )
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

function itemComparator(a, b) {
  if (a[0].toUpperCase() < b[0].toUpperCase()) return -1;
  if (a[0].toUpperCase() > b[0].toUpperCase()) return 1;
  return 0;
}

function costComparator(a, b) {
  let strA = a[1];
  let strB = b[1];
  const numA = Number(strA)
  const numB = Number(strB)
  if (numA < numB) return -1;
  if (numA > numB) return 1;
  return 0;
}

function costComparator2(a, b) {
  if (a[1] < b[1]) return 1;
  if (a[1] > b[1]) return -1;
  return 0;
}

function catComparator(a, b) {
  if (a[2].toUpperCase() < b[2].toUpperCase()) return -1;
  if (a[2].toUpperCase() > b[2].toUpperCase()) return 1;
  else {
    if (a[1] < b[1]) return -1;
    if (a[1] > b[1]) return 1;
    return 0;
  }
}

function sortByItem(ls) {
  ls.sort(itemComparator)
  let newHistory = [[], [], []]
  for (let i = 0; i < ls.length; i++) {
    newHistory[0].push((String(ls[i][0]) + "\n"))
  }
  for (let i = 0; i < ls.length; i++) {
    newHistory[1].push((String(ls[i][1]) + "\n"))
  }
  for (let i = 0; i < ls.length; i++) {
    newHistory[2].push((String(ls[i][2]) + "\n"))
  }
  return newHistory
}

function sortByCost(ls) {
 ls.sort(costComparator)
 let newHistory = [[], [], []]
 for (let i = 0; i < ls.length; i++) {
   newHistory[0].push((String(ls[i][0]) + "\n"))
 }
 for (let i = 0; i < ls.length; i++) {
   newHistory[1].push((String(ls[i][1]) + "\n"))
 }
 for (let i = 0; i < ls.length; i++) {
   newHistory[2].push((String(ls[i][2]) + "\n"))
 }
 return newHistory
}


function sortByCat(ls) {
  ls.sort(catComparator)
  let newHistory = [[], [], []]
  for (let i = 0; i < ls.length; i++) {
    newHistory[0].push((String(ls[i][0]) + "\n"))
  }
  for (let i = 0; i < ls.length; i++) {
    newHistory[1].push((String(ls[i][1]) + "\n"))
  }
  for (let i = 0; i < ls.length; i++) {
    newHistory[2].push((String(ls[i][2]) + "\n"))
  }
  return newHistory
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
      },
      footer: {
        backgroundColor: 'transparent',
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingVertical: 30,
    },
      welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 0,
        flexDirection: 'row',

      },
      getStartedContainer: {
        marginBottom: 10,
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },

      getStartedContainer2: {
        backgroundColor: 'rgb(24, 179, 166)',
        padding: 10,
        width: 100,
        borderRadius: 20,
        alignItems: 'center',
        marginHorizontal: 10,
      },
      viewContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: -1,
        marginBottom: 0,
        borderRightWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
      },

      
      catContainer1: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: -10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: StyleSheet.hairlineWidth,

        backgroundColor: 'rgba(96, 244, 198, 0.65)'
      },


      catContainer2: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: -10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        backgroundColor: 'rgba(8, 215, 150, 0.65)'
      },

      catContainer3: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: -10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: StyleSheet.hairlineWidth,

        backgroundColor: 'rgba(5, 173, 120, 0.86)'
      },

      button: {
        flexDirection: 'row',
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
      header3: {
        marginBottom: 10,
        fontSize: 45,
        textAlign: 'center',
        fontWeight: 'bold',
      },
      text: {
        fontSize: 15,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
        textAlignVertical: 'top'
      },
      highlight: {
        borderRadius: 20,
            },
      buttons: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
      }
})


export default CurrentPort