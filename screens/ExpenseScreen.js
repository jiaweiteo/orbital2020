import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import BackBtn from '../components/BackBtn';
import { Dropdown } from 'react-native-material-dropdown';



export default class ExpenseScreen extends React.Component {
  

  
  state = {
    text: "",
    cost: "",
    or: true,
    warning: ""
  };
  render() {
    let data = [{
      value: 'Grocery',
    }, {
      value: 'Food',
    }, {
      value: 'Drinks',
    }, {
      value: 'Rent',
    }, {
      value: 'Transport',
    }, {
      value: 'Utilites',
    }, {
      value: 'Insurance',
    }, {
      value: 'Entertainment',
    }, {
      value: 'Others',
    }
  ];


  return (
    
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      
      {/* Input Text */}
      <TextInput style = {styles.item}
        placeholder = "Item"
        onChangeText={text => this.setState({ text })}
        value={this.state.text}

      />
        {/* Slide down choices */}
      <Dropdown style = {styles.category}
        itemCount = {5}
        label="Category"
        data = {data}
      />

        {/* Numbers only */}
      <TextInput style = {styles.item}
        placeholder = "Cost (input numbers only!)"
        onChangeText = {cost => this.setState({ cost})}
        />

      <BackBtn />
    </ScrollView>
  );
}
}
function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
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
    paddingTop: 15,
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
    fontSize: 15,
    alignSelf: 'center',
  },
  category: {
    alignSelf:'center',
  }
});
