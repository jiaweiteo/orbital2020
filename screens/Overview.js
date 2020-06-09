import * as React from 'react';
import { Image, View, Text, StyleSheet, FlatList, TextInput, Alert} from 'react-native';
import { RectButton, ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import _ from "lodash"


import budget from '../components/TrackBudget';


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
 
      this.state = {
 
        arrayHolder: [],
 
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
    this.setState({ arrayHolder: [...this.array] })
 
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
        this.setState({ arrayHolder: [...this.array] })
        },
        }
    ];
    return Alert.alert(title, message, buttons);
  }
 
 
  render() {


    return (
        <View style={styles.MainContainer}>

        <View style={styles.welcomeContainer}>
        <Image style = {styles.welcomeImage}
          source={
            require('../assets/images/Logo.png')
          }
        />
      </View>
 
        
       
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
                    <View>
               <Text style = {styles.item1}> {item.title} </Text> 
                <Text style = {styles.cat}> {item.cat} </Text>    
                <Text style = {styles.cost}> ${item.cost} </Text>    
               
                </View>
                </TouchableOpacity>
          )
          }
         
          numColumns={1}
        />
   
 
        <View style = {styles.buttons}>
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
                        
                    <OptionButton
                        icon="md-book"
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
    margin: 2
 
  },

  SubContainer: {
      flexDirection: "row",
      flex: 1,
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
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
      color: '#4CAF50',
  },
 
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
 
  getStartedContainer2: {
    backgroundColor: 'rgba(20, 180, 150, 0.7)',
    padding: 10,
    borderRadius: 100,
    alignItems: 'center',
    marginHorizontal: 10,
  },

  
  welcomeContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 50,
    marginHorizontal: 10,
    width: 1000,

  },
  welcomeImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },

});

