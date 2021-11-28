import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';
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

    const rotation = useRef(new Animated.Value(0)).current;
    const rotationInter = rotation.interpolate({
      inputRange: [-90, 90],
      outputRange: ['-90deg', '90deg'],
    });
    useEffect(() => {
      Animated.timing(rotation, {
        duration: 1,
        toValue: data.z,
        useNativeDriver: true
      }).start();
    }, [data])

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

    return (
      <View style={styles.container}>
        <Text style={styles.degrees}>
          {round(data.z)}°
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
            <Text>{subscription ? 'On' : 'Off'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_zero} style={styles.button}>
            <Text>Zero</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.trackerParent}>
          <Animated.View style={{
            top: '15%',
            width: 10,
            height: 50,
            backgroundColor: 'red',
            alignSelf: 'center',
            borderRadius: 5,
            transform: [{rotate: rotationInter}]
          }}/>
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
    trackerParent: {
      width: 80,
      height: 80,
      borderWidth: 5,
      alignSelf: 'center',
      borderRadius: 90,
      top: 30
    },
  });
  