import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";


export default function BackBtn(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={props.onPress}>
    <Text style={styles.text}>Submit</Text>
  </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  icon : {
    marginTop: 10,
  },

  back: {
    marginLeft: 140,
    marginTop: 50,
    borderRadius: 50,
    height: 80,
    width: 80,
    backgroundColor: "#bbb"
    
  },

  container: {
    marginTop: 20,
    backgroundColor: '#003D7C',
    borderRadius: 200,
  },
  text: {
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    color: 'white',
    textAlign: 'center'
  }
});
