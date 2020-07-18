import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Alert,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import firebaseDb from '../firebaseDb';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import BlueButton from "../components/BlueButton";
import UserPermissions from '../components/UserPermissions'
import * as ImagePicker from 'expo-image-picker'
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



import budget from '../components/TrackBudget';
import trackCouple from '../components/TrackCouple';


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerLeft: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      user: {
        avatar: null,
      },
      budgett : budget.budget(),
      budgetView : budget.remainder(),
      showingPercentage: false,
      colour: 'black',
      id: "",
      budgetDate : budget.getBudgetDate(),

    }
    this.color = "black"
    this.dateID = ""
  }

  promptUser = (date, month, year) => {
    this.dateID = ""
    if (month % 10 == month) {
      this.dateID = "0" + String(month)
    } else {
      this.dateID = month
    }
    const ss = date + "-" + this.dateID + "-" + year;
    const title = 'Your Monthly Budget Plan has ended!';
    const message = 'Click Ok to restart your monthly budget plan!';
    const buttons = [
      { text: 'No', onPress: () => 0 },
      { text: 'Yes', onPress: () => {
          budget.updateBudget(budget.budget(), ss)
        }}
    ];
    Alert.alert(title, message, buttons);
  }
  componentDidMount() {
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

    let imageRef = firebaseDb.storage().ref(budget.getUser() + "/").child("personal-image")
    imageRef
        .getDownloadURL()
        .then((url) => {
          //from url you can fetched the uploaded image easily
          this.setState({user : {avatar: url}});
        })
        .catch((e) => console.log('getting downloadURL of image error => ', e));
  }

  promptUser2 = () =>  {
    const title = "Select an Option"
    const message = ""
    const buttons = [
      { text: "Cancel", onPress: () => {}},
      { text: "Remove Image", onPress: () => {this.deleteImage()}},
      { text: 'Change Image', onPress: () => {this.handlePickAvatar2()}}
    ]
    return Alert.alert(title, message, buttons);
  }

  deleteImage() {
    let imageRef = firebaseDb.storage().ref(budget.getUser() + "/").child("personal-image")
    imageRef
        .delete()
        .then(() => {
          console.log(`${imageName}has been deleted successfully.`);
        })
        .catch((e) => console.log('error on image deletion => ', e));
    this.setState({user : {avatar : null}})
    alert("Deleted");
  }

  handlePickAvatar = async () => {

    UserPermissions.getCameraPermission()

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    })

    if (!result.cancelled) {
      this.setState({user : {...this.state.user, avatar: result.uri}})
      this.uploadImage(result.uri)
    }
  }

  async handlePickAvatar2() {

    UserPermissions.getCameraPermission()

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    })

    if (!result.cancelled) {
      this.setState({user : {...this.state.user, avatar: result.uri}})
      this.uploadImage(result.uri)
    }
  }

  uploadImage = async(uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebaseDb.storage().ref(budget.getUser()).child("personal-image");
    return ref.put(blob);

  }

  render() {
    const budgetDate = budget.getBudgetDate();
    var date = new Date().getDate();
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;


    return (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <LinearGradient
                    colors={['rgba(0, 147, 135, 1)', 'transparent',]}
                    style={{
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          top: 0,
                          height: 250,
                        }}
                  />  
            <View style={styles.welcomeContainer}>
              <View style={styles.container}>
                <StatusBar backgroundColor='#009387' barStyle="light-content"/>
                <View style={styles.header}>
                  <TouchableOpacity style = {styles.avatarPlaceHolder} onPress = {this.state.user.avatar == null ? this.handlePickAvatar: this.promptUser2}>
                    <Animatable.Image
                        animation="bounceIn"
                        duraton="1500"
                        source={this.state.user.avatar == null ? null : {uri: this.state.user.avatar}}
                        style={styles.avatar}
                    />
                    </TouchableOpacity>
                </View>
              </View>
              <View style = {styles.text2}>

                <Text style={styles.dateText}>{budget.getUser()}</Text>

                <Text style={styles.dateText2}>{date + " " + monthInWords(month) + " " + year}</Text>

               </View>
                <Animatable.View
                    style={styles.footer}
                    animation="fadeInUpBig"
                >
                <LinearGradient
                    colors={['rgba(0, 147, 135, 0.6)', 'transparent']}
                    style={{
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          top: 0,
                          borderTopRightRadius: 30,
                          borderTopLeftRadius: 30,
                          height: 700,
                        }}
                  />  
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
                      }}> {this.state.budgetView} </Text>
              </View>
              <View>

              </View>
              <Text style={styles.headerText}>Days Left to end of Monthy Budget: </Text>
              <View>
                <Text style = {styles.expenseText}
                > {(daysLeft(date, month, budgetDate)) == 0 ? this.promptUser(date, month, year) : daysLeft(date, month, budgetDate)}</Text>
              </View>

            </View>
                </Animatable.View>
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

  const month2 = budget.getBudgetMonth()
  let numMonth = 0;
  var months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
  for (let i = 0; i < months.length; i++) {
    if (months[i] == month2) {
      numMonth = i + 1;
    }
  }
  if (month > numMonth && date > budgetDate) {
    return 0;
  }
  if (date > budgetDate) {
    return daysInMonth - date + budgetDate
  } else if (date < budgetDate) {
    return budgetDate - date
  } else {
    if (month == numMonth) {
      return daysInMonth
    } else {
      return 0
    }
  }
}

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        backgroundColor: 'rgba(20, 223, 115, 0.3)',
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop:5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    },
    avatarPlaceHolder: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 2,
      backgroundColor: "#E1E2E6",
      marginTop: 48,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 6,
      marginLeft: 10,
    },
    avatar: {
      position: "absolute",
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 2,
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 10,
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
      textAlign: 'center',
    },

    dateText2: {
      marginTop: 0,
      marginLeft: 10,
      paddingLeft: 0,
      fontSize: 20,
      color: 'rgba(96,100,0, 10)',
      textAlign: "left",
      marginBottom: 10,
    },

    text2: {
      flexDirection: 'column',
    },

    text3: {
      flexDirection: "row",
    },
    button: {
      backgroundColor: 'rgba(0,0,0,0)'
    },
});

export default HomeScreen