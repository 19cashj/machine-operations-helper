import React, { useState } from 'react';
import { View, Text, StyleSheet, CheckBox, TouchableOpacity, ScrollView, Image } from 'react-native';
import ShapeImages from './ShapeImages';

export default function WorkOrderScreen({ route, navigation }) {
    const { icon, shape, quantity, material, length, width, identifier, instructions } = route.params;
    return (
        <View style={styles.container}>
            <ScrollView>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={styles.arrowStyle} source={require('../assets/ArrowLeft.png')}/>
                </TouchableOpacity>
                <View style={styles.topCard}>
                    <Text style={styles.header}>{identifier}</Text>
                    <View style={styles.shapeContainer}> 
                        <Text style={styles.medText}>{length}</Text>
                        <View style={styles.widthContainer}>
                            <View style={styles.widthWrapper}>
                                <Text style={styles.width}>{width}</Text> 
                            </View>
                        </View>
                        <Image source={ShapeImages.shape[shape]}/>
                    </View>
                    <Text style={styles.instructions}>{instructions}</Text>
                </View>
                <View style={styles.bottomCard}>
                    <Text style={styles.header}>Full Information:</Text>
                    <Text style={styles.medText}>ID: {identifier}</Text>
                    <Text style={styles.medText}>Quantity: {quantity}</Text>
                    <Text style={styles.medText}>Material: {material}</Text>
                    <Text style={styles.medText}>Length: {length}</Text>
                    <Text style={styles.medText}>Width: {width}</Text>
                    <Text style={styles.instructions}>Instructions: {instructions}</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c3c3c3',
        fontSize: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        padding: 20
    },
    medText: {
        fontSize: 18,
        padding: 16
    },
    shapeContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    widthContainer: {
        position: 'absolute',
        alignItems: 'flex-end',
        height: 263
    },
    widthWrapper: {
        flexDirection: 'row',
        width: 150,
        height: 320,
        transform: [{ rotate: '-90deg'}],
        justifyContent: 'center'
    },
    width: {
        fontSize: 18,
    },
    instructions: {
        padding: 30
    },
    topCard: {
        backgroundColor: 'white',
        width: 350,
        minHeight: 300,
        borderWidth: 2,
        elevation: 3,
        marginTop: 40,
        flex: 1,
        alignItems: 'center',
    },
    bottomCard: {
        backgroundColor: 'white',
        width: 350,
        minHeight: 400,
        borderWidth: 2,
        elevation: 3,
        marginTop: 40,
        flex: 1,
        alignItems: 'center',
        marginBottom: 40
    },
    arrowStyle: {
        alignSelf: 'center',
        marginTop: 20
    }
})