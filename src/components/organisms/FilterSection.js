
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Text, TextInput, Button, Pressable, Image, FlatList, Modal } from 'react-native';
import SelectablePanel from '../atoms/SelectablePanel';
import TagList from "../organisms/TagList";
import DateSelection from "../organisms/DateSelection"
import TagListModel from './TagListModel';

//add onFilterChange
const FilterSection = ({
  onSubmit }) => {
  const [titleSearchText, setTitleSearchText] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState(0);
  const [selectedEndDate, setSelectedEndDate] = useState(0);
  const [selectedTags, setSelectedTags] = useState(new Set([]));
  const uniqueTags = useSelector((state) => {
    var tempUniqueTags = new Set([]);

    state.audioRecs.values.forEach(element => {
      element.tags.forEach(tag => {
        tempUniqueTags.add(tag);
      })
    });

    return Array.from(tempUniqueTags)
  });

  const audioData = useSelector((state) => state.audioRecs.values);

  const [searchText, onChangeSearchText] = React.useState("");


  function onReset() {
    setSelectedTags(new Set([]));
    setTitleSearchText("");
    setSelectedStartDate(0);
    setSelectedEndDate(0);
  }

  const addToSelectedList = (data) => {
    const tags = new Set(selectedTags);

    if (selectedTags.has(data.text)) {
      //remove the tag
      tags.delete(data.text);
    } else {
      //add the tag
      tags.add(data.text);
    }

    setSelectedTags(tags);
  }

  const tagRenderItem = ({ item }) => <View style={[styles.tagSec]}><Text>{item}</Text></View>;
  const tagRenderItemSelect = ({ item }) => <SelectablePanel isSelected={selectedTags.has(item)} onSelect={addToSelectedList} text={item} />;

  var sTags = Array.from(selectedTags);

  return (
    <View style={[styles.container]}>



      <View style={[styles.horizontalSplitOne]}>
        <View style={[styles.nameSearchSec]}>
          <TextInput
            style={[styles.input]}
            onChangeText={onChangeSearchText}
            value={searchText}
            placeholder="title..."
          />

        </View>
      </View>

      <View style={[styles.horizontalSplitTwo]}>

        <View style={[styles.tagFilterSec]}>
          <View style={{ flexDirection: "row" }}>
            {sTags.size <= 0 ? null :
              <FlatList
                contentContainerStyle={[styles.tagList]}
                horizontal={true}
                data={sTags}
                keyExtractor={item => item.toString()}
                renderItem={tagRenderItem}
              />
            }
            <TagListModel tagRenderItemSelect={tagRenderItemSelect} tags={uniqueTags} />
          </View>


        </View>
        <View style={[styles.dateSearchSec]}>
          <DateSelection />
        </View>
      </View>


      <View style={styles.btnTray}>
        <View style={{ flex: 1 }}>
          <Button
            title={"Reset"}
            style={[styles.button, styles.buttonClose]}
            onPress={() => onReset()}
          /></View>
        <View style={{ flex: 1 }}>
          <Button
            title={"Confirm"}
            style={[styles.button, styles.buttonClose]}
            onPress={() => onSubmit({ title: titleSearchText, tags: selectedTags, startDate: selectedStartDate, endDate: selectedEndDate })}
          />

        </View>
      </View>

    </View>

  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    minHeight: 150,
    backgroundColor: "#FFA500"
  },
  row: {
    flexDirection: "row",
    justifyContent: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  tagList: {
    justifyContent: 'space-between'
  },
  modalView: {


    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

  },

  titleSec: {
    flex: 1,
  },
  titleText: {
    fontSize: 50
  },
  tagSec: {
    flex: 2,
    borderWidth: 2,
    maxHeight: 30
  },
  tagFilterSec: {
    flex: 3,
    justifyContent: 'center'
  },
  dateSearchSec: {
    flex: 1,
  },
  nameSearchSec: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  horizontalSplitOne: {
    flex: 1,
  },
  horizontalSplitTwo: {
    flex: 1,
    flexDirection: "row",
  },
  button: {
    elevation: 2,
    flex: 1,
    borderWidth: 10,
    padding: 10
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  btnTray: {
    flexDirection: "row",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    flex: 1,
    alignSelf: "stretch"
  },

});

export default FilterSection;
