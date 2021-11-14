import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TextInput, Pressable } from "react-native";
import { usePrevious } from '../hooks/usePrevious';
import { Context } from '../Context'
import { create, all } from 'mathjs'

const config = { }
const math = create(all, config)

function WholeButton(props) {
    const value = (JSON.stringify(props.label) || 0);
    function pressFunction() {
        props.setInput((prev) => {
            return {whole: (prev.whole || '') + value, fraction: (prev.fraction || '')};
        });
    }
    return (
        <SmallButton pressFunction={pressFunction} color={props.color} label={props.label} />
    )
}

function FractionButton(props) {
    const value = (JSON.stringify(props.label) || 0);
    function pressFunction() {
        props.setInput((prev) => {
        return {whole: (prev.whole || undefined), fraction: (prev.fraction || '') + value};
    })}
    return (
        <SmallButton pressFunction={pressFunction} color={props.color} label={props.label} />
    )
}

function UtilityButton(props) {
    const value = (JSON.stringify(props.label) || 0);
    function pressFunction() {
        function clear() {
            return {whole: undefined, fraction: undefined};
        }
        function back(prev) {
            if (prev.whole === undefined) {
                return {whole: undefined, fraction: (prev.whole || undefined)};
            }
            else {
                if (prev.whole.slice(prev.whole.length - 1, prev.whole.length) == '.') {
                }
                return {whole: (prev.whole.substring(0, prev.whole.length - 1) || undefined), fraction: (prev.fraction || undefined)};
            }
        }
        props.setInput((prev) => {
            const utilityFunctions = [clear(), back(prev)];
            return utilityFunctions[props.type]; {/* 0 = clear, 1 = back (Used this system so more utilities could be added easily)*/}
        });
    }
    return (
        <SmallButton pressFunction={pressFunction} color={props.color} label={props.label} />
    )
}

function OperationButton(props) {
    const value = (JSON.stringify(props.label) || 0);
    function pressFunction() {
        props.setInput((prev) => {
            const utilityFunctions = [];
            return utilityFunctions[props.type];
        });
    }
    return (
        <SmallButton pressFunction={pressFunction} color={props.color} label={props.label} />
    )
}

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

export function FractionScreen() {
    const [input, setInput] = useState({whole: undefined, fraction: undefined})
    const [result, setResult] = useState(0);
    const zeroThruNine = [0,1,2,3,4,5,6,7,8,9]
    return (
        <View style={styles.container}>
            <View style={styles.calculator}>
                <View style={styles.resultField}>
                    <Text ellipsizeMode='clip' numberOfLines={1} style={styles.resultText}>{(input.whole || 0)}</Text>
                </View>
                <View style={styles.top}>
                    <View style={styles.wholeNumbers}>
                        <UtilityButton label={'C'} color={'red'} setInput={setInput} type={0} />
                        <UtilityButton label={'<'} color={'blue'} setInput={setInput} type={1} />
                        {zeroThruNine.map((e) => {
                            return <WholeButton label={e} setInput={setInput} key={e} />
                        })}
                        <View style={styles.operations}>
                            <OperationButton label={'+'} color={'green'} setInput={setInput} type={0} />
                            <OperationButton label={'-'} color={'darkred'} setInput={setInput} type={0} />
                            <OperationButton label={'X'} color={'darkblue'} setInput={setInput} type={0} />
                            <OperationButton label={'/'} color={'orange'} setInput={setInput} type={0} />
                        </View>
                    </View>
                    <View style={styles.fractionNumbers}>
                        <UtilityButton label={'C'} color={'red'} setInput={setInput} type={0} />
                        <UtilityButton label={'<'} color={'blue'} setInput={setInput} type={1} />
                        {zeroThruNine.map((e) => {
                            return <FractionButton label={e} setInput={setInput} key={e} />
                        })}
                        <View style={styles.fractionLine} />
                        <UtilityButton label={'C'} color={'red'} setInput={setInput} type={0} />
                        <UtilityButton label={'<'} color={'blue'} setInput={setInput} type={1} />
                        {zeroThruNine.map((e) => {
                            return <FractionButton label={e} setInput={setInput} key={e} />
                        })}
                    </View>
                </View>
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
    },
    calculator: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        padding: 15
    },
    resultField: {
        backgroundColor: 'white',
        width: '90%',
        height: 75,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1
    },
    resultText: {
        fontSize: 40,
        lineHeight: 40,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        height: 50,
        width: 300,
        margin: 25,
        textAlign: 'right'
    },
    top: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    wholeNumbers: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '40%',
        paddingTop: 68
    },
    operations: {
        padding: 35,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    fractionNumbers: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '60%',
        paddingTop: 10
    },
    fractionLine : {
        margin: 20,
        width: '75%',
        height: 5,
        backgroundColor: 'black'
    },
    smallButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 4,
        elevation: 3,
        width: 50,
        alignSelf: 'center',
        marginTop: 10,
        marginHorizontal: 5
    },
    buttonText: {
        fontSize: 12,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
})