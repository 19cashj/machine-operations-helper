import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SmallButton from './SmallButton';

export default function WorkOrderNoticeScreen({ route, navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Notice:</Text>
            <Text style={styles.text}>The Work Order Tracker is strictly a "proof of concept" feature and should only be utilized in this intended manner.</Text>
            <Text style={styles.text}>Private information regarding real world parts should not be inputted. Saving orders has been disabled in this regard.</Text>
            <SmallButton label={'Accept'} pressFunction={() => navigation.navigate('WorkOrderList')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#c3c3c3',
      justifyContent: 'center',
      alignItems: 'center'
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        padding: 20
    },
    text: {
        fontSize: 18,
        padding: 16,
        textAlign: 'center'
    },
});