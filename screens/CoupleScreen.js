import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { ImageBackground, Image, Platform, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Alert, Dimensions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import firebaseDb from '../firebaseDb';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import BlueButton from "../components/BlueButton";
import { ProgressChart } from "react-native-chart-kit";
import SideMenu from 'react-native-side-menu'
import UserPermissions from '../components/UserPermissions'
import * as ImagePicker from 'expo-image-picker'
import * as Animatable from 'react-native-animatable';


import budget from '../components/TrackBudget'
import trackCouple from '../components/TrackCouple';


class CoupleScreen extends React.Component {
  static navigationOptions = {
    title: 'Couplescreen',
    headerLeft: null,
};
  constructor(props) {
    super(props);
    this.state = {
      user: {
        avatar: null
      },
      url: "",
      budgett : trackCouple.budget(),
      budgetView : "$" + trackCouple.budget(),
      showingPercentage: false,
      id: "",
      showingDaysLeft: false,
      budgetLeftOrDaysLeft: "Expenses:",
      prevColour: "",
      chartView: false,
      daysView: "$" + trackCouple.state.expenses,
      budgetLeftt: "Budget:",
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
            trackCouple.updateBudget(trackCouple.budget(), ss)
           }}
    ];
    Alert.alert(title, message, buttons);
  }
  componentDidMount() {
    if (trackCouple.percentageNum() < 50) {
      this.setState({
        color: 'green',
      })
    } else if (trackCouple.percentageNum() < 75) {
      this.setState({
        color: 'yellow',
      })
    } else if (trackCouple.percentageNum() < 90) {
      this.setState({
        color: 'orange',
      })
    } else if (trackCouple.percentage() == 'NaN% Spent') {
      this.setState({
        color: 'black',
      })
    } else {
      this.setState({
        color: 'red',
      })
    }

    let imageRef = firebaseDb.storage().ref(budget.getUser() + "/").child("couple-image")
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
    let imageRef = firebaseDb.storage().ref(budget.getUser() + "/").child("couple-image")
    let imageRef2 = firebaseDb.storage().ref(trackCouple.getUser() + "/").child("couple-image")
    imageRef2
      .delete()
      .then(() => {
        console.log(`${imageName}has been deleted successfully.`);
      })
      .catch((e) => console.log('error on image deletion => ', e));
      this.setState({user : {avatar : null}})
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
    var ref = firebaseDb.storage().ref(budget.getUser()).child("couple-image");
    var ref2 = firebaseDb.storage().ref(trackCouple.getUser()).child("couple-image");
    ref2.put(blob);
    return ref.put(blob);

  }

  deleteCouple()  {
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
    const budgetDate = trackCouple.getBudgetDate();
    var date = new Date().getDate();
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;

    const image = { uri: "https://webcomicms.net/sites/default/files/clipart/174875/cute-couple-wallpaper-iphone-174875-772698.jpg" };


    const chartConfig = {
      backgroundGradientFrom: "#1E2923",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false // optional
    };
    
    const data = {
      labels: ["Budget"], // optional
      data: [trackCouple.percentageNum()/100]
    };
    const existCouple =        
    <View>
            <Animatable.View
                    style={styles.footer}
                    animation="fadeInUpBig"
      >
            <LinearGradient
          colors={['rgba(208, 40, 96, 0.5)', 'transparent']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            height: 100,
          }}
        />
      <View style = {styles.text2}>
        <View style = {styles.header3}>
          <Text style={styles.dateText}> {trackCouple.getUser() == "" ? " You have no couple to have a shared budget plan!" : 
                    budget.getUser() + " and " + trackCouple.getUser()}</Text>
          <OptionButton
              icon="ios-close"
              label=""
              onPress={() => {
                this.deleteCouple()
              }}
            isLastOption = "true"
              />
          </View>
          <Text style={styles.dateText2}>{date + " " + monthInWords(month) + " " + year}</Text>
    </View>
      <View style={styles.welcomeContainer}>
        <TouchableOpacity style = {styles.avatarPlaceHolder} onPress = {this.state.user.avatar == null ? this.handlePickAvatar: this.promptUser2}>
        <Image source = {this.state.user.avatar == null ? image : {uri: this.state.user.avatar}} style = {styles.avatar} />
        {this.state.user.avatar != null ? null :   
        <View style = {styles.avatarPlaceHolder}> 
          <Text style = {{fontSize: 20, marginTop: -200}}> Tap to add a couple photo! </Text>       
          <Ionicons
            name = "ios-add"
            size = {50}
            color = "black"
            style = {{marginTop: 0, marginLeft: 2}} />
            </View>
          }
        </TouchableOpacity>
      </View>
      </Animatable.View>

      <View style={styles.getStartedContainer}>
        <View style = {styles.gridLayout}>
            <View style = {styles.gridContent}>
              <Text style={styles.headerText2}> Current Expenses: </Text>
                <Text style = {styles.percentage}>{Math.floor(trackCouple.percentageNum())}%</Text>
                    <ProgressChart
                          data={data}
                          width={200}
                          height={200}
                          strokeWidth={16}
                          radius={50}
                          chartConfig={chartConfig}
                          hideLegend={true}
                    />
            </View>


          {/*  Budget - Expenses */}
          <TouchableOpacity style = {styles.gridContent2} 
                onPress={() => {
                  if (this.state.showingDaysLeft == false) {
                    this.setState({
                      daysView: trackCouple.remainder(),
                      showingDaysLeft: true,
                      budgetLeftOrDaysLeft: "Current Budget Left:",
                      prevColour: this.state.color,
                      budgetView: daysLeft(date, month, budgetDate),
                      budgetLeftt: "Days Left:",
                      color: this.state.prevColour,
                    })
                  } else {
                    this.setState({
                      daysView: "$" + trackCouple.state.expenses,
                      showingDaysLeft: false,
                      budgetLeftOrDaysLeft: "Expenses:",
                      prevColour: this.state.color,
                      budgetView: "$" + trackCouple.budget(),
                      budgetLeftt: "Budget:",
                      color: this.state.prevColour,
                    })
                  }}}>
              <Text style={styles.headerText} st> {this.state.budgetLeftOrDaysLeft} </Text>
              <Text style = {[styles.expenseText1, {color: this.state.color}]}>{this.state.daysView}</Text>
              <Text style={styles.headerText}> {this.state.budgetLeftt} </Text>
              <Text style = {styles.expenseText}>{this.state.budgetView}</Text>
              </TouchableOpacity>
        </View>

        <View style = {styles.gridLayout}>

                <OptionButton
                  icon="md-heart"
                  label= "Couple Overview"
                  onPress={() => {
                    const { navigate } = this.props.navigation
                    navigate('Couple Overview')
                  }}
                />
                
                <OptionButton
                  icon="md-people"
                  label= "View Past Portfolio"
                  onPress={() => {
                    const { navigate } = this.props.navigation
                    navigate('Couple Past Portfolio')
                  }}
                />

        </View>
      </View>
      </View>

    const searchUsers =         
      <View style = {styles.noCouple}>
        <Text style = {styles.headerText3}>You do not have any couple to have a shared budget plan!</Text>
        <OptionButton
            icon="md-search"
            label= "Search for your couple"
            onPress={() => {
              const { navigate } = this.props.navigation
              navigate('Search Users')
            }}
          />
        </View>

    const createBudget =         
    <View style = {styles.noCouple}>
      <Text style = {styles.headerText3}>Start a shared budget plan with {trackCouple.getUser()} now!</Text>
      <OptionButton
          icon="md-add"
          label= "Create Couple Budget"
          onPress={() => {
            const { navigate } = this.props.navigation
            navigate('Create Budget')
          }}
        />
      </View>

    return (
      <SafeAreaView style={styles.container}>
        
    <LinearGradient
          colors={['transparent', 'rgba(208, 40, 96, 1)' ]}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 1000,
          }}
        />
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {trackCouple.getUser() == "" ? searchUsers : trackCouple.budget() == 0 ? createBudget : existCouple}
        </ScrollView>



      </SafeAreaView>
    );
    }

  }

  function OptionButton({ icon, label, onPress, isLastOption }) {
    return (
      <View style = {[styles.icon2, isLastOption && styles.icon3]}>
      <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
        <View>
          <View style={styles.icon}>
            <Ionicons name={icon} size={50} color="rgba(0,0,0,0.35)"/>
            <Text style={styles.optionText}>{label}</Text>
          </View>
        </View>
      </RectButton>
      </View>
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

  const month2 = trackCouple.getBudgetMonth()
  let numMonth = 0;
  var months = [ "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December" ];
  for (let i = 0; i < months.length; i++) {
    if (months[i] == month2) {
      numMonth = i + 1;
    }
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 0,
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
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flex: 1,
    marginTop: 10,
  },

  headerText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: "bold",
  },

  headerText2: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: "bold",
    paddingTop: 20,
    marginBottom: -20,
  },

  dateText: {
    marginTop: 0,
    marginLeft: 80,
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
    textAlign: "center",
  },

  text2: {
    flexDirection: 'column',
  },

  header3: {
    flexDirection: 'row',
    marginBottom: -40,
  },

  text3: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0)'
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  gridLayout: {
    flex: 1,
    flexDirection: "row",
    width: Dimensions.get("screen").width,
    borderBottomWidth: 2,
  },

  gridContent: {
    flex: 1,
    borderTopWidth: 2,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    height: 200,
    backgroundColor: 'transparent'

  },
  gridContent2: {
    flex: 1,
    borderTopWidth: 2,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    height: 200,
    alignSelf:"center",
    paddingTop: 15,
    backgroundColor: 'transparent'

  },

  option: {
    borderWidth: 2,
    alignContent: "center",
    backgroundColor: 'transparent'
  },

  lastOption: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  
  optionText: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  icon: {
    alignItems: "center",
  },
  icon2: {
    flex: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  icon3: {
    flex: 1,
    borderLeftWidth: 0,
    borderRadius: 0,
  },
  percentage: {
    position: "absolute",
    bottom: 55,
    left: 55,
    fontSize: 30,
    lineHeight: 30,
    textAlign: 'center',
    alignSelf: "center",
    fontWeight: "bold",
    color: "rgba(20, 245, 159, 0.75)"
  },
  noCouple: {
    marginTop: Dimensions.get("window").height/2 - 350,
  },
  headerText3: {
    fontSize: 17,
    lineHeight: 24,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: "bold",
  },
  avatarPlaceHolder: {
    width: "98%",
    height: 270,
    backgroundColor: "transparent",
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  avatar: {
    position: "absolute",
    width: "98%",
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderWidth: 3,
    height: 270,
    borderRadius: 20,
  },
});

export default CoupleScreen