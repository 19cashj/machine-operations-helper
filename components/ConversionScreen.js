import React, { useState } from 'react';
import { StyleSheet, View, Button, Image, Text, TextInput } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { Context } from '../Context'
import { create, all } from 'mathjs'

const config = { }
const math = create(all, config)
/*function ConversionInput(props) {
    return (
        <View style={styles.inputWrapper}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput TextInput style={styles.input} keyboardType={'numeric'} value={props.state} onChangeText={(t) => {props.setState(parseInt(t) || 0)}}></TextInput>
        </View>
    )
}

function Conversion(props) {
    return (
        <View style={styles.container}>
          <View style={styles.conversionContainer}>
              <Text style={styles.conversionHeader}>{props.header}</Text>
                <View style={styles.inputContainer}>
                    <ConversionInput label={props.label1} state={props.state1}/>
                    <ConversionInput state={props.state2}/>
                </View>
                <Text style={styles.result}>Result: {props.function()} inches</Text>
            </View>
        </View>
                
    )
}*/

export function ConversionScreen() {
    const [feet1, setFeet1] = useState(0);
    const [inches1, setInches1] = useState(0);
    const [numerator1, setNumerator1] = useState(1);
    const [denominator1, setDenominator1] = useState(1);
    const [decimal1, setDecimal1] = useState(0);
    function decimalToFraction() {
        let result = math.fraction(`0.${decimal1}`)
        return (`${result.n}/${result.d}`);
    }
    return (
      <View style={styles.container}>
          <ScrollView>
          <View style={styles.conversionContainer}>
              <Text style={styles.conversionHeader}>Feet to Inches</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Ft:</Text>
                        <TextInput TextInput style={styles.input} keyboardType={'numeric'} value={feet1} onChangeText={(t) => setFeet1(parseInt(t) || 0)}></TextInput>
                    </View>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>In:</Text>
                        <TextInput TextInput style={styles.input} keyboardType={'numeric'} value={inches1} onChangeText={(t) => setInches1(parseInt(t) || 0)}></TextInput>
                    </View>
                </View>
                <Text style={styles.result}>Result: {(feet1 * 12 + inches1)} inches</Text>
            </View>
            <View style={styles.conversionContainer}>
                <Text style={styles.conversionHeader}>Fraction to Decimal</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Num:</Text>
                        <TextInput TextInput style={styles.input} keyboardType={'numeric'} value={numerator1} onChangeText={(t) => setNumerator1(parseInt(t) || 0)}></TextInput>
                    </View>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Den:</Text>
                        <TextInput TextInput style={styles.input} keyboardType={'numeric'} value={denominator1} onChangeText={(t) => setDenominator1(parseInt(t) || 0)}></TextInput>
                    </View>
                </View>
                <Text style={styles.result}>Result: {(numerator1 / denominator1) || 0} inches</Text>
            </View>
            <View style={styles.conversionContainer}>
                <Text style={styles.conversionHeader}>Decimal to Fraction</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>0.</Text>
                        <TextInput TextInput style={styles.input} keyboardType={'numeric'} value={decimal1} onChangeText={(t) => setDecimal1(parseInt(t) || 0)}></TextInput>
                    </View>
                </View>
                <Text style={styles.result}>Result: {decimalToFraction() || 0} inches</Text>
            </View>
            </ScrollView>
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
        marginHorizontal: 10
    },
    input: {
        height: 40,
        width: 80,
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