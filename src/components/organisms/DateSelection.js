import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Modal} from '@ui-kitten/components';

const DateSelection = (onConfirm, onCancel) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [backdropVisible, setBackdropVisible] = React.useState(false);

  return (
    <View>
      <Button title="Change Date" onPress={() => setOpen(true)} />

      <Modal
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setBackdropVisible(false)}
        transparent={false}
        visible={open}
        onRequestClose={() => {
          setOpen(false);
        }}>
        <View style={styles.modalView}>
          <View style={styles.dateSection}>
            <Text>StartDate</Text>

            <DatePicker
              style={[styles.datePicker]}
              fadeToColor="none"
              date={startDate}
              mode="date"
              onDateChange={setStartDate}
            />
          </View>
          <View style={styles.dateSection}>
            <Text>EndDate</Text>

            <DatePicker
              style={[styles.datePicker]}
              date={endDate}
              mode="date"
              fadeToColor="none"
              onDateChange={setEndDate}
            />
          </View>
          <View style={styles.btnTray}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setOpen(!open)}>
              <Text>Close</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setOpen(!open)}>
              <Text>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DateSelection;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    elevation: 2,
    flex: 1,
    borderWidth: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },

  dateSection: {
    backgroundColor: 'white',
  },
  modalView: {
    flex: 1,
    backgroundColor: '#fcc57e',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnTray: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  datePicker: {
    borderRadius: 50,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
