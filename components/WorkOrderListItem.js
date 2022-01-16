import React from "react";
import { View, Text, StyleSheet, CheckBox, TouchableOpacity, Image } from 'react-native';
import ShapeImages from "./ShapeImages";

export default function WorkOrderListItem(props) {
    function deleteTask() {
        props.delete(props.index)
    }
    return (
        <TouchableOpacity style={styles.task} onPress={props.press}>
            <View style={styles.left}>
                <Image source={ShapeImages.icon[props.icon]}/>
                <Text style={styles.descText}>{props.id}</Text>
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
    descText: {
        marginLeft: 25,
        fontSize: 18,
        fontWeight: 'bold'
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