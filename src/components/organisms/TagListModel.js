import React, { useState } from 'react';
import { View, Text, Pressable, Button, FlatList, Modal, StyleSheet } from 'react-native';



const TagListModel = (props) => {

    const [displayTagList, setDisplayTagList] = useState(false);


    return (
        <View>
            <Button title="AddTag" onPress={() => setDisplayTagList(true)} />

            <Modal
                animationType="slide"
                transparent={true}
                visible={displayTagList}
                onRequestClose={() => {
                    setDisplayTagList(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Avaiable tags:</Text>
                        <FlatList
                            data={props.tags}
                            keyExtractor={item => item.toString()}
                            renderItem={props.tagRenderItemSelect}
                        />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setDisplayTagList(!displayTagList)}
                        >
                            <Text>Close</Text>

                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    tagList: {
        justifyContent: 'space-between',
        padding: 2
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
})

export default TagListModel;