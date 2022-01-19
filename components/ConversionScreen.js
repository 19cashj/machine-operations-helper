import React, { useState } from 'react';
import { StyleSheet, View, Button, Image, Text, TextInput } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { create, all } from 'mathjs'

const config = { }
const math = create(all, config)

function ConversionInput(props) {
    return (
        <View style={styles.inputWrapper}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput style={styles.input} keyboardType={'numeric'} value={String(props.state)} onChangeText={(t) => {props.setState(t || '')}}></TextInput>
        </View>
    )
}

function Conversion(props) {
    return (
        <View style={styles.conversionContainer}>
            <Text style={styles.conversionHeader}>{props.header}</Text>
            <View style={styles.inputContainer}>
                {props.conversionInputs.map(e => {
                    return (
                        <ConversionInput label={e.label} state={e.state} setState={e.setState} key={e.key} />
                    )
                })}
            </View>
            <Text style={styles.result}>Result: {props.function || 0} {props.resultUnit}</Text>
        </View> 
    )
}

export function ConversionScreen() {
    const [feet1, setFeet1] = useState(0);
    const [inches1, setInches1] = useState(0);
    const [inches2, setInches2] = useState(0);
    const [milimeters1, setMilimeters1] = useState(0);
    const [numerator1, setNumerator1] = useState(0);
    const [denominator1, setDenominator1] = useState(0);
    const [decimal1, setDecimal1] = useState('');

    function decimalToFraction() {
        if (decimal1 == '') {
            return (`0/0`)
        }
        let result = math.fraction(`0.${decimal1}`)
        return (`${result.n}/${result.d}`);
    }

    return (
      <View style={styles.container}>
          <ScrollView>
            <Conversion header={"Feet to Inches"} conversionInputs={[{label: "Ft", state: feet1, setState: setFeet1, key: 1},{label: "In", state: inches1, setState: setInches1, key: 2}]} function={(parseInt(feet1) * 12 + parseInt(inches1))} resultUnit={'inches'}/>
            <Conversion header={"Inches to Milimeters"} conversionInputs={[{label: "In", state: inches2, setState: setInches2, key: 1}]} function={(inches2 * 25.4)} resultUnit={'milimeters'}/>
            <Conversion header={"Milimeters to Inches"} conversionInputs={[{label: "Mm", state: milimeters1, setState: setMilimeters1, key: 1}]} function={(milimeters1 / 25.4)} resultUnit={'inches'}/>
            <Conversion header={"Fraction to Decimal"} conversionInputs={[{label: "Num", state: numerator1, setState: setNumerator1, key: 1},{label: "Den", state: denominator1, setState: setDenominator1, key: 2}]} function={(numerator1 / denominator1)} resultUnit={'inches'}/>
            <Conversion header={"Decimal to Fraction"} conversionInputs={[{label: "0.", state: decimal1, setState: setDecimal1, key: 1}]} function={decimalToFraction()} resultUnit={' '}/>
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