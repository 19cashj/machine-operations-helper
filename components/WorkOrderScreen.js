import React, { useState } from 'react';
import { View, Text, StyleSheet, CheckBox, TouchableOpacity } from 'react-native';

export default function WorkOrderScreen({ route, navigation }) {
    const { icon, shape, quantity, material, length, width, identifier, instructions } = route.params;
    return (
        <View>
            <Text>{icon}</Text>
            <Text>{shape}</Text>
            <Text>{quantity}</Text>
            <Text>{material}</Text> 
            <Text>{length}</Text>
            <Text>{width}</Text> 
            <Text>{identifier}</Text>
            <Text>{instructions}</Text> 
        </View>
    )
}