import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TextInput, Pressable, Dimensions, Modal, Button } from "react-native";
import { Context } from '../Context'
import { create, all } from 'mathjs'

const { width } = Dimensions.get("window");
const config = { }
const math = create(all, config)

function SmallButton(props) {
    return (
        <Pressable
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
                    style={styles.buttonText}
                >{props.label}</Text>
            </Pressable>
    )
}

export function AngleScreen() {
    // This is to manage Modal State
    const [isModalVisible, setModalVisible] = useState(false);
  
    // This is to manage TextInput State
    const [inputValue, setInputValue] = useState("");
  
    // Create toggleModalVisibility function that will
    // Open and close modal upon button clicks.
    const toggleModalVisibility = () => {
        setModalVisible(!isModalVisible);
    };
    return (
      <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonGroup1}>
                <SmallButton style={styles.button} label={'Angle 1'} pressFunction={toggleModalVisibility}></SmallButton>
            </View>
            <View style={styles.buttonGroup2}>
                <SmallButton style={styles.button} label={'Side 1'} pressFunction={toggleModalVisibility}></SmallButton>
                <SmallButton style={styles.button} label={'Side 3'} pressFunction={toggleModalVisibility}></SmallButton>
            </View>
            <View style={styles.buttonGroup3}>
                <SmallButton style={styles.button} label={'Side 2'} pressFunction={toggleModalVisibility}></SmallButton>
                <SmallButton style={styles.button} label={'Angle 2'} pressFunction={toggleModalVisibility}></SmallButton>
            </View>
          </View>
          <Modal animationType="slide" 
                   transparent visible={isModalVisible} 
                   presentationStyle="overFullScreen" 
                   onDismiss={toggleModalVisibility}>
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                        <TextInput placeholder="Enter something..." 
                                   value={inputValue} style={styles.textInput} 
                                   onChangeText={(value) => setInputValue(value)} />
  
                        {/** This button is responsible to close the modal */}
                        <Button title="Close" onPress={toggleModalVisibility} />
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
        width: 650,
        top: 30
    },
    buttonGroup2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 340
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
        margin: '10%'
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
})