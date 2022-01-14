import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, CheckBox, TouchableOpacity, Pressable, ScrollView, TextInput } from 'react-native';
import SmallButton from './SmallButton';

function Input(props) {
    return (
        <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>{props.label}</Text>
                <TextInput style={styles.input} value={props.state} onChangeText={(t) => props.setState(t || '')}></TextInput>
            </View>
        </View>
    )
}

function BigInput(props) {
    return (
        <View style={styles.inputContainer}>
            <View style={styles.bigInputWrapper}>
                <Text style={styles.bigLabel}>{props.label}</Text>
                <TextInput multiline={true} numberOfLines={20} style={styles.bigInput} value={props.state} onChangeText={(t) => props.setState(t || '')}></TextInput>
            </View>
        </View>
    )
}

export default function WorkCreateScreen({ route, navigation }) {
    const { icon, shape, quantity, material, length, width, identifier } = route.params;
    const [quantityInput, setQuantityInput] = useState('')
    const [materialInput, setMaterialInput] = useState('')
    const [lengthInput, setLengthInput] = useState('')
    const [widthInput, setWidthInput] = useState('')
    const [identifierInput, setIdentifierInput] = useState('')
    const [instructionInput, setInstructionInput] = useState('')

    function create() {
        navigation.navigate('WorkOrderList', { icon: icon, shape: shape, quantity: quantity, material: material, length: length, width: width, identifier: identifier })
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <SmallButton label={icon ? icon :'Icon Selection'} pressFunction={() => navigation.navigate('WorkOrderShape', { selectionType: 'icon', shape: shape, icon: icon})}/>
                <SmallButton label={shape ? shape : 'Shape Type Selection'} pressFunction={() => navigation.navigate('WorkOrderShape', { selectionType: 'shape', shape: shape, icon: icon})}/>
                <Input state={quantityInput} setState={setQuantityInput} label={'Quantity'}/>
                <Input state={materialInput} setState={setMaterialInput} label={'Material'}/>
                <Input state={lengthInput} setState={setLengthInput} label={'Length'}/>
                <Input state={widthInput} setState={setWidthInput} label={'Width'}/>
                <Input state={identifierInput} setState={setIdentifierInput} label={'Identifier'}/>
                <BigInput state={instructionInput} setState={setInstructionInput} label={'Instructions'}/>
                <SmallButton label={'Create'} pressFunction={create}/>
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
        borderWidth: 2,
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
    bigInputWrapper: {
        flexDirection: 'column',
        backgroundColor: '#FFFF',
        width: 250,
        height: 250,
        marginTop: 20,
        borderWidth: 2,
        marginHorizontal: 10
    },
    bigInput: {
        height: 200,
        width: 250,
        paddingHorizontal: 20,
    },
    bigLabel: {
        fontSize: 15,
        marginTop: 10,
        marginLeft: 10,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
})