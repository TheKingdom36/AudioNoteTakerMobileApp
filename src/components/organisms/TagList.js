import React from 'react';
import { View, FlatList, StyleSheet, Text, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const TagList = (props) => {

    return (
        <View>
            <Text>Avaiable tags:</Text>
            <FlatList
                data={props.tags}
                keyExtractor={item => item.toString()}
                renderItem={props.tagRenderItemSelect}
            />
        </View>
    )
}

export default TagList;