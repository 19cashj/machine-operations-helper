import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Image, Text, TextInput, Pressable, Dimensions, Modal, Button } from "react-native";
import { Context } from '../Context'
import { create, all } from 'mathjs'

const { width } = Dimensions.get("window");
const config = { }
const math = create(all, config)
let modalButtonPressed = undefined

function SmallButton(props) {
    return (
        <Pressable
            onPressIn={() => modalButtonPressed = props.modalButtonPressed}
            onPress={props.pressFunction}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed
                    ? '#b8b8b8'
                    : props.color || 'black'
                },
                styles.smallButton
            ]}>
                <Text
                    style={props.angle ? styles.angleText : styles.buttonText}
                >{props.label}</Text>
            </Pressable>
    )
}

export function AngleScreen() {
    // This is to manage Modal State
    const [isModalVisible, setModalVisible] = useState(false);

    const [modalInput, setModalInput] = useState('');
  
    const [values, setValues] = useState({a1: undefined, a2: undefined, s1: undefined, s2: undefined, s3: undefined});

    const inputHandle = () => {
        const value = parseInt(modalInput);
        setValues((prev) => {
            switch(modalButtonPressed) {
                case 's1':
                    if(values.s2) {
                        return {a1: ((math.atan(values.s2/value))*57.2958).toFixed(1), a2: ((math.atan(value/values.s2))*57.2958).toFixed(1), s1: value, s2: prev.s2, s3: math.sqrt((value*value)+(prev.s2*prev.s2)).toFixed(2)}
                    }
                    if(values.s3) {
                        return {a1: ((math.atan(values.s3/value))*57.2958).toFixed(1), a2: ((math.atan(value/values.s3))*57.2958).toFixed(1), s1: value, s2: math.sqrt((prev.s3*prev.s3)-(value*value)).toFixed(2), s3: prev.s3}
                    }
                    return {a1: prev.a1, a2: prev.a2, s1: value, s2: prev.s2, s3: prev.s3}
                case 's2':
                    if(values.s1) {
                        return {a1: ((math.atan(value/values.s1))*57.2958).toFixed(1), a2: ((math.atan(values.s1/value))*57.2958).toFixed(1), s1: prev.s1, s2: value, s3: math.sqrt((value*value)+(prev.s1*prev.s1)).toFixed(2)}
                    }
                    if(values.s3) {
                        return {a1: ((math.asin(value/values.s3))*57.2958).toFixed(1), a2: ((math.acos(value/values.s3))*57.2958).toFixed(1), s1: math.sqrt((values.s3*values.s3)-(value*value)).toFixed(2), s2: value, s3: prev.s3}
                    }
                    return {a1: prev.a1, a2: prev.a2, s1: prev.s1, s2: value, s3: prev.s3} 
                case 's3':
                    if(values.s1) {
                        return {a1: ((math.atan(value/values.s1))*57.2958).toFixed(1), a2: ((math.atan(values.s1/value))*57.2958).toFixed(1), s1: prev.s1, s2: math.sqrt((value*value)-(prev.s1*prev.s1)).toFixed(2), s3: value}
                    }
                    if(values.s2) {
                        return {a1: ((math.asin(values.s2/value))*57.2958).toFixed(1), a2: ((math.acos(values.s2/value))*57.2958).toFixed(1), s1: math.sqrt((value*value)-(values.s2*values.s2)).toFixed(2), s2: values.s2, s3: value}
                    }
                    return {a1: prev.a1, a2: prev.a2, s1: prev.s1, s2: prev.s2, s3: value}
            }
        })
        toggleModalVisibility();
        setModalInput('');
    }
  
    // Create toggleModalVisibility function that will
    // Open and close modal upon button clicks.
    const toggleModalVisibility = () => {
        setModalVisible(!isModalVisible);
    };

    return (
      <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonGroup1}>
                <SmallButton label={values.a1 ? values.a1 + '°': 'Angle 1'} color={'transparent'} pressFunction={null} angle={true}></SmallButton>
                <SmallButton label='Reset' color='red' pressFunction={() => {setValues({a1: undefined, a2: undefined,  s1: undefined,  s2: undefined, s3: undefined})}}/>
            </View>
            <View style={styles.buttonGroup2}>
                <SmallButton label={values.s1 ? values.s1 : 'Side 1'} color={values.s1 ? 'gray' : 'black'} pressFunction={values.s1 ? null : toggleModalVisibility} modalButtonPressed={'s1'}></SmallButton>
                <SmallButton label={values.s3 ? values.s3 : 'Side 3'} color={values.s3 ? 'gray' : 'black'} pressFunction={values.s3 ? null : toggleModalVisibility} modalButtonPressed={'s3'}></SmallButton>
            </View>
            <View style={styles.buttonGroup3}>
                <SmallButton label={values.s2 ? values.s2 : 'Side 2'} color={values.s2 ? 'gray' : 'black'} pressFunction={values.s2 ? null : toggleModalVisibility} modalButtonPressed={'s2'}></SmallButton>
                <SmallButton label={values.a2 ? values.a2 + '°': 'Angle 2'} color={'transparent'} pressFunction={null} angle={true}></SmallButton>
            </View>
          </View>
          <Modal animationType="slide" 
                   transparent visible={isModalVisible} 
                   presentationStyle="overFullScreen" 
                   onDismiss={toggleModalVisibility}>
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                        <TextInput placeholder={`Enter value for ${modalButtonPressed}`} keyboardType='numeric' style={styles.textInput} value={modalInput} onChangeText={text => setModalInput(text)}/>
                        <Button title="Enter" onPress={inputHandle} />
                    </View>
                </View>
            </Modal>
          <Image style={styles.triangle} source={require('../assets/rightTriangle.png')} />
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
    triangle : {
        alignSelf: 'center',
        zIndex: 0
    },
    buttonContainer : {
        flex: 1,
        position: 'absolute',
        height: 740
    },
    buttonGroup1 : {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: 550,
    },
    buttonGroup2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 360
    },
    buttonGroup3: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: 400
    },
    smallButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 4,
        elevation: 3,
        width: 100,
        alignSelf: 'center',
        margin: '10%',
        zIndex: 1
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0,
        color: 'white'
    },
    viewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalView: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) }, 
                    { translateY: -90 }],
        height: 180,
        width: width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 7,
    },
    textInput: {
        width: "80%",
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        marginBottom: 8,
    },
    angleText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0,
        color: 'black'
    }
})