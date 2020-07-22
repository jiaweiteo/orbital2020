import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, FlatList, Text, View, TextInput, Alert, Dimensions, TouchableOpacity } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import BackBtn from '../components/BackBtn';
import { Dropdown } from 'react-native-material-dropdown';
import PropTypes from "prop-types";
import TrackBudget from '../components/TrackBudget'
import budget from '../components/TrackBudget';
import HomeScreen from './HomeScreen';
import { LinearGradient } from 'expo-linear-gradient';
import trackCouple from '../components/TrackCouple'
import firebaseDb from '../firebaseDb'
import * as Animatable from "react-native-animatable";
import KeyboardAwareScrollView from "@pietile-native-kit/keyboard-aware-scrollview";




export default class SplitExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      cost: "",
      category: "",
      friend: "",
      friendsHolder: [],
      friendsCostHolder: [],
      friendCount: 0,
      index: 0,
    }
    this.friends = [],
    this.friendsCost = []
}

  updateItem = text => this.setState({text})

  updateCost = cost => this.setState({cost})

  updateCategory = category => this.setState({category})

  reset = () => {
    this.setState({
      cost: '',
      text: '',
      category: '',
      friend: '',
    })
  }

    joinData = () => {
        let exist = false;
        let uid = "";
        if (this.state.friend == "" || this.state.friend == "-" || this.state.friend == " " || this.state.friend == ",") {
          alert("Invalid Field!");
        } else if (this.state.friend == budget.getUser()) {
          alert("Cannot add yourself!");
        } else {
            let existingUser = false;
            for (let i = 0; i < this.friends.length; i++) {
                if (this.friends[i].title == this.state.friend) {
                    alert("Cannot have repeating user!")
                    existingUser = true;
                    break;
                }
            }
        if (existingUser == false) {
          var user = firebaseDb.firestore().collection("users")
          user.where("name", "==", this.state.friend).get()
              .then(function(querySnapshot) {
                  querySnapshot.forEach(function(doc) {
                      uid = doc.id
                      exist = true;
                  });
              }).then(() => {
                  if (exist == false) {alert("User does not exist!")} 
                  else {
                    this.friends.push({
                        title : this.state.friend,
                        friendsuid: uid,
                        key: this.state.friendCount});
                    this.setState({ 
                        friendsHolder: [...this.friends],
                        friendCount: this.state.friendCount + 1,
                        });
                }
            })
              .catch(function(error) {
                  alert("Error getting documents: " + error);
              });
          }
        }
    }

    componentDidMount() {

        this.setState({ 
            friendsHolder: [...this.friends],
            friendsCostHolder: [...this.friendsCost],
         })

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

    GetItem(item) {
    
        Alert.alert(item);
 
     }

    splitEqual = () => {
        if (this.state.friendCount == 0) {
            alert("No Friends Added!")
        } else {
        const title = "Split Expense Equally"
        const equalsum = Math.floor(this.state.cost / (this.state.friendCount + 1))
        this.friendsCost = [];
        const message = "Each user will pay $" + equalsum + "."
        const buttons = [
            { text: 'Cancel', onPress: () => {}},
            { text: 'Split', onPress: () =>  {
                budget.updateExpenses(equalsum)
                budget.updateHistory(this.state.text.trim(), equalsum, this.state.category)
                budget.addPortfolio()
                this.setState({ 
                    friendsCostHolder: [...this.friendsCost],
                 })
                for (let i = 0; i < this.friends.length; i++) {
                    const friendUID = this.friends[i].friendsuid
                    const tempFriend = firebaseDb.firestore().collection("users").doc(friendUID)
                    tempFriend.update({
                        friendNoti: true,
                        friendExpense: [this.state.text, equalsum, this.state.category, budget.getUser()]
                    })
                }
                this.setState({ 
                    friendsCostHolder: [...this.friendsCost],
                 })
                 alert("Expense Split!")
                 this.reset
                }}
        ]
         Alert.alert(title, message, buttons);

        }
    }
    deleteItemById = id => {
      const filteredData = this.state.data.filter(item => item.id !== id);
      this.setState({ data: filteredData });
    }
    
    
  deleteUser(key)  {
      const title = 'Delete Item?';
      const message = 'This action cannot be reverted!';
      const buttons = [
          { text: 'No', onPress: () => {} },
          { text: 'Yes', onPress: () => {
            let tempFriends = [];
            let tempFriendsCost = []
            for (let i = 0; i < this.friends.length; i++) {
              if (i != key) {
                tempFriends.push(this.friends[i])
                tempFriendsCost.push(this.friendsCost[i])
              }
            }
            this.friends = tempFriends
            this.friendsCost = tempFriendsCost
            this.setState({ 
              friendsHolder: [...this.friends],
              friendsCostHolder: [...this.friendsCost],
           })
          }}
        ];
      return Alert.alert(title, message, buttons);
    }


  render() {
    const { text, cost, category} = this.state;

    let data = [{
      value: 'Grocery',
    }, {
      value: 'Food and Dining',
    }, {
      value: 'Shopping',
    }, {
      value: 'Transport',
    }, {
      value: 'Utilites',
    }, {
      value: 'Insurance',
    }, {
      value: 'Entertainment',
    }, {
      value: 'Personal Care',
    }, {
      value: 'Miscellaneous'
    }, {
      value: 'Others'
    }
  ];
 
  const promptUser = () => {
      let sum = 0;
      let Nan = false;
      for (let i = 0; i < this.friends.length; i++) {
        if (isNaN(this.friendsCost[i])) {
          Nan = true;
          break;
        }
          sum += Number(this.friendsCost[i])
      }
      if (Nan == true) {
        alert("Invalid Input of Expense!")
      } else if (sum > this.state.cost) {
          alert("Split amount is more than expense!")
      } else {
        const userPay = this.state.cost - sum;
        const title = 'Split Expense?';
        const message = "Share an expense with your friends. You are paying $" + userPay + "."
        const buttons = [
            { text: 'Cancel', onPress: () => {}},
            { text: 'Split', onPress: () =>  {
                for (let i = 0; i < this.friends.length; i++) {
                    const friendUID = this.friends[i].friendsuid
                    const tempFriend = firebaseDb.firestore().collection("users").doc(friendUID)
                    tempFriend.update({
                        friendNoti: true,
                        friendExpense: [this.state.text, this.friendsCost[i], this.state.category, budget.getUser()]
                    })
                }
                budget.updateExpenses(userPay)
                budget.updateHistory(this.state.text, userPay, this.state.category)
                budget.addPortfolio()
                alert("Expense Split!")
                this.reset;
                }
            }
        ];
        Alert.alert(title, message, buttons);
        }
    }

  return (
      <KeyboardAwareScrollView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
          <LinearGradient
              colors={['#4682b4', "transparent"]}
              style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 250,
                  }}
            />  
        
        <View style={styles.MainContainer}>

                <View style = {{flexDirection: "row", flex: 1}}>


                <TouchableOpacity onPress =  {this.joinData}
                    activeOpacity={0.7} 
                    style={styles.button2} >
                  <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn2}>
                    <Text style={styles.textSign}> Add Friends </Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress =  {this.splitEqual}
                    activeOpacity={0.7} 
                    style={styles.button2} >
                  <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn2}>
                    <Text style={styles.textSign}> Split Equally </Text>
                  </LinearGradient>
                </TouchableOpacity>
                </View>

                <FlatList
        
                data={this.state.friendsHolder}
        
                width='100%'
        
                extraData={this.state.friendsHolder}
        
                keyExtractor={(index) => index.toString()}
        
                ItemSeparatorComponent={this.FlatListItemSeparator}
        
                renderItem={({ item, index }) => 
                (
                  <TouchableOpacity 
                  underlayColor = 'rgba(255, 0, 0, 0.5)' 
                  onLongPress = {() => this.deleteUser(index)}>
                    <View style = {{flexDirection : "row", flex: 1,}}>
                    <Text style={styles.item2} > {item.title} </Text>
                    <TextInput 
                        placeholder = "$" 
                        onChangeText = {data => {
                            this.friendsCost[index] = data
                            this.setState({ 
                                friendsCostHolder: [...this.friendsCost],
                                });
                        }}
                        value = {this.state.friendsCostHolder[index]}
                        keyboardType = {"numeric"}
                        style={styles.cost} />
                    </View>
                    </TouchableOpacity>
                )
                    } 
                />
        
        
            </View>           
          <Animatable.View
              animation="fadeInUpBig"
              style={styles.footer}
          >
          <LinearGradient
              colors={["#rgba(70, 130, 180, 0.5)", "transparent"]}
              style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    height: 600,
                  }}
            />  
              <View style={styles.action}>
                  <TextInput
                      placeholderTextColor="#fff"
                      style={styles.textInput}
                      autoCapitalize="none"
                      placeholder="Item"
                      onChangeText={this.updateItem}
                      value={text}
                  />

              </View>

              <Dropdown
                        itemCount={5}
                        label="Category"
                        data={data}
                        onChangeText={this.updateCategory}
                        value={category}
                        baseColor= "white"
                        textColor= "white"
                        itemColor= "black"
                        selectedItemColor= "rgba(70, 130, 180, 1)"
                        containerStyle= {styles.category}
                        labelTextStyle= {styles.textSign2}
                        inputContainerStyle= {styles.textSign2}
              />

              <View style={styles.action}>
                  <TextInput
                      placeholderTextColor="#fff"
                      style={styles.textInput}
                      placeholder = "Cost"
                      onChangeText = {this.updateCost}
                      value = {cost}
                      keyboardType = {'numeric'}
                  />
              </View>

              <View style={styles.action}>
                  <TextInput
                      placeholderTextColor="#fff"
                      style={styles.textInput}
                      placeholder = "Friends' Username"
                      onChangeText={data => this.setState({ friend: data })}
                      underlineColorAndroid='transparent'
                  />
              </View>
              
              <LinearGradient
                colors={['#08d4c4', '#01ab9d']}
                style={styles.signIn}>
              <BackBtn style = {styles.button}
                onPress = { () =>  {
                    if (this.state.text.trim() == "" || this.state.category == "" || this.state.cost.trim() == "") {
                      alert("Cannot have empty fields!")
                      this.reset();
                    } else if (isNaN(this.state.cost) ) {
                      alert("Invalid Expense! Expense must be a number");
                      this.setState({cost: ""});    
                    } else {
                      promptUser();
                    }
                  }}> Split Expense </BackBtn>
          </LinearGradient>
      
            
      </Animatable.View>
            </KeyboardAwareScrollView>
  );
}
}


