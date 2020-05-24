import React from "react";
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import PropTypes from "prop-types";

export default function BackBtn(props) {
  return (
    <Icon style = {styles.icon}
      size={50}
      containerStyle={[styles.back, props.style]}
      name="check"
      type="font-awesome"
      color="#0a0082"
      onPress = { () =>  alert("Submitted!")}
    />
  );
}

BackBtn.propTypes = {
  style: PropTypes.object,
  back: PropTypes.func
};

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
    
  }
});
