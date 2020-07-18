import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const BlueButton = props => (
    <TouchableOpacity style = {[styles.container, props.style]}
                      onPress = {props.onPress}>
        <Text style = {styles.text}> {props.children}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'blue',
        borderRadius: 200,
    },
    text: {
        fontSize: 20,
        paddingHorizontal: 19,
        paddingVertical: 8,
        borderRadius: 50,
        color: 'white',
        textAlign: 'center'
    }
})

export default BlueButton