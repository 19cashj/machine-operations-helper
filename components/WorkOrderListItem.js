import React from "react";
import { View, Text, StyleSheet, CheckBox, TouchableOpacity } from 'react-native';

export default function Task(props) {
    function deleteTask() {
        props.delete(props.index)
    }
    return (
        <TouchableOpacity style={styles.task} onPress={props.press}>
            <View style={styles.left}>
                <Text style={styles.taskText}>{props.text}</Text>
            </View>
            <View style={styles.right}>
                <TouchableOpacity style={styles.xButton} onPress={deleteTask}>
                    <Text>X</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const styles= StyleSheet.create({
    task: {
        borderWidth: 3,
        borderStyle: 'solid',
        padding: 25,
        borderRadius: 10,
        flex: 1,
        marginTop: 25,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    taskText: {
    },
    left: {
        alignItems: 'center',
        flexDirection: 'row',
        maxWidth: '80%'
    },
    right: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    xButton: {
        width: 20,
        height: 20,
        backgroundColor: 'red',
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    }, 
});