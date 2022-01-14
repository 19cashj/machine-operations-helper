import React, { useState } from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkOrderListScreen from './WorkOrderListScreen';
import WorkOrderScreen from './WorkOrderScreen';
import WorkOrderCreateScreen from './WorkOrderCreateScreen'
import WorkOrderShapeScreen from './WorkOrderShapeScreen';

const Stack = createNativeStackNavigator();

export default function WorkOrderTrackerScreen() {
    return (
        <Stack.Navigator initialRouteName="WorkOrderList" screenOptions={{headerShown: false}}>        
            <Stack.Screen name="WorkOrderList" component={WorkOrderListScreen} options={{ title: 'Work Order Tracker' }} initialParams={{ icon: undefined, shape: undefined, quantity: undefined, material: undefined, length: undefined, width: undefined, identifier: undefined }}/>
            <Stack.Screen name="WorkOrder" component={WorkOrderScreen} options={{ title: 'Work Order' }} />
            <Stack.Screen name="WorkOrderCreate" component={WorkOrderCreateScreen} options={{ title: 'Work Order Creation' }} initialParams={{ icon: undefined, shape: undefined, quantity: undefined, material: undefined, length: undefined, width: undefined, identifier: undefined }}/>
            <Stack.Screen name="WorkOrderShape" component={WorkOrderShapeScreen} options={{ title: 'Shape Selection' }} initialParams={{ icon: undefined, shape: undefined }}/>
        </Stack.Navigator>
    );
}