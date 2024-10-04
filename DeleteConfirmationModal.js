import React from 'react';
import { View, Modal , Text, Button, StyleSheet } from 'react-native';

const DeleteConfirmationModal = ({ visible, onDelete, onCancel }) => {
  return (
    <Modal  transparent={true} animationType="slide" visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.buttonContainer}>
          <Button title="Delete" onPress={()=>onDelete()} />
          <Button title="Cancel" onPress={()=>onCancel()} />
        </View>
      </View>
    </Modal >
  );
};

const styles = StyleSheet.create({
  modalContainer:{
   flex:1,
   justifyContent:'center',
   alignItems:'center',
   backgroundColor: 'rgba(0,0,0,0.5)',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',

  },
});

export default DeleteConfirmationModal;
