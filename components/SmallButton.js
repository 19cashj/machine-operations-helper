import React from "react"
import { Pressable, Text, StyleSheet } from "react-native"

export default function SmallButton(props) {
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

const styles = StyleSheet.create({
    smallButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 4,
        elevation: 3,
        width: 250,
        alignSelf: 'center',
        zIndex: 1,
        margin: '5%'
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0,
        color: 'white'
    },
})