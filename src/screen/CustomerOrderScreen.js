import React, { Component, useReducer, useState, useEffect, useRef } from 'react';
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
import Foundation from 'react-native-vector-icons/Foundation';
import { collection, onSnapshot, query, addDoc, where, getDocs, Timestamp, setDoc, doc, updateDoc } from 'firebase/firestore'
import db from '../../constants/firebaseConfig';
import { CommonStore } from '../../store/CommonStore';
import { CollectionFunc } from '../../util/CommonFunc';
import {Picker} from '@react-native-picker/picker';
import { ServiceStatus } from '../../store/ServiceStatus';
import moment from 'moment';

const CustomerOrderScreen = (props) => {

const { navigation, route } = props;

useEffect(() => {
navigation.setOptions({
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
        Customer's Order
      </Text>
    </View>
  ),
});
});

useEffect(() => {
  if(props){
    CollectionFunc(userID);
  }
})


useEffect(() => {

  var tempCustomerOrder = [];

  for(var x = 0; x < customerOrder.length; x++){
    if(customerOrder[x].sellerID === userID){
      const record = customerOrder[x];
      tempCustomerOrder.push(record);
    }
  }

  setCurrCustomerOrder(tempCustomerOrder);

},[customerOrder, userID])

const reload = () => {
  var tempCustomerOrder = [];

  for(var x = 0; x < customerOrder.length; x++){
    if(customerOrder[x].sellerID === userID){
      const record = customerOrder[x];
      tempCustomerOrder.push(record);
    }
  }

  setCurrCustomerOrder(tempCustomerOrder);
};

const updateStatus = async (item) => {
  const orderRef = doc(db, 'order', docID);
  await updateDoc(orderRef, {
    status: newStatus
  })

  setShowStatusModal(false);

};

const userID = CommonStore.useState(s => s.userID);
const customerOrder = CommonStore.useState(s => s.customerOrder);

const [statusModal, setShowStatusModal] = useState(false);
const [newStatus, setNewStatus] = useState('');
const [docID, setDocID] = useState('');
const [currCustomerOrder, setCurrCustomerOrder] = useState([]);

return (

  <ScrollView style={[styles.container]}>
    <View style={{ paddingHorizontal: 40, paddingVertical: 5, marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Total Services: {currCustomerOrder.length}</Text>
        <TouchableOpacity onPress={() => { reload(); }}>
          <Foundation name='refresh' size={30} color={Colors.primaryColor} />
        </TouchableOpacity>
    </View>

    <View style={{ justifyContent: 'center', alignItems: 'center'}}>
      {currCustomerOrder.map((item, index) => {
        return(
          <>
          <Modal
            visible={statusModal}
            transparent={true}
            animationType={'slide'}
          >
            <View style={[styles.ModalContainer]}>
              <View style={[styles.modalView]}>
                <View>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.white }}>Update Order Status</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, }}>
                  <Picker
                  style={{
                    borderRadius: 10,
                    width: '100%',
                    height: 35,
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
                  selectedValue={newStatus}
                  onValueChange={(itemValue, itemIndex) =>
                    setNewStatus(itemValue)
                  }>
                  { ServiceStatus.map((item) => {
                    return (
                      <Picker.Item label={item.id} value={item.name} />
                    )
                  })} 
                </Picker>
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
                      updateStatus();
                    }}
                  >
                    <Text style={{ fontSize: 14, color: Colors.black, fontWeight: 'bold' }}>CONFIRM</Text>
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
                      setShowStatusModal(false);
                    }}
                  >
                    <Text style={{ fontSize: 14, color: Colors.black, fontWeight: 'bold' }}>CANCEL</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <View style={{ paddingHorizontal: 15, paddingVertical: 5, alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              width: Dimensions.get('screen').width * 0.85,
              paddingVertical: 5,
              paddingHorizontal: 15,
              borderRadius: 20,
              backgroundColor: item.orderType === "SCHEDULE" ? Colors.secondaryColor : Colors.white,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 3,
            }}
            onPress={() => {
              setShowStatusModal(true);
              setDocID(item.docID);
              console.log(item.docID);
            }}
          >
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1, flexDirection: 'row', paddingTop: 15 }}>
                <View style={{ flex: 1 }}>
                  <Image
                    style={{
                      borderRadius: 10,
                      width: 80,
                      height: 80,
                    }}
                    source={item.serviceImg ? {uri: item.serviceImg} : ''}
                  />
                </View>
                <View style={{ flex: 2, paddingLeft: 10, paddingRight: 10 }}>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', width: '70%' }} numberOfLines={1}>{item.serviceName ? item.serviceName : ''}</Text>
                    <View style={{ paddingVertical: 0, width: '40%' }}>
                    <Text style={{
                      backgroundColor: 
                      item.status === 'completed' ? '#474747' 
                      : item.status === 'pending' ? '#5032CB'
                      : item.status === 'cancelled' ? '#BD1409'
                      : item.status === 'in-progress' ? '#7F8201' : '#FFFFFF',
                      paddingVertical: 2,
                      borderRadius: 10,
                      textAlign: 'center',
                      fontSize: 8,
                      color: Colors.white
                    }}>
                      {item.status ? item.status : ''}
                    </Text>
                    </View>
                  </View>
                  <View style={{ flex: 3, paddingTop: 5 }}>
                    <Text style={{ fontSize: 12, fontWeight: '600' }}>Description:</Text>
                    <Text style={{ fontSize: 11 }} numberOfLines={2}>{item.serviceDescription ? item.serviceDescription : ''}</Text>
                  </View>
                </View>
              </View>
            </View>
      
            <View style={{ flex: 1, paddingTop: 5, paddingLeft: 5  }}>
              <Text style={{ 
                fontSize: 13,
                }}>
                  Order Date/Time: {item.createdAt ? moment(item.createdAt).format('MMM DD YYYY HH:MM A') : ''}
              </Text>
            </View>
            {item.orderType === "SCHEDULE" ?
              <View style={{ flex: 1, paddingTop: 5, paddingLeft: 5, flexDirection: 'column'  }}>
              <Text style={{ 
                fontSize: 13,
                fontWeight: 'bold'
                }}>
                  Scheduled At:
              </Text>
              <Text style={{ 
                fontSize: 13,
                }}>
                  {item.scheduleDate}{'     '}{item.scheduleTime}
              </Text>
            </View>
            :
            null
            }
          </TouchableOpacity>
          </View>
        </>
        );
      })}
    </View>

  </ScrollView>

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
    height: 170,
    width: 250,
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

export default CustomerOrderScreen;
