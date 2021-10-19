import React from 'react';
import { StyleSheet, View } from "react-native";
import { Context } from '../Context'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c3c3c3',
        fontSize: 12
    }
});

export function HomeScreen() {
    return (
      <View style={styles.container}>
      </View>
    )
}