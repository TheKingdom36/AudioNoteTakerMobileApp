import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';


const LabeledText = ({
    text,
    textColor,
    label,
    labelColor,
    fontSize
}) => {
    return (
        <View style={[styles.container]}>
            <Text style={[{ fontSize, color: labelColor }]}>{label}</Text>
            <Text>: </Text>
            <Text style={[{ fontSize, color: textColor }]}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    }
});

export default LabeledText;
