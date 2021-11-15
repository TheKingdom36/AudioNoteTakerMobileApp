import { Col, Row, Grid } from "react-native-easy-grid";
import { View, StyleSheet, FlatList } from "react-native";
import React from "react";
import AudioPanel from "../molecules/AudioPanel";
import Player from "./Player";

const FourGrid = ({ audioIds }) => {
    const TRACKS = [

        [{
            title: 'Stresse Out',
            artist: 'Twenty One Pilots',
            audioUrl: 'TestAudio.m4a'
        }],


        [{
            title: 'Stressed Out',
            artist: 'Twenty One Pilots',
            audioUrl: 'TestAudio.m4a'
        }]

    ];

    const renderItem = ({ item }) => <Player tracks={item} />;
    return (



        <View style={[styles.container]}>
            <FlatList
                numColumns={2}
                horizontal={false}
                contentContainerStyle={{ justifyContent: "space-evenly", flex: 1 }}
                data={TRACKS}
                renderItem={renderItem}
                keyExtractor={item => item.title}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },

});



export default FourGrid;