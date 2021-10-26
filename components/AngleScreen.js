import React from 'react';
import { StyleSheet, View, Button, Image, Text } from "react-native";
import { Context } from '../Context'

export function AngleScreen({ navigation }) {
    return (
      <View style={styles.container}>
          <Text>Hi</Text>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c3c3c3',
        fontSize: 12,
        alignContent: 'center',
        justifyContent: 'center'
    },
})