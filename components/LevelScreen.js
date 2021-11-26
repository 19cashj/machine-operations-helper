import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';

function round(n) {
    if (!n) {
      return 0;
    }
      return Math.abs((Math.floor(n * 100) / 100).toFixed(0));
  }
  
  export default function LevelScreen() {
    const [data, setData] = useState({
      z: 0,
    });

    const [subscription, setSubscription] = useState(null);

    const _zero = () => {
      setData({z:0})
    }

    const _subscribe = () => {
      setSubscription(
        Gyroscope.addListener(gyroscopeData => {
          setData(prev => {
            return {z: prev.z += gyroscopeData.z}
          });
        })
      );
    };
  
    const _unsubscribe = () => {
      subscription && subscription.remove();
      setSubscription(null);
    };
  
    useEffect(() => {
      Gyroscope.setUpdateInterval(16);
      _subscribe();
      return () => _unsubscribe();
    }, []);
  
    const { z } = data;
    return (
      <View style={styles.container}>
        <Text style={styles.degrees}>
          {round(z)}°
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
            <Text>{subscription ? 'On' : 'Off'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_zero} style={styles.button}>
            <Text>Zero</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 10,
      transform: [{ rotate: "90deg" }],
    },
    degrees: {
      textAlign: 'center',
      fontSize: 40
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'stretch',
      marginTop: 15,
    },
    button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#eee',
      padding: 10,
    },
    middleButton: {
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: '#ccc',
    },
  });
  