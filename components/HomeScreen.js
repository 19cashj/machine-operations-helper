import React from 'react';
import { StyleSheet, View, Button, Image, Text } from "react-native";
import { Context } from '../Context'

export function HomeScreen({ navigation }) {
    return (
      <View style={styles.container}>
          <Image style={styles.logo} source={require('../assets/icon.png')} />
          <Text style={styles.title}>Machine Operations Helper</Text>
          <Text style={styles.text}>Swipe right to open navigation</Text>
          <Image style={styles.arrow}source={require('../assets/arrow.png')} />
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c3c3c3',
        fontSize: 12
    },
    logo: {
        width: 199,
        height: 199,
        alignSelf: 'center',
        marginTop: 84
    },
    title: {
        fontSize: 48,
        width: 383,
        alignSelf: 'center',
        textAlign: 'center',
        padding: 20
    },
    text: {
        fontSize: 18,
        textAlign: 'center'
    },
    arrow: {
        alignSelf: 'center',
        marginTop: 20
    }
});