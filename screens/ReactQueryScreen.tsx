import React from 'react';
import { QueryClient } from 'react-query';
import { StyleSheet, Text, View } from 'react-native';

const reactQueryClient = new QueryClient();

export default function ReactQueryScreen() {
    return (
        <View style={styles.container}>
            <Text>ReactQuery</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})  