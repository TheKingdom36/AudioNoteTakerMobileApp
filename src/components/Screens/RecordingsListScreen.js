import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import FilterSection from '../organisms/FilterSection';
import PanelList from '../organisms/PanelList';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateRecList, clearAudioRecs, fetchAudioRecs } from '../../AudioRecsSlice';


function RecordingsListScreen({ navigation }) {

  const [filteredAudioIds, setFilteredAudioIds] = useState([]);

  const audioIds = useSelector((state) => {
    const ids = [];
    state.audioRecs.values.forEach(element => {
      ids.push(element.id);
    }
    );

    return ids;
  })


  let isFocused = useIsFocused();

  const dispatch = useDispatch();
  const onFilter = (filterData) => {
    //filteredAudioIds.push(data);

    //setFilteredAudioIds(filteredAudioIds);



    fetchAudioRecs(Array.from(filterData.tags), filterData.title, filterData.startDate, filterData.endDate)
      .then(response => {
        dispatch(clearAudioRecs());
        dispatch(addRecList(response))
      })
      .catch(error => "Error " + error);

  }

  useEffect(() => {


    fetchAudioRecs()
      .then(response => {

        dispatch(updateRecList(response))
      })
      .catch(error => "Error " + error);
  }, [isFocused]);

  return (

    <View behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container} >

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View style={styles.container}>
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
    backgroundColor: "#fcc57e"
  },
  inner: {
    flex: 1,
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
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },

  filterSection: {
    flex: 1,
    paddingTop: 20

  },
  listSection: {
    flex: 4,
    paddingTop: 40,
  }
});

export default RecordingsListScreen;
