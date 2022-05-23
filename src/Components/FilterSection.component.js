import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {View, StyleSheet, TextInput} from 'react-native';
import SelectablePanel from '../Elements/SelectablePanel';
import DateSelection from './DateSelection.component';
import ListModel from './List.Model';
import {Text, List, ButtonGroup, Button, Layout} from '@ui-kitten/components';
import {Colors} from '../Utils/Colors';

//add onFilterChange
const FilterSection = ({onSubmit}) => {
  const [titleSearchText, setTitleSearchText] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState('any');
  const [selectedEndDate, setSelectedEndDate] = useState(0);
  const [selectedTags, setSelectedTags] = useState(new Set([]));
  var sTags = Array.from(selectedTags);

  const uniqueTags = useSelector(state => {
    var tempUniqueTags = new Set([]);

    state.audioRecs.values.forEach(element => {
      element.tags.forEach(tag => {
        tempUniqueTags.add(tag.name);
      });
    });

    return Array.from(tempUniqueTags);
  });

  function onReset() {
    setSelectedTags(new Set([]));
    setTitleSearchText('');
    setSelectedStartDate(0);
    setSelectedEndDate(0);
  }

  const addToSelectedList = data => {
    const tags = new Set(selectedTags);

    if (selectedTags.has(data.text)) {
      //remove the tag
      tags.delete(data.text);
    } else {
      //add the tag
      tags.add(data.text);
    }

    setSelectedTags(tags);
  };

  const tagRenderItem = ({item}) => (
    <View style={[styles.tagSec]}>
      <Text>{item}</Text>
    </View>
  );
  const tagRenderItemSelect = ({item}) => (
    <SelectablePanel
      styles={{width: '50%'}}
      isSelected={selectedTags.has(item)}
      onSelect={addToSelectedList}
      text={item}
    />
  );

  return (
    <Layout style={[styles.container]}>
      <View style={[styles.nameSearchSec]}>
        <TextInput
          style={[styles.input]}
          onChangeText={setTitleSearchText}
          value={titleSearchText}
          placeholder="Title to search..."
        />
      </View>

      <View style={[styles.tagFilterSec]}>
        <View style={{flexDirection: 'row'}}>
          {sTags.size <= 0 ? null : (
            <List
              contentContainerStyle={[styles.tagList]}
              horizontal={true}
              data={sTags}
              keyExtractor={item => item.toString()}
              renderItem={tagRenderItem}
            />
          )}
          <ListModel
            renderItemSelect={tagRenderItemSelect}
            modelStyle={{width: '80%'}}
            items={uniqueTags}
            buttonText="Add Tag"
            title="Avaiable Tags"
          />
        </View>
      </View>

      <View style={[styles.dateSearchSec]}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <Text>{selectedStartDate}</Text>
          <Text> to</Text>
          <Text>{selectedEndDate}</Text>
        </View>

        <DateSelection />
      </View>

      <ButtonGroup appearance="outline" style={[styles.bottomButtons]}>
        <Button style={[styles.button]} onPress={() => onReset()}>
          Reset
        </Button>

        <Button
          style={[styles.button]}
          status="info"
          onPress={() =>
            onSubmit({
              title: titleSearchText,
              tags: Array.from(selectedTags),
              startDate: selectedStartDate,
              endDate: selectedEndDate,
            })
          }>
          Confirm
        </Button>
      </ButtonGroup>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tagFilterSec: {
    height: '20%',
    justifyContent: 'center',
  },
  dateSearchSec: {
    height: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  bottomButtons: {
    height: '20%',
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  nameSearchSec: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  tagSec: {
    flex: 2,
    margin: 2,
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: 'center',
    maxHeight: 30,
  },
  button: {
    flex: 1,
  },
  input: {
    height: 100,
    flex: 1,
    alignSelf: 'stretch',
  },
  dateSelection: {alignItems: 'flex-end'},
});

export default FilterSection;
