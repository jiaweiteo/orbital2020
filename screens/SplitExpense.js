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
          alert("Invalid Distribution of Expense!")
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
    <View style = {styles.container}>
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
    <ScrollView contentContainerStyle={styles.contentContainer}>


      {/* Input Text */}
      <TextInput style = {styles.textInputStyle}
        placeholder = "Item"
        onChangeText={this.updateItem}
        value={text}
      />


        {/* Slide down choices */}
      <Dropdown style = {styles.category}
        itemCount = {5}
        label="Category"
        data = {data}
        onChangeText = {this.updateCategory}
        value = {category}
      />

        {/* Numbers only */}
      <TextInput style = {styles.textInputStyle}
        placeholder = "Cost"
        onChangeText = {this.updateCost}
        value = {cost}
        keyboardType = {'numeric'}
        />

        
        <View style={styles.MainContainer}>

                <TextInput
                placeholder="Search for Friends"
                onChangeText={data => this.setState({ friend: data })}
                style={styles.textInputStyle}
                underlineColorAndroid='transparent'
                />
                <View style = {{flexDirection: "row", flex: 1}}>

                <TouchableOpacity onPress =  {this.joinData}
                    activeOpacity={0.7} 
                    style={styles.button} >
        
                <Text style={styles.buttonText}> Add Friends </Text>
        
                </TouchableOpacity>

                <TouchableOpacity onPress =  {this.splitEqual}
                    activeOpacity={0.7} 
                    style={styles.button} >
        
                <Text style={styles.buttonText}> Split Equally </Text>
        
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

      <BackBtn 
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
      
            
    </ScrollView>
    </View>
  );
}
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    flex: 1,
    backgroundColor: '#fafafa',
    flexDirection: 'column',
  },
  contentContainer: {
    paddingTop: 15,
    marginLeft: 20,
    justifyContent: "center",
    flex: 1,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  item: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 15,
    alignSelf: 'center',
    alignContent: 'stretch',
    textAlign: "center",
    width: Dimensions.get("screen").width
  },
  category: {
    alignSelf:'center',
    textAlign: 'center',
    flex: 1,
    height: 40,
    width: '90%',
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 7,
    marginTop: -10,
  },

  header: {
      fontSize: 30,
      color: 'black',
      textAlign: 'center',
      fontWeight: 'bold',
  },
  header1: {
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    backgroundColor: 'rgba(50, 125, 255, 0.5)'
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
    },

    MainContainer: {
 
        flex: 1,
        margin: 2
     
      },
     
      item2: {
        padding: 10,
        fontSize: 18,
        height: 44,
        flex: 3,
      },
     
      textInputStyle: {
     
        textAlign: 'center',
        height: 40,
        width: '90%',
        borderWidth: 1,
        borderColor: '#4CAF50',
        borderRadius: 7,
        marginTop: 12
      },
     
      button: {
        flex: 1,
        alignContent: "center",
        height: 40,
        padding: 10,
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        marginTop: 10
      },
     
      buttonText: {
        color: '#fff',
        textAlign: 'center',
      },
      cost: {
        flex: 1,      
        textAlign: 'center',
        height: 40,
        width: '90%',
        borderWidth: 1,
        borderColor: '#4CAF50',
        borderRadius: 7,
        marginTop: 12,
      }
});
