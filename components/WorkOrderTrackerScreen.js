import React, { useState } from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkOrderListScreen from './WorkOrderListScreen';
import WorkOrderScreen from './WorkOrderScreen';
import WorkOrderCreateScreen from './WorkOrderCreateScreen'
import WorkOrderShapeScreen from './WorkOrderShapeScreen';
import WorkOrderNoticeScreen from './WorkOrderNoticeScreen';
import { WorkOrdersContext } from '../contexts/WorkOrdersContext'

const Stack = createNativeStackNavigator();

export default function WorkOrderTrackerScreen() {
    const [orders, setOrders] = useState([]);
    return (
        <WorkOrdersContext.Provider value={{orders, setOrders}}>
          <Stack.Navigator initialRouteName="WorkOrderNotice" screenOptions={{headerShown: false}}>
                <Stack.Screen name="WorkOrderNotice" component={WorkOrderNoticeScreen} options={{ title: 'Disclaimer' }}/>        
                <Stack.Screen name="WorkOrderList" component={WorkOrderListScreen} options={{ title: 'Work Order Tracker' }} initialParams={{ icon: undefined, shape: undefined, quantity: undefined, material: undefined, length: undefined, width: undefined, identifier: undefined, instructions: undefined }}/>
                <Stack.Screen name="WorkOrder" component={WorkOrderScreen} options={{ title: 'Work Order' }} />
                <Stack.Screen name="WorkOrderCreate" component={WorkOrderCreateScreen} options={{ title: 'Work Order Creation' }} initialParams={{ icon: undefined, shape: undefined, quantity: undefined, material: undefined, length: undefined, width: undefined, identifier: undefined, instructions: undefined }}/>
                <Stack.Screen name="WorkOrderShape" component={WorkOrderShapeScreen} options={{ title: 'Shape Selection' }} initialParams={{ icon: undefined, shape: undefined }}/>
            </Stack.Navigator>  
        </WorkOrdersContext.Provider>
    );
}