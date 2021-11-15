import { TestScheduler } from '@jest/core';
import React, { useEffect, useState } from 'react';
import { Text, View, Button, Pressable, Image } from 'react-native';
import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import { RequestRecordPermissions } from "../../scripts/PermissionRequests";
import { ScreenNames } from './Navigators';



const NewRecordingScreen = ({ navigation }) => {

    const [isRecording, setIsRecording] = useState(false);
    const [hasActiveRecording, setHasActiveRecording] = useState(false);
    const [recordTime, setRecordTime] = useState('00:00:00');
    const [recordSecs, setRecordSecs] = useState(0);


    const [audioRecorderPlayer, setAudioRecorderPlayer] = useState(new AudioRecorderPlayer());


    const onStartRecord = async () => {

        if (hasActiveRecording == true) {
            console.log("Resume");
            audioRecorderPlayer.resumeRecorder();
            const uri = await audioRecorderPlayer.resumeRecorder();
        } else {

            RequestRecordPermissions();

            var RNFS = require('react-native-fs');

            const path = RNFS.DocumentDirectoryPath + '/' + "temp.m4a";

            const audioSet = {
                AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
                AudioSourceAndroid: AudioSourceAndroidType.MIC,
                AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
                AVNumberOfChannelsKeyIOS: 2,
                AVFormatIDKeyIOS: AVEncodingOption.aac,
            };

            const uri = await audioRecorderPlayer.startRecorder(path, audioSet);

            audioRecorderPlayer.addRecordBackListener((e) => {
                setRecordSecs(e.currentPosition);
                setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
            });

            setHasActiveRecording(true);

        };

        setIsRecording(true);

    };

    const onStopRecord = async () => {
        const result = await audioRecorderPlayer.stopRecorder();

        audioRecorderPlayer.removeRecordBackListener();

        setRecordSecs(0);

        setIsRecording(false);

        var RNFS = require('react-native-fs');

        const path = RNFS.DocumentDirectoryPath + '/temp.m4a';

        setHasActiveRecording(false);

        navigation.navigate(ScreenNames.ConfirmNewRecording, { path: path });
    };

    const onPauseRecord = async () => {
        setIsRecording(false);
        audioRecorderPlayer.pauseRecorder();
    };


    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                {isRecording == true ?
                    (<Pressable onPress={() => onPauseRecord()}>

                        <Image source={require('../../img/resizedSmallSearchIcon.png')} />

                    </Pressable>
                    )
                    : (<Pressable onPress={() => onStartRecord()}>

                        <Image source={require('../../img/recordIcon.jpg')} />

                    </Pressable>
                    )}
            </View>
            <Text>{recordTime}</Text>
            <Pressable style={{ backgroundColor: "green", flex: 1, justifyContent: "center", alignItems: "center" }} onPress={() => onStopRecord()}>

                <Text>Finish</Text>

            </Pressable>



        </View>
    );
};

export default NewRecordingScreen;