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

const ChatMessageScreen = (props) => {

const { navigation, route } = props;

useEffect(() => {
  if(props){
    CollectionFunc(userID);
  }
})

const reload = () => {
  

}

const send = async () => {

  if(message !== '' && newReceiver !== ''){
    
    var body = {
      sender: userID,
      receiver: newReceiver,
      message: message,
      createdAt: Date.now()
    }
  
    await addDoc(collection(db, 'chat'), body);
    console.log(body)

    navigation.navigate('ChatScreen')

  }
  else{
    Alert.alert("Please enter require field")
  }
}

const [receiverList, setReceiverList] = useState([]);
const [newReceiver, setNewReceiver] = useState('');
const [message, setMessage] = useState('');

const userID = CommonStore.useState(s => s.userID);
const customerOrder = CommonStore.useState(s => s.customerOrder);
const chatList = CommonStore.useState(s => s.chatList);
const userDetails = CommonStore.useState(s => s.userDetails);

  return (
  <View style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: 10, }}>
      <View style={{ width: '90%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.black }}>Select Receiver</Text>
      <TouchableOpacity style={{ paddingRight: 10, }} onPress={() => { reload(); }}>
          <Foundation name='refresh' size={30} color={Colors.primaryColor} />
      </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'column', paddingTop: 10, width: '90%' }}>
          <Picker
              style={{
                borderRadius: 10,
                backgroundColor: Colors.white,
                shadowColor: Colors.black,
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 1,
                shadowRadius: 10,
                elevation: 3,
                paddingLeft: 10
              }}
              selectedValue={newReceiver}
              onValueChange={(itemValue, itemIndex) =>
                setNewReceiver(itemValue)
              }>
          { userDetails.map((item) => {

            return (
              <Picker.Item label={item.userName} value={item.uniqueID} />
            
            )
          })}
          </Picker>
      <View style={{ marginTop: 5, }}>
      <TextInput style={{ 
        minHeight: 150,
        borderRadius: 5,
        width: '100%',
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 3,
        paddingLeft: 10
        }} 
        placeholder='Enter your message'
        multiline={true}
        textAlignVertical='top'
        value={message}
        onChangeText={text => setMessage(text)}
        />
      </View>              
      </View>
      <View style={{ flexDirection: 'row', width: '75%',justifyContent: 'space-between', paddingTop: 20 }}>
        <TouchableOpacity style={{ 
          width: 80,
          height: 35,
          backgroundColor: Colors.primaryColor,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 12,
        }}
          onPress={() => {
            send();
          }}
        >
          <Text style={{ fontSize: 14, color: Colors.black, fontWeight: 'bold' }}>SEND</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ 
          width: 80,
          height: 35,
          backgroundColor: Colors.white,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 12,
        }}
          onPress={() => {
            navigation.navigate('ChatScreen')
          }}
        >
          <Text style={{ fontSize: 14, color: Colors.black, fontWeight: 'bold' }}>CANCEL</Text>
        </TouchableOpacity>
      </View>
  </View>  
  )
}

export default ChatMessageScreen