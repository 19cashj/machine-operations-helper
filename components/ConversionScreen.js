import React, { useState } from 'react';
import { StyleSheet, View, Button, Image, Text, TextInput } from "react-native";
import { Context } from '../Context'

export function ConversionScreen() {
    const [feet1, setFeet1] = useState(0);
    const [inches1, setInches1] = useState(0);
    function calculate() {
        return feet1 * 12 + inches1;
    }
    return (
      <View style={styles.container}>
          <View style={styles.conversionContainer}>
              <Text style={styles.conversionHeader}>esfsego</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Ft:</Text>
                        <TextInput TextInput style={styles.input} placeholder={'Feet'} value={feet1} onChangeText={(t) => setFeet1(t)}></TextInput>
                    </View>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>In:</Text>
                        <TextInput TextInput style={styles.input} placeholder={'Inches'} value={inches1} onChangeText={(t) => setInches1(parseInt(t) || 0)}></TextInput>
                    </View>
                </View>
                <Text style={styles.result}>Result: {calculate()} inches</Text>
            </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c3c3c3',
        fontSize: 12,
    },
    conversionContainer: {
        alignItems: 'center',
        flexDirection: 'column',
    },
    inputContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    inputWrapper: {
        flexDirection: 'row',
        backgroundColor: '#FFFF',
        width: 100,
        marginTop: 20,
        borderRadius: 20,
        marginLeft: 20
    },
    input: {
        height: 40,
        maxWidth: 80,
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 15,
        marginTop: 10,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    conversionHeader: {
        fontSize: 20,
        marginTop: 30,
    },
    result: {
        fontStyle: 'italic',
        fontSize: 18,
        padding: 30,
        textAlign: 'center'
    }
})