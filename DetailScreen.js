import React, { useState,useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DeleteConfirmationModal from './DeleteConfirmationModal';

function VideoCall({ setIsVideoCallActive,callHistory,setCallHistory }) { 


const calculateDeclineCall =()=>{
   const newDeclineEntry = { id: callHistory.length + 1, time: new Date().toLocaleTimeString() };
   setCallHistory([...callHistory,newDeclineEntry])
}

 

  return (
    <View style={styles.videoCallContainer}>
      <Text style={styles.videoCallText}>Video Call</Text>
      <TouchableOpacity onPress={() => {
       calculateDeclineCall();
      setIsVideoCallActive(false)
      }}>
        <Text style={styles.backToChatText}>Decline Call</Text>
      </TouchableOpacity>
    </View>
  );
}

const History = ({ setIsHistory,callHistory }) => {
  return (
    <View style={styles.historyContainer}>
    <Text style={styles.videoCallText}>Declined Calls</Text>

      <FlatList
        data={callHistory}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text>Declined Call #{item.id} at {item.time} </Text>
          </View>
        )}
      />
      <TouchableOpacity onPress={() =>setIsHistory(false)} >
        <Text style={styles.historyText}>Go back to Chat</Text>
      </TouchableOpacity>
    </View>
  );
};


//Main component..
const DetailsScreen = ({ route, navigation }) => {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [isHistory, setIsHistory] = useState(false);
  const [callHistory,setCallHistory] = useState([]); 
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const { name } = route.params;

  navigation.setOptions({ headerShown: false });

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { type: 'text', content: input }]);
      setInput('');
    }
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMessages([...messages, { type: 'image', content: result.assets[0].uri }]);
    }
  };
  const videoCallPage = () => {
    setIsVideoCallActive(true);
  };
  const callHistoryFunction = () => {
    setIsHistory(true);
  };


 const handleLongPress =(id)=>{
  setSelectedMessageId(id);
  setModalVisible(true);
 }
 
 
 const handleDelete = ()=>{
 setMessages((prevemsg)=>prevemsg.filter((msg)=> msg.id !== selectedMessageId));
 setModalVisible(false);
}

 const handleCancel =()=>{
   setModalVisible(false);
 }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isVideoCallActive ? (
        <VideoCall setIsVideoCallActive={setIsVideoCallActive} callHistory={callHistory} setCallHistory={setCallHistory} />
      ) : isHistory ? (
        <History setIsHistory={setIsHistory}  callHistory={callHistory}/>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back" 
                size={24}
                color="black"
                style={styles.backIcon}
              />
            </TouchableOpacity>

            <View style={styles.headerTitleContainer}>
              <Text style={styles.nameText}>{name}</Text>
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={callHistoryFunction}>
                  <Ionicons
                    name="call"
                    size={24}
                    color="gray"
                    style={styles.icon}
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={videoCallPage}>
                  <Ionicons
                    name="videocam"
                    size={24}
                    color="gray"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <FlatList
            style={styles.messageContainer}
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
               
            <Pressable onLongPress={() => handleLongPress(item.id)}>
              <View style={styles.messageBubble}>
                {item.type === 'text' ? (
                  <Text style={styles.displayText}>{item.content}</Text>
                ) : (
                  <Image
                    source={{ uri: item.content }}
                    style={styles.imageCss}
                  />
                )}
              </View>
            </Pressable>
          
          )}
          />
         {modalVisible && <DeleteConfirmationModal  visible={modalVisible} onDelete={handleDelete} onCancel={handleCancel}  />}

          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={pickImage}>
              <Ionicons
                name="add-circle-outline"
                size={24}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.inputText}
              placeholder="Enter your message here"
              value={input}
              onChangeText={setInput}
            />
            <TouchableOpacity>
              <Ionicons name="mic" size={24} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSendMessage}>
              <Ionicons name="send" size={24} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  videoCallText: {
    fontSize: 20,  
    fontWeight: 'bold',  
    textAlign: 'center',  
    color: '#333', 
  },
    historyItem:{
    padding: 15, 
    marginVertical: 5,  
    borderRadius: 10,  
  },
  videoCallContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backToChatText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  videoCallText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  historyContainer: {
    marginTop:'20%', 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyText: {
    color: 'red',
    textDecorationLine: 'underline',
  },
  headerContainer: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    marginTop: '15%',
  },
  backIcon: {
    marginRight: 10,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageContainer: {
    flex: 1,
  },
  messageBubble: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    alignSelf: 'flex-start',
  },
  displayText: {
    fontSize: 16,
    color: '#333333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 20,
    marginHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  icon: {
    marginHorizontal: 5,
    color: '#888888',
  },
  imageCss: {
    width: 100,
    height: 100,
    padding: 0,
  },
});

export default DetailsScreen;
