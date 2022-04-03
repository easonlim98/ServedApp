import React, { Component, useReducer, useState, useEffect, useRef, useCallback } from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  RefreshControl,
  Alert,
  Modal,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Colors from "../constant/Colors";
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CommonStore } from '../../store/CommonStore';
import moment from 'moment';
import { collection, onSnapshot, query, addDoc, where, getDocs, Timestamp, setDoc } from 'firebase/firestore'
import db from '../../constants/firebaseConfig';
import { useFocusEffect } from '@react-navigation/native';
import { CollectionFunc } from '../../util/CommonFunc';
import Foundation from 'react-native-vector-icons/Foundation';
import {Picker} from '@react-native-picker/picker';

const ChatScreen = (props) => {

const { navigation, route } = props;


useEffect(() => {
navigation.setOptions({
  headerLeft: () => (
    <TouchableOpacity style={{
    }} 
    onPress={() => { props.navigation.goBack();
    }}>
      <View style={{
        justifyContent: 'center',
        paddingLeft: 0,
      }}>
        <Feather
          name="arrow-left"
          size={24}
          color={Colors.black}
          style={{
          }}
        />
      </View>
  </TouchableOpacity>
  ),
  headerTitle: () => (
    <View style={{
      justifyContent: 'center',
    }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: Colors.black,
        }}>
        Message
      </Text>
    </View>
  ),
  headerRight: () => (
    <TouchableOpacity style={{
    }} 
    onPress={() => {
      navigation.navigate('ChatMessageScreen')
    }}>
      <View style={{
        justifyContent: 'center',
        paddingLeft: 5,
      }}>
        <Ionicons
          name='send'
          size={24}
          color={Colors.black}
          style={{
          }}
        />
      </View>
  </TouchableOpacity>
  ),
});
})

useEffect(() => {
  if(props){
    CollectionFunc(userID);
  }
})

useEffect(() => {

  var tempSend = [];
  var tempReceive = [];

  for(var x = 0; x < chatList.length; x++){
    if(chatList[x].sender === userID){
      const record = chatList[x]
      tempSend.push(record)
    }
  }

  setSendList(tempSend);

  for(var x = 0; x < chatList.length; x++){
    if(chatList[x].receiver === userID){
      const record = chatList[x]
      tempReceive.push(record)
    }
  }

  setSendList(tempSend);
  setReceiverList(tempReceive)

},[chatList, userID])

const renderChatReceivedList = ({ item, index }) => {

  var user = [];

  for(var x = 0; x < userDetails.length; x++){

    if(userDetails[x].uniqueID === item.sender){
      user.push(userDetails[x])
    }

  }

  return(
    <View style={{ paddingHorizontal: 15, paddingVertical: 5, alignItems: 'center' }}>
      <View
        style={{ 
          width: Dimensions.get('screen').width * 0.85,
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 20,
          backgroundColor: Colors.secondaryColor,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
        }}
      >
        <View style={{  }}>
          <Text style={{ fontWeight: 'bold' }}>MESSAGE:</Text>
        </View>
        <View style={{  }}>
          <Text>{item.message}</Text>
        </View>
        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingTop: 10, }}>
          <Text style={{ fontSize: 10 }}>{moment(item.createdAt).format('DD-MM-YYYY HH:MM')}</Text>
          { user.map((name) => {
            return(
              <>
              {name.uniqueID === item.sender ?
              <Text>Sent from: {name.userName}</Text>
              :
              null
              }
              </>
            )
            })
          }
        </View>
      </View>
    </View>
  )

}

const renderChatSentList = ({ item, index }) => {

  var user = [];

  for(var x = 0; x < userDetails.length; x++){

    if(userDetails[x].uniqueID === item.receiver){
      user.push(userDetails[x])
    }

  }

  return(
    <View style={{ paddingHorizontal: 15, paddingVertical: 5, alignItems: 'center' }}>
      <View
        style={{ 
          width: Dimensions.get('screen').width * 0.85,
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 20,
          backgroundColor: Colors.secondaryColor,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
        }}
      >
        <View style={{  }}>
          <Text style={{ fontWeight: 'bold' }}>MESSAGE:</Text>
        </View>
        <View style={{  }}>
          <Text>{item.message}</Text>
        </View>
        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingTop: 10, }}>
          <Text style={{ fontSize: 10 }}>{moment(item.createdAt).format('DD-MM-YYYY HH:MM')}</Text>
          { user.map((name) => {
            return(
              <>
              {name.uniqueID === item.receiver ?
              <Text>Sent to: {name.userName}</Text>
              :
              null
              }
              </>
            )
            })
          }
        </View>
      </View>
    </View>
  )

}

const reload = () => {

  var tempSend = [];
  var tempReceive = [];

  for(var x = 0; x < chatList.length; x++){
    if(chatList[x].sender === userID){
      const record = chatList[x]
      tempSend.push(record)
    }
  }

  setSendList(tempSend);

  for(var x = 0; x < chatList.length; x++){
    if(chatList[x].receiver === userID){
      const record = chatList[x]
      tempReceive.push(record)
    }
  }

  setSendList(tempSend);
  setReceiverList(tempReceive);

}

const [sendList, setSendList] = useState([]);
const [receiveList, setReceiverList] = useState([]);

const [chatView, setChatView] = useState(true);

const userID = CommonStore.useState(s => s.userID);
const customerOrder = CommonStore.useState(s => s.customerOrder);
const chatList = CommonStore.useState(s => s.chatList);
const userDetails = CommonStore.useState(s => s.userDetails);

return (

  <View style={[styles.container]}>

    <View style={{ paddingHorizontal: 70, paddingVertical: 5, marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <TouchableOpacity onPress={() => { setChatView(true) }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', textDecorationLine: chatView === true ? 'underline' : '' }}>Inbox</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={() => { setChatView(false) }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', textDecorationLine: chatView === false ? 'underline' : '' }}>Sent</Text>
       </TouchableOpacity>
        <TouchableOpacity onPress={() => { reload(); }}>
          <Foundation name='refresh' size={30} color={Colors.primaryColor} />
        </TouchableOpacity>
    </View>
    { chatView ?
      <FlatList
        data={receiveList}
        nestedScrollEnabled={true}
        renderItem={renderChatReceivedList}
        keyExtractor={(item, index) => index.toString()}
      />
      :
      <FlatList
        data={sendList}
        nestedScrollEnabled={true}
        renderItem={renderChatSentList}
        keyExtractor={(item, index) => index.toString()}
      />
    }
  </View>

);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  ModalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    height: 330,
    width: 300,
    backgroundColor: Colors.grey,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center'
  },
  homeLogo: {
    width: 220,
    height: 50,
  },
  loginButton: {
    width: 200,
    height: 50,
    backgroundColor: Colors.primaryColor,
    borderRadius: 20,
    shadowColor: '#5B5B5B',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    borderRadius: 20,
    width: 300,
    height: 35,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 3,
    paddingLeft: 10
  },
});

export default ChatScreen;
