import React, { useState } from 'react';
import { View, Text, StyleSheet, CheckBox, TouchableOpacity, Image } from 'react-native';
import SmallButton from './SmallButton';
import ShapeImages from './ShapeImages';

export default function WorkOrderShapeScreen({ route, navigation }) {
    const { selectionType, icon, shape } = route.params;
    const shapeSet = Object.values(ShapeImages.shape)
    const shapeText = Object.keys(ShapeImages.shape)
    const iconSet = Object.values(ShapeImages.icon)
    const iconText = Object.keys(ShapeImages.icon)
    const [selected, setSelected] = useState(0)
    function SelectionSet() {
        if (selectionType == 'icon') {
            return <Image style={styles.selectionImage} source={iconSet[selected]}/>
        }
        else if (selectionType == 'shape') {
            return <Image style={styles.selectionImage} source={shapeSet[selected]}/>
        }
    }
    function SelectionDesc() {
        if (selectionType == 'icon') {
            return <Text style={styles.selectionText}>{iconText[selected]}</Text>
        }
        else if (selectionType == 'shape') {
            return <Text style={styles.selectionText}>{shapeText[selected]}</Text>
        }
    }
    function previous() {
        setSelected((prev) => {
            if (prev - 1 >= 0) {
                return prev - 1;
            }
            else {
                if (selectionType == 'icon') {
                    return iconSet.length - 1;
                }
                else if (selectionType == 'shape') {
                    return shapeSet.length - 1;
                }
            }
        })
    }
    function next() {
        setSelected((prev) => {
            if (selectionType == 'icon') {
                if (prev + 1 <= iconSet.length - 1) {
                    return prev + 1;
                }
                else {
                    return 0;
                }
            }
            else if (selectionType == 'shape') {
                if (prev + 1 <= shapeSet.length - 1) {
                    return prev + 1;
                }
                else {
                    return 0;
                }
            }
        })
    }
    function pick() {
        if (selectionType == 'icon') {
            navigation.navigate('WorkOrderCreate', { icon: iconText[selected], shape: shape })
        }
        else if (selectionType == 'shape') {
            navigation.navigate('WorkOrderCreate', { shape: shapeText[selected], icon: icon })
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.selectionWrapper}>
                <SelectionSet />
                <SelectionDesc />
            </View>
            <View style={styles.buttonsContainer}>
                <View style={styles.arrowsContainer}>
                    <TouchableOpacity onPress={() => previous()}>
                        <Image style={styles.arrowStyle} source={require('../assets/ArrowLeft.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => next()}>
                        <Image style={styles.arrowStyle} source={require('../assets/ArrowRight.png')}/>
                    </TouchableOpacity>
                </View>
                <SmallButton label={'Pick'} pressFunction={pick}/>
            </View>
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
    selectionWrapper: {
        backgroundColor: 'white',
        width: 350,
        height: 380,
        marginTop: '10%',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectionImage: {
    },
    selectionText: {
        fontWeight: 'bold',
        fontSize: 24,
        marginTop: 20
    },
    arrowStyle: {
    },
    buttonsContainer: {
        flex: 1,
        marginTop: '8%',
    },
    arrowsContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 200,
        height: 50,
        marginBottom: -20
    },
})