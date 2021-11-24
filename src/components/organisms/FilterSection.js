import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {View, StyleSheet, TextInput} from 'react-native';
import SelectablePanel from '../atoms/SelectablePanel';
import DateSelection from '../organisms/DateSelection';
import ListModel from './TagListModel';
import {Text, List, ButtonGroup, Button, Layout} from '@ui-kitten/components';
import {Colors} from '../../colors';

//add onFilterChange
const FilterSection = ({onSubmit}) => {
  const [titleSearchText, setTitleSearchText] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState(0);
  const [selectedEndDate, setSelectedEndDate] = useState(0);
  const [selectedTags, setSelectedTags] = useState(new Set([]));
  var sTags = Array.from(selectedTags);

  const uniqueTags = useSelector(state => {
    var tempUniqueTags = new Set([]);

    state.audioRecs.values.forEach(element => {
      element.tags.forEach(tag => {
        tempUniqueTags.add(tag);
      });
    });

    return Array.from(tempUniqueTags);
  });

  const [searchText, onChangeSearchText] = React.useState('');

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
      isSelected={selectedTags.has(item)}
      onSelect={addToSelectedList}
      text={item}
    />
  );

  return (
    <Layout style={[styles.container]}>
      <View style={[styles.horizontalSplit]}>
        <View style={[styles.nameSearchSec]}>
          <TextInput
            style={[styles.input]}
            onChangeText={onChangeSearchText}
            value={searchText}
            placeholder="title..."
          />
        </View>
      </View>

      <View style={[styles.horizontalSplit]}>
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
              items={uniqueTags}
              buttonText="Add Tag"
              title="Avaiable Tags"
            />
          </View>
        </View>
      </View>

      <View style={[styles.horizontalSplit]}>
        <View style={[styles.dateSearchSec]}>
          <DateSelection />
        </View>
      </View>

      <ButtonGroup style={styles.btnGroup}>
        <Button style={[styles.button]} onPress={() => onReset()}>
          Reset
        </Button>

        <Button
          style={[styles.button]}
          onPress={() =>
            onSubmit({
              title: titleSearchText,
              tags: selectedTags,
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
    minHeight: 150,
    backgroundColor: '#FFA500',
  },
  titleSec: {
    flex: 1,
  },
  tagFilterSec: {
    flex: 3,
    justifyContent: 'center',
  },
  dateSearchSec: {
    flex: 1,
  },
  nameSearchSec: {
    flex: 1,
    minHeight: 60,
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
    borderWidth: 2,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    maxHeight: 30,
  },

  horizontalSplit: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
  },
  button: {
    elevation: 2,
    flex: 1,
    borderWidth: 10,
    padding: 10,
  },
  btnGroup: {},
  input: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    flex: 1,
    alignSelf: 'stretch',
  },
});

export default FilterSection;
