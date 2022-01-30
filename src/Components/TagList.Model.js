import React, {useState} from 'react';
import {View, Text, Pressable, Button, StyleSheet} from 'react-native';
import {Modal, List} from '@ui-kitten/components';

const ListModel = props => {
  const [displayList, setDisplayList] = useState(false);
  const [backdropVisible, setBackdropVisible] = React.useState(false);

  return (
    <View>
      <Button title={props.buttonText} onPress={() => setDisplayList(true)} />

      <Modal
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setBackdropVisible(false)}
        transparent={true}
        visible={displayList}
        onRequestClose={() => {
          setDisplayList(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>{props.title}</Text>
            <List
              data={props.items}
              keyExtractor={item => item.toString()}
              renderItem={props.renderItemSelect}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setDisplayList(!displayList)}>
              <Text>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default ListModel;