const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    logo: {
        width: height_logo,
        height: height_logo,
        flexDirection: "column",
        alignSelf: "center",
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 80
    },
    footer: {
        flex: 9,
        backgroundColor: 'transparent',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 80,
        paddingVertical: -20,
    },
    text_header: {
        marginTop: 10,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    category: {
        backgroundColor: "#4682b4",
        borderRadius: 8,
        textAlign: "center",
    },
    action: {
        flexDirection: 'row',
        borderWidth: 2,
        padding: 10,
        borderColor: "#4682b4",
        borderRadius: 8,
        marginTop: 15,
        marginBottom: 15,
        alignItems: "center",
        backgroundColor: '#4682b4',
    },
    textInput: {
        fontSize: 20,
        fontWeight: 'bold',
        flex: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 0,
        color: "#fff",
        alignSelf: 'center',
        alignContent: 'stretch',
        textAlign: "center",
    },
    button: {
        alignItems: 'center',
        backgroundColor: "transparent",
    },
    button2: {
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 10,
      backgroundColor: "transparent",
      flex: 1,
  },
    signIn: {
        width: "120%",
        height: 70,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center",
        borderRadius: 10
    },
    signIn2: {
      width: "80%",
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: "center",
      borderRadius: 10
  },
    textSign: {
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: "center",
        color: "white",
        flex: 1,
    },
    textSign2: {
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: "center",
        paddingLeft: 60,
    },
    item2: {
      padding: 10,
      fontSize: 18,
      height: 44,
      flex: 3,
    },
    cost: {
      flex: 1,      
      textAlign: 'center',
      height: 40,
      width: '90%',
      borderWidth: 5,
      borderColor: 'rgb(20, 193, 164)',
      borderRadius: 7,
      marginTop: 12,
    }
});
