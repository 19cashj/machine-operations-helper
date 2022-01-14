import React, { useState } from 'react';
import { View, Text, StyleSheet, CheckBox, TouchableOpacity } from 'react-native';

export default function WorkOrderScreen({ route, navigation }) {
    const { itemId } = route.params;
    return (
        <View>
            <Text>itemId: {JSON.stringify(itemId)}</Text>      
        </View>
    )
}