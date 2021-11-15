import React from 'react';
import { Text, View, Button } from 'react-native';
import { useSelector } from 'react-redux';



const RecordingInfoScreen = ({ route }) => {


    const audioId = route.params.audioId

    const audioInfo = useSelector((state) => {
        return state.audioRecs.values.find((element) => element.id == audioId)
    })

    const onCreateTranscriptPressed = () => {
        console.log("Button Pressed")
    }

    console.log("props", audioInfo)

    return (
        <View>
            <Text>{audioInfo.title}</Text>

            <Button title="Create transcript" onPress={onCreateTranscriptPressed} />

            <Text>View Recording Screen</Text>
        </View>
    );
};

export default RecordingInfoScreen;