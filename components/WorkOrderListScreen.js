import React, { useRef, useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, Keyboard, Touchable, ScrollView } from 'react-native';
import WorkOrderListItem from './WorkOrderListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

export default function WorkOrderListScreen({ route, navigation }) {
  const { icon, shape, quantity, material, length, width, identifier, instructions } = route.params;
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState(false);

  async function setAsyncStore(ordersArray) {  
    await AsyncStorage.setItem('Orders', JSON.stringify(ordersArray))
  }

  const getAsyncStore = async () => { 
      const res = await AsyncStorage.getItem('Orders')
      const parsed = JSON.parse(res);
      if(Object.keys(parsed).length !== 0) {
        setOrders(parsed)
      }
  }

  useEffect(() => {
    const load = navigation.addListener('focus', () => {
      (async () => {
        await getAsyncStore()
      })()
    });
    return load;
  }, [navigation]);

  function deleteOrder(index) {
    let ordersCopy = [...orders];
    ordersCopy.splice(index, 1);
    setOrders(ordersCopy);
    setAsyncStore(ordersCopy);
  }

  return (
      <View style={styles.container}>
          <View style={styles.tasksWrapper}>
            <ScrollView style={styles.scrollLimiter}>
              {orders.map((orderObject, index) => {
                return ( 
                  <WorkOrderListItem key={index} icon={orderObject.icon} id={orderObject.identifier} delete={deleteOrder} index={index} press={() => navigation.navigate('WorkOrder', {icon: orderObject.icon, shape: orderObject.shape, quantity: orderObject.quantity, material: orderObject.material, length: orderObject.length, width: orderObject.width, identifier: orderObject.identifier, instructions: orderObject.instructions})}></WorkOrderListItem>
                )
              })}
            </ScrollView>
          </View>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : "height"} style={styles.taskInputWrapper}>
            <TouchableOpacity onPress={() => navigation.navigate('WorkOrderCreate', { icon: undefined, shape: undefined, quantity: undefined, material: undefined, length: undefined, width: undefined, identifier: undefined })}>
              <View style={styles.addTaskWrapper}>
                <Text>+</Text>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c3c3c3',
    fontSize: 12
  },
  tasksWrapper: {
    paddingTop: 30,
    paddingHorizontal: 20
  },
  taskInputWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    padding: 15,
    width: 250,
    backgroundColor: 'white',
    borderRadius: 60,
    borderWidth: 3
  },
  addTaskWrapper: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3
  },
  scrollLimiter: {
    height: 410
  }
});
