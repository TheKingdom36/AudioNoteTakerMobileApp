import React, { useEffect, useState } from 'react';
import { Text, View, Button, Pressable } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { TextInput } from 'react-native-gesture-handler';
import { ScreenNames } from './Navigators';
import { CreateNewRecording } from '../../scripts/AudioRequests';

const ConfirmNewRecordingScreen = (props) => {

    const [currentPositionSec, setCurrentPositionSec] = useState(0);
    const [currentDurationSec, setCurrentDurationSec] = useState(0);
    const [playTime, setPlayTime] = useState('00:00:00');
    const [duration, setDuration] = useState('00:00:00');
    const [audioRecorderPlayer, setAudioRecorderPlayer] = useState(new AudioRecorderPlayer());


    const [title, setTitle] = useState("");
    const [describtion, setDescribtion] = useState("");
    const [tags, setTags] = useState([]);

    const onStartPlay = async (e) => {
        console.log('onStartPlay');

        const msg = await audioRecorderPlayer.startPlayer(props.route.params.path);
        audioRecorderPlayer.setVolume(1.0);
        console.log(msg);
        audioRecorderPlayer.addPlayBackListener((e) => {
            if (e.currentPosition === e.duration) {
                console.log('finished');
                audioRecorderPlayer.stopPlayer();
            }

            setCurrentPositionSec(e.currentPosition);
            setCurrentDurationSec(e.duration);
            setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition),));
            setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
        });
    };

    const onConfrim = () => {

        let audioData = {
            title: title,
            describtion: describtion,
            tags: tags
        }


        CreateNewRecording(props.route.params.path, audioData);

        props.navigation.navigate(ScreenNames.Home);
    }

    return (
        <View style={{ flex: 1 }}>
            <Text>{props.route.params.data}</Text>

            <Pressable style={{ backgroundColor: "red   ", flex: 1, justifyContent: "center", alignItems: "center" }} onPress={() => onStartPlay()}>

                <Text>Hear Recording</Text>

            </Pressable>

            <Text>{playTime}/{duration}</Text>

            <TextInput
                onChangeText={setTitle}
                value={title}
                placeholder="title..."
            />
            <TextInput
                onChangeText={setDescribtion}
                value={describtion}
                placeholder="describtion..."
            />
            <Text>Tags</Text>


            <Pressable style={{ backgroundColor: "red   ", flex: 1, justifyContent: "center", alignItems: "center" }} onPress={() => onConfrim()}>

                <Text>Confirm</Text>

            </Pressable>
        </View>);
}

export default ConfirmNewRecordingScreen;