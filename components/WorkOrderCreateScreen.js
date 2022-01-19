import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, CheckBox, TouchableOpacity, Pressable, ScrollView, TextInput, Image } from 'react-native';
import SmallButton from './SmallButton';
import { WorkOrdersContext } from '../contexts/WorkOrdersContext.js';

function Input(props) {
    return (
        <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>{props.label}</Text>
                <TextInput style={styles.input} value={props.state} onChangeText={(t) => props.setState(t || '')} onEndEditing={props.paramChange} />
            </View>
        </View>
    )
}

function BigInput(props) {
    return (
        <View style={styles.inputContainer}>
            <View style={styles.bigInputWrapper}>
                <Text style={styles.bigLabel}>{props.label}</Text>
                <TextInput multiline={true} numberOfLines={20} style={styles.bigInput} value={props.state} onChangeText={(t) => props.setState(t || '')} onEndEditing={props.paramChange} />
            </View>
        </View>
    )
}

export default function WorkCreateScreen({ route, navigation }) {
    const { icon, shape, quantity, material, length, width, identifier, instructions } = route.params;
    const [quantityInput, setQuantityInput] = useState('')
    const [materialInput, setMaterialInput] = useState('')
    const [lengthInput, setLengthInput] = useState('')
    const [widthInput, setWidthInput] = useState('')
    const [identifierInput, setIdentifierInput] = useState('')
    const [instructionInput, setInstructionInput] = useState('')

    const { orders, setOrders } = useContext(WorkOrdersContext);

    function addOrder(order) {
        setOrders([...orders, order]);
    }

    {/*async function setAsyncStore() {
        let prevStorage;
        await AsyncStorage.getItem('Orders').then((value) => {
            prevStorage = JSON.parse(value)
        })
        if(Object.keys(prevStorage).length !== 0) {
            await AsyncStorage.setItem('Orders', JSON.stringify([...prevStorage, { icon: icon, shape: shape, quantity: quantityInput, material: materialInput, length: lengthInput, width: widthInput, identifier: identifierInput, instructions: instructionInput }]))
        }
        else {
            await AsyncStorage.setItem('Orders', JSON.stringify([{ icon: icon, shape: shape, quantity: quantityInput, material: materialInput, length: lengthInput, width: widthInput, identifier: identifierInput, instructions: instructionInput }]))
        }
    }*/}

    async function create() {
        addOrder({ icon: icon, shape: shape, quantity: quantityInput, material: materialInput, length: lengthInput, width: widthInput, identifier: identifierInput, instructions: instructionInput })
        navigation.navigate('WorkOrderList', { icon: icon, shape: shape, quantity: quantityInput, material: materialInput, length: lengthInput, width: widthInput, identifier: identifierInput, instructions: instructionInput })
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={styles.arrowStyle} source={require('../assets/ArrowLeft.png')}/>
                </TouchableOpacity>
                <SmallButton label={icon ? icon :'Icon Selection'} pressFunction={() => navigation.navigate('WorkOrderShape', { selectionType: 'icon', shape: shape, icon: icon})}/>
                <SmallButton label={shape ? shape : 'Shape Type Selection'} pressFunction={() => navigation.navigate('WorkOrderShape', { selectionType: 'shape', shape: shape, icon: icon})}/>
                <Input state={quantityInput} setState={setQuantityInput} paramChange={() => navigation.setParams({ quantity: quantityInput })} label={'Quantity'}/>
                <Input state={materialInput} setState={setMaterialInput} paramChange={() => navigation.setParams({ material: materialInput })} label={'Material'}/>
                <Input state={lengthInput} setState={setLengthInput} paramChange={() => navigation.setParams({ length: lengthInput })} label={'Length'}/>
                <Input state={widthInput} setState={setWidthInput} paramChange={() => navigation.setParams({ width: widthInput })} label={'Width'}/>
                <Input state={identifierInput} setState={setIdentifierInput} paramChange={() => navigation.setParams({ identifier: identifierInput })} label={'Identifier'}/>
                <BigInput state={instructionInput} setState={setInstructionInput} paramChange={() => navigation.setParams({ instructions: instructionInput })} label={'Instructions'}/>
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
    arrowStyle: {
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10
    }
})