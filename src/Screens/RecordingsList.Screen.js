import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import FilterSection from '../Components/FilterSection.component';
import PanelList from '../Components/PanelList.component';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {updateRecList} from '../Utils/AudioRecsSlice';
import {Colors} from '../Utils/Colors';
import AudioApi from '../Utils/ClientApis/AudioApi';
import {white} from 'react-native-paper/lib/typescript/styles/colors';

function RecordingsListScreen({navigation}) {
  const [filteredAudioIds, setFilteredAudioIds] = useState([]);

  const audioIds = useSelector(state => {
    const ids = [];
    state.audioRecs.values.forEach(element => {
      ids.push(element.id);
    });

    return ids;
  });

  let isFocused = useIsFocused();

  const dispatch = useDispatch();
  const onFilter = filterData => {
    //filteredAudioIds.push(data);

    //setFilteredAudioIds(filteredAudioIds);

    console.log('filterData', filterData);

    AudioApi.instance
      .getRecordings(filterData)
      .then(response => {
        dispatch(updateRecList(response));
      })
      .catch(error => 'Error ' + error);
  };

  useEffect(() => {
    AudioApi.instance
      .getRecordings()
      .then(response => {
        dispatch(updateRecList(response));
      })
      .catch(error => 'Error ' + error);
  }, [dispatch, isFocused]);

  return (
    <View
      // eslint-disable-next-line no-undef
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={styles.innerBox}>
        <View>
          <View style={[styles.filterSection]}>
            <FilterSection onSubmit={onFilter} />
          </View>
          <View style={[styles.listSection]}>
            <PanelList audioIds={audioIds} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
    padding: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  filterSection: {
    paddingTop: 5,
    height: '30%',
    minHeight: 200,
    backgroundColor: 'white',
    padding: 10,
  },
  listSection: {
    height: '70%',
  },
});

export default RecordingsListScreen;
