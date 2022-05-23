import React, {useState} from 'react';
import {ScrollView, Pressable, View} from 'react-native';
import {StyleService, Text, useStyleSheet} from '@ui-kitten/components';
import {Colors} from '../Utils/Colors';
import AudioDetails from '../Components/AudioDetails.component';
import TranscribeCard from '../Components/TranscribeAudio.component';
import {useSelector} from 'react-redux';
import AudioPlayer from '../Components/Player.component';
import Entypo from 'react-native-vector-icons/Entypo';
import {ScreenNames} from './MainNavigator';
import ExpandableComponent from '../Components/Expandabel.component';

const AudioInfo = ({route, navigation}) => {
  const styles = useStyleSheet(themedStyles);
  const [data, setData] = useState(content);

  const audioId = route.params.audioId;

  const audioInfo = useSelector(state => {
    return state.audioRecs.values.find(element => element.id === audioId);
  });

  const onClick = () => {
    console.log('new Data', data);
    let ne = data;
    if (data.isExpanded) {
      data.isExpanded = false;
    } else {
      data.isExpanded = true;
    }

    setData(data);
  };

  const DangerZone = ({style}) => {
    return (
      <View style={style}>
        <ExpandableComponent
          key={data.category_name}
          item={data}
          onClickFunction={() => {
            onClick(data.category_name);
          }}
        />
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View>
        <Pressable
          style={styles.cancel}
          onPress={() => navigation.navigate(ScreenNames.Home)}>
          <Entypo name="cross" size={50} />
        </Pressable>
        <Text style={styles.titleText} category="h1">
          {audioInfo.name}
        </Text>
        <AudioPlayer
          style={styles.section}
          audioUrl={'default audioUrl'}
          audioId={audioId}
        />
        <AudioDetails style={styles.section} data={audioInfo} />

        <TranscribeCard style={styles.section} data={audioInfo} />
        <DangerZone style={styles.section} />
      </View>
    </ScrollView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },

  titleText: {
    paddingLeft: 10,
  },
  section: {
    backgroundColor: Colors.secondaryColor,
    margin: 10,
    padding: 10,
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
  },

  audioPlayerControls: {},
  audioDetails: {},

  transcribe: {},
  dangerZone: {},
  contentContainer: {
    paddingVertical: 24,
  },
  detailsList: {
    alignSelf: 'center',
    marginVertical: 24,
  },
  descriptionLabel: {
    margin: 16,
  },
  sectionLabel: {
    marginHorizontal: 16,
  },
  buyButton: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  cancel: {alignItems: 'flex-end', paddingRight: 20, paddingTop: 20},
});

let content = {
  isExpanded: false,
  category_name: 'Item 1',
  content: <Text>Hello</Text>,
};

export default AudioInfo;
