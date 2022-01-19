import React, { useState } from 'react';
import { StyleSheet, View, Button, Image, Text, TextInput } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import steelWeights from '../SteelWeights';

function Input(props) {
    return (
        <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>{props.label}</Text>
                <TextInput style={styles.input} keyboardType={'numeric'} value={String(props.state)} onChangeText={(t) => {props.setState(t || '')}}></TextInput>
            </View>
        </View>
    )
}

export default function WeightScreen() {
    const [selectedWeight, setSelectedWeight] = useState();
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    return (
      <View style={styles.container}>
          <Text style={styles.result}>Length and Width should be Inches</Text>
          <View style={styles.subContainer}>
            <Input state={length} setState={setLength} label={'Length'} />
            <Input state={width} setState={setWidth} label={'Width'} />
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Thickness</Text>
                    <Picker
                        style={styles.input}
                        selectedValue={selectedWeight}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedWeight(itemValue)
                        }>
                        {steelWeights.map(e => {
                            return (
                                <Picker.Item label={e.dim} value={e.weight} key={e.weight}/>
                            )
                        })}
                    </Picker>
                </View>
            </View>
            <Text style={styles.result}>Result: {(((parseInt(width) * parseInt(length)) / 144) * selectedWeight).toFixed(1)} pounds</Text>
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
    subContainer: {
        marginTop: '25%'
    },
    inputContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    inputWrapper: {
        flexDirection: 'row',
        backgroundColor: '#FFFF',
        width: 250,
        marginTop: 20,
        borderRadius: 20,
        marginHorizontal: 10
    },
    input: {
        height: 40,
        width: 150,
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 15,
        marginTop: 10,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    result: {
        fontStyle: 'italic',
        fontSize: 18,
        padding: 30,
        textAlign: 'center'
    }
})