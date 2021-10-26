import React from 'react';
import { Context } from '../Context'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ConversionScreen } from './ConversionScreen';
import { AngleScreen } from './AngleScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export function CalculatorsScreen({ navigation }) {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
    
              if (route.name === 'Conversions') {
                iconName = focused
                  ? 'code-working'
                  : 'code-working-outline';
              } else if (route.name === 'Angles') {
                iconName = focused ? 'triangle' : 'triangle-outline';
              }
    
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#2d2d2d',
            tabBarInactiveTintColor: 'gray',
          })}>
          <Tab.Screen name="Conversions" component={ConversionScreen} options={{ headerShown: false }} />
          <Tab.Screen name="Angles" component={AngleScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
      );
}