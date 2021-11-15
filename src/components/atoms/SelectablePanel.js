import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const SelectablePanel = (props) => {

    const onPress = () => {
        props.onSelect({ text: props.text });
    }

    return (
        <View style={containerStyle(props.isSelected)}>
            <Pressable onPress={onPress} >
                <View>
                    <Text style={textStyle(props.isSelected)}>{props.text}</Text>
                </View>
            </Pressable >
        </View >
    );
};


const containerStyle = (isSelected) => {

    let backColor = "";


    if (isSelected) {
        backColor = "#FFA500";
    } else {
        backColor = "white";
    }

    return {
        flex: 1,
        margin: 5,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: "#FFA500",
        width: 250,
        height: 50,
        backgroundColor: backColor,
        justifyContent: 'center',
        alignItems: "center"
    }
}

const textStyle = (isSelected) => {

    let textColor = "";

    if (isSelected) {
        textColor = "white";
    } else {
        textColor = "#FFA500";
    }

    return {
        color: textColor
    }
}

const componentStyle = (isSelected) => {

}

const styles = StyleSheet.create({

});

export default SelectablePanel;
