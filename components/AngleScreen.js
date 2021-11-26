import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TextInput, Pressable } from "react-native";
import { Context } from '../Context'
import { create, all } from 'mathjs'

const config = { }
const math = create(all, config)

function RightAngle() {
    return (
        <>
            <Image style={styles.triangle} source={require('../assets/rightTriangle.png')} />
        </>
    )
}

function OtherAngle() {
    return (
        <>
            <Image style={styles.triangle} source={require('../assets/otherTriangle.png')} />
        </>
    )
}

export function AngleScreen() {
    const [toggleTriangle, setToggleTriangle] = useState(false);
    return (
      <View style={styles.container}>
          <Pressable
            onPress={() => {
                setToggleTriangle((prev)=> {
                    return !prev;
                })
            }}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed
                    ? '#b8b8b8'
                    : 'black'
                },
                styles.changeButton
            ]}>
                <Text
                    style={styles.buttonText}
                >Change Triangle</Text>
            </Pressable>
          {toggleTriangle ? <RightAngle /> : <OtherAngle />}
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c3c3c3',
        fontSize: 12,
        alignContent: 'center',
    },
    triangle : {
        alignSelf: 'center',
        marginTop: '5%'
    },
    changeButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        width: 250,
        alignSelf: 'center',
        margin: '10%'
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white'
    }
})