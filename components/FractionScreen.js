import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { Context } from '../Context'
import { create, all, equal, e } from 'mathjs'

const config = { }
const math = create(all, config)

function WholeButton(props) {
    const value = (JSON.stringify(props.label) || 0);
    function pressFunction() {
        props.setInput((prev) => {
            return {whole: (prev.whole || '') + value, numerator: prev.numerator, denominator: prev.denominator, operation: prev.operation};
        });
    }
    return (
        <SmallButton pressFunction={pressFunction} color={props.color} label={props.label} />
    )
}

function FractionButton(props) {
    const value = (JSON.stringify(props.label) || 0);
    function pressFunction() {
        function numerator(prev) {
            return {whole: prev.whole, numerator: (prev.numerator || '') + value, denominator: prev.denominator, operation: prev.operation};
        }
        function denominator(prev) {
            return {whole: (prev.whole), numerator: (prev.numerator), denominator: (prev.denominator || '') + value, operation: prev.operation};
        }
        props.setInput((prev) => {
            const fractionFunctions = [numerator(prev), denominator(prev)];
            return fractionFunctions[props.function]; {/* 0 numerator, 1 denominator*/};
        })}
    return (
        <SmallButton pressFunction={pressFunction} color={props.color} label={props.label} />
    )
}

function UtilityButton(props) {
    function pressFunction() {
        function clear(prev) {
            if (prev.operation !== undefined && prev.whole == undefined && props.prevInput.operation !== undefined) { {/* This check prevents the operation functions from being locked up if the input state had an existing operation */}
                return {whole: undefined, numerator: undefined, denominator: undefined, operation: undefined};
            }
            else {
                switch(props.type) {
                    case 'whole':
                    default:
                        return {whole: undefined, numerator: prev.numerator, denominator: prev.denominator, operation: prev.operation};
                    case 'numerator':
                        return {whole: prev.whole, numerator: undefined, denominator: prev.denominator, operation: prev.operation};
                    case 'denominator':
                        return {whole: prev.whole, numerator: prev.numerator, denominator: undefined, operation: prev.operation};
                }
            }
        }
        function back(prev) {
            switch(props.type) {
                case 'whole':
                default:
                    if (prev.whole === undefined && props.prevInput === undefined) {
                        return {whole: undefined, numerator: prev.numerator, denominator: prev.denominator, operation: prev.operation};
                    }
                    else if (prev.whole === undefined && props.prevInput !== undefined) {
                        props.setPrevInput(()=>{
                            return {whole: undefined, numerator: undefined, denominator: undefined, operation: undefined}
                        })
                        return {whole: props.prevInput.whole, numerator: props.prevInput.numerator, denominator: props.prevInput.denominator, operation: prev.operation};
                    }
                    else {
                        return {whole: (prev.whole.substring(0, prev.whole.length - 1)), numerator: prev.numerator, denominator: prev.denominator, operation: prev.operation};
                    }
                case 'numerator':
                    if (prev.numerator === undefined) {
                        return {whole: prev.whole, numerator: undefined, denominator: prev.denominator, operation: prev.operation};
                    }
                    else {
                        return {whole: prev.whole, numerator: prev.numerator.substring(0, prev.numerator.length - 1), denominator: prev.denominator, operation: prev.operation};
                    }
                case 'denominator':
                    if (prev.denominator === undefined) {
                        return {whole: prev.whole, numerator: prev.numerator, denominator: undefined};
                    }
                    else {
                        return {whole: prev.whole, numerator: prev.numerator, denominator: (prev.denominator.substring(0, prev.denominator.length - 1)), operation: prev.operation};
                    }
            }
        }
        props.setInput((prev) => {
            const utilityFunctions = [clear(prev), back(prev)];
            return utilityFunctions[props.function]; {/* 0 = clear, 1 = back (Used this system so more utilities could be added easily)*/}
        });
    }
    return (
        <SmallButton pressFunction={pressFunction} color={props.color} label={props.label} />
    )
}

function OperationButton(props) {
    function pressFunction() {
        function evaluate() { {/* perform an equals function if an operation had already been inputted, put the result of the previous operation into previous input along with the new operation */}
            const resultWhole = eval(`${props.prevInput.whole || 0} ${props.prevInput.operation || ''} ${props.input.whole || 0}`);
            if(props.label == '=') { {/* If the user inputted the equals operation */}
                props.setInput(() => {
                    return {whole: JSON.stringify(resultWhole) || 0, numerator: undefined, denominator: undefined, operation: undefined};
                });
                props.setPrevInput(() => {
                    return {whole: undefined, numerator: undefined, denominator: undefined, operation: undefined};
                });
            }
            else { {/* If the user inputted another operation */}
                props.setInput(() => {
                    return {whole: undefined, numerator: undefined, denominator: undefined, operation: undefined};
                });
                props.setPrevInput(() => {
                    return {whole: JSON.stringify(resultWhole), numerator: undefined, denominator: undefined, operation: props.label};
                });
            }
        }
        if (props.label == 'AC') { { /* If the user inputted all clear, stop here and do nothing else */}
            props.setInput(() => {
                return {whole: undefined, numerator: undefined, denominator: undefined, operation: undefined};
            });
            props.setPrevInput(() => {
                return {whole: undefined, numerator: undefined, denominator: undefined, operation: undefined};
            });
        }
        else {
            if (props.input.operation || props.label == '=') { {/* If there is an existing operation or the user inputted equals */}
                if (props.input.operation && !props.prevInput.operation) { {/* Prevents an error if the current input has an operation attached to it */}
                    props.setInput((prev) => {
                        return {whole: 0, numerator: prev.numerator, denominator: prev.denominator, operation: undefined};
                    });
                    props.setPrevInput(() => {
                        return {whole: props.input.whole || 0, numerator: props.input.denominator, denominator: props.input.denominator, operation: props.label}
                    })
                }
                else {
                    if (props.prevInput.whole || props.prevInput.numerator || props.prevInput.denominator) { { /* If there is a previous input to perform an operation on */}
                        evaluate();
                    }
                    else { {/* Else do nothing */}
                        props.setPrevInput(() => {
                            return {whole: undefined, numerator: undefined, denominator: undefined, operation: undefined};
                        });
                    }
                }
            }
            else {
                props.setPrevInput(() => {
                    return {whole: props.input.whole || 0, numerator: props.input.numerator, denominator: props.input.denominator, operation: props.label};
                });
                props.setInput(() => {
                    return {whole: undefined, numerator: undefined, denominator: undefined, operation: props.label};
                });
            }
        }
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
    const [input, setInput] = useState({whole: undefined, numerator: undefined, denominator: undefined, operation: undefined})
    const [prevInput, setPrevInput] = useState({whole: undefined, numerator: undefined, denominator: undefined, operation: undefined})
    const numPad = [0,7,8,9,4,5,6,1,2,3]
    return (
        <View style={styles.container}>
            <View style={styles.calculator}>
                <View style={styles.resultField}>
                    <ScrollView horizontal={true}>
                        <Text ellipsizeMode='clip' numberOfLines={1} style={styles.resultText}>
                            {prevInput.whole} {prevInput.numerator}{(prevInput.numerator || prevInput.denominator)?'/':undefined}{prevInput.denominator} {prevInput.operation} {(input.whole || 0)} {(input.numerator || '')}{(input.numerator || input.denominator)?'/':''}{input.denominator || ''}
                        </Text>  
                    </ScrollView>
                </View>
                <View style={styles.top}>
                    <View style={styles.wholeNumbers}>
                        <UtilityButton label={'C'} color={'red'} setInput={setInput} prevInput={prevInput} setPrevInput={setPrevInput} function={0} type={'whole'}/>
                        <UtilityButton label={'<'} color={'blue'} setInput={setInput} prevInput={prevInput} setPrevInput={setPrevInput} function={1} type={'whole'}/>
                        {numPad.map((e) => {
                            return <WholeButton label={e} setInput={setInput} key={e} />
                        })}
                        <View style={styles.operations}>
                            <OperationButton label={'+'} color={'green'} prevInput={prevInput} input={input} setInput={setInput} setPrevInput={setPrevInput} />
                            <OperationButton label={'-'} color={'darkred'} prevInput={prevInput} input={input} setInput={setInput} setPrevInput={setPrevInput} />
                            <OperationButton label={'*'} color={'darkblue'} prevInput={prevInput} input={input} setInput={setInput} setPrevInput={setPrevInput} />
                            <OperationButton label={'/'} color={'orange'} prevInput={prevInput} input={input} setInput={setInput} setPrevInput={setPrevInput} />
                            <OperationButton label={'='} color={'gray'} prevInput={prevInput} input={input} setInput={setInput} setPrevInput={setPrevInput} />
                            <OperationButton label={'AC'} color={'darkorange'} setInput={setInput} setPrevInput={setPrevInput} />
                        </View>
                    </View>
                    <View style={styles.fractionNumbers}>
                        <UtilityButton label={'C'} color={'red'} prevInput={prevInput} setPrevInput={setPrevInput} setInput={setInput} function={0} type={'numerator'}/>
                        <UtilityButton label={'<'} color={'blue'} prevInput={prevInput} setPrevInput={setPrevInput} setInput={setInput} function={1} type={'numerator'}/>
                        {numPad.map((e) => {
                            return <FractionButton label={e} setInput={setInput} key={e} function={0} />
                        })}
                        <View style={styles.fractionLine} />
                        <UtilityButton label={'C'} color={'red'} prevInput={prevInput} setPrevInput={setPrevInput} setInput={setInput} function={0} type={'denominator'}/>
                        <UtilityButton label={'<'} color={'blue'} prevInput={prevInput} setPrevInput={setPrevInput} setInput={setInput} function={1} type={'denominator'}/>
                        {numPad.map((e) => {
                            return <FractionButton label={e} setInput={setInput} key={e} function={1} />
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
        justifyContent: 'center',
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
        margin: 25,
        minWidth: 300,
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
        paddingTop: '10%'
    },
    operations: {
        padding: '15%',
        paddingTop: '5%',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
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
        margin: '1%',
        width: '75%',
        height: 5,
        backgroundColor: 'black'
    },
    smallButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,
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