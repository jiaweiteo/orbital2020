import * as React from 'react';
import { Image, View, Text, StyleSheet, FlatList, TextInput, Alert} from 'react-native';
import { RectButton, ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import _ from "lodash"
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';

import budget from '../components/TrackBudget';
import BackBtn from '../components/BackBtn';


export default class Overview extends React.Component {
    static navigationOptions = {
        title: 'Overview',
    };

    constructor(props) {
    super(props);
      
    this.itemH = budget.state.itemH
    this.costH = budget.state.costH
    this.catH = budget.state.catH
    this.history = budget.state.history
    this.array = [],
    this.costByCat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] 
    this.data = [
      {
        name: "Grocery",
        population: 0,
        color: '#FF0000',
        legendFontColor: "#7F7F7F",
        legendFontSize: 12
      },
      {
        name: "Food and Dining",
        population: 0,
        color: "#F98AF9",
        legendFontColor: "#7F7F7F",
        legendFontSize: 12
      },
      {
        name: "Shopping",
        population: 0,
        color: "#8516D0",
        legendFontColor: "#7F7F7F",
        legendFontSize: 12
      },
      {
        name: "Transport",
        population: 0,
        color: "#91D0FF",
        legendFontColor: "#7F7F7F",
        legendFontSize: 12
      },
      {
        name: "Utilites",
        population: 0,
        color: "#00FFB3",
        legendFontColor: "#7F7F7F",
        legendFontSize: 12
      },
      {
        name: "Insurance",
        population: 0,
        color: "#0E8030",
        legendFontColor: "#7F7F7F",
        legendFontSize: 12
      },
      {
        name: "Entertainment",
        population: 0,
        color: "#EBEB50",
        legendFontColor: "#7F7F7F",
        legendFontSize: 12
      },
      {
        name: "Personal Care",
        population: 0,
        color: "#FFC400",
        legendFontColor: "#7F7F7F",
        legendFontSize: 12
      },
      {
        name: "Miscellaneous",
        population: 0,
        color: "#FF7700",
        legendFontColor: "#7F7F7F",
        legendFontSize: 12
      },
      {
        name: "Others",
        population: 0,
        color: "#EE816B",
        legendFontColor: "#7F7F7F",
        legendFontSize: 12
      },
    ];
    this.count = 1;
    this.state = {
 
        arrayHolder: [],
        dataHolder: [],
      }
 
  }

  componentDidMount() {
      
    for (let i = this.itemH.length - 1; i >= 0; i--) {
        this.array.push({
            title: this.itemH[i], 
            cost: this.costH[i],
            cat: this.catH[i],
            key: i
        })
    }

    if (this.count <= this.history.length) {
      for (let i = 0; i < this.itemH.length; i++) {
        this.count += 1
        for (var j in this.data) {
          if (this.data[j].name == (this.history[i][2])) {
            this.data[j].population = this.data[j].population + Number(this.history[i][1]);
            }
          }
        }
      }


    this.setState({ 
      arrayHolder: [...this.array],
      dataHolder: [...this.data]
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

  promptUser(key)  {
    const id = Number(key)
    const catID = this.history[id][2]
    const costID = Number(this.history[id][1])
    for (var j in this.data) {
        if (this.data[j].name == catID) {

          this.data[j].population = this.data[j].population - costID;
        }
    }

    const title = 'Delete Item?';
    const message = 'This action cannot be reverted!';
    const buttons = [
        { text: 'No', onPress: () => {} },
        { text: 'Yes', onPress: () => {
          const storeAll = budget.deleteItem(key)
          this.history = storeAll[0]
          this.itemH = storeAll[1]
          this.costH = storeAll[2]
          this.catH = storeAll[3]
          this.array = []
          for (let i = this.itemH.length - 1; i >= 0; i--) {
            this.array.push({
                title: this.itemH[i], 
                cost: this.costH[i],
                cat: this.catH[i],
                key: i
            })
        }


        this.setState({ 
          arrayHolder: [...this.array],
          dataHolder: [...this.data]
        })
        },
        }
    ];
    return Alert.alert(title, message, buttons);
  }

 
 
  render() {
    const chartConfig = {
      backgroundGradientFrom: "#1E2923",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 3, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false // optional
    };
 

    const budgetDate = budget.getBudgetDate();
    const budgetMonth = budget.getBudgetMonth();
    var date = new Date().getDate();
    var year = new Date().getFullYear();
    var month = new Date().getMonth();
    var months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];
    const monthName = months[month]

    
    return (
        <View style={styles.MainContainer}>       
          <LinearGradient
            colors={['rgba(0, 147, 135, 1)', 'transparent',]}
            style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  height: 500,
                }}
          />
        <View style={styles.welcomeContainer}>
          <Text style={styles.title}>{"Expenses from " + budgetDate + " " + budgetMonth + " - " + date + " " + monthName} </Text>
          <PieChart
              data={this.data}
              width={Dimensions.get('window').width}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="5"
              absolute = {true}
              
            />
      </View>
 
        
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
                  height: 500,
                }}
          />
        <FlatList
 
          data={this.state.arrayHolder}
 
          width='100%'
 
          extraData={this.state.arrayHolder}
 
          keyExtractor={(item, index) => String(item.key)}
           
 
          ItemSeparatorComponent={this.FlatListItemSeparator}
 
          renderItem={({item, index}) => (
            
                <TouchableOpacity 
                underlayColor = 'rgba(255, 0, 0, 0.5)' 
                onLongPress = {() => this.promptUser(item.key)}>
                    <View style = {styles.box}>
               <Text style = {styles.item1}> {item.title} </Text> 
                <Text style = {styles.cat}> {item.cat} </Text>    
                <Text style = {styles.cost}> ${item.cost} </Text>    
               
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
                      
                <OptionButton
                    icon="md-list"
                     label="More"
                     onPress={() => {
                      this.props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'My Portfolio' }],
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
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
 
  },
  footer: {
    backgroundColor: 'rgba(20, 223, 115, 0.3)',
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 10,
    width: "100%",
  },

  title: {
    fontSize: 18,
    margin: 10,
  },

  highlight: {
    alignItems: "center",
    backgroundColor: "#3EA687",
    padding: 10,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
  },

  SubContainer: {
      flexDirection: "row",
      flex: 1,
  },

  buttons: {
    flexDirection: 'row',
    alignContent: "stretch",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
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
 
    width: '90%',
    height: 40,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    marginTop: 10
  },
  
  item1: {
    fontSize: 25,
    marginLeft: 10,
    height: 35,
    fontWeight: 'bold',
    },

  cat: {
      marginLeft: 15,
      fontSize: 15,
      fontStyle: "italic",
      height: 20,
  },

  cost: {
      fontSize: 25,
      height: 30,
      height: 35,
      alignSelf: "flex-end",
      marginRight: 10,
      marginTop: -30,
      color: 'rgb(32, 128, 8)',
  },
 
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
 
  getStartedContainer2: {
    backgroundColor: 'rgba(20, 180, 150, 0.7)',
    width: 100,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 10,
  },

  
  welcomeContainer: {
    alignItems: 'center',
    paddingBottom: 50,
    marginHorizontal: 10,
    width: "100%",

  },
  welcomeImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  box: {
    backgroundColor: "rgba(216, 216, 216, 0.2)",
    borderRadius: 20,
  }

});

