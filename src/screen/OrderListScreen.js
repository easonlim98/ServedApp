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
import { CommonStore } from '../../store/CommonStore';
import moment from 'moment';
import { collection, onSnapshot, query, addDoc, where, getDocs, Timestamp, setDoc } from 'firebase/firestore'
import db from '../../constants/firebaseConfig';
import { useFocusEffect } from '@react-navigation/native';
import { CollectionFunc } from '../../util/CommonFunc';
import Foundation from 'react-native-vector-icons/Foundation';

const OrderListScreen = (props) => {

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
        Orders
      </Text>
    </View>
  ),
});
})

const [currCustomerOrder, setCurrCustomerOrder] = useState([]);


useEffect(() => {
  if(props){
    CollectionFunc(userID);
  }
})


useEffect(() => {

  var tempCustomerOrder = [];

  for(var x = 0; x < customerOrder.length; x++){
    if(customerOrder[x].customerID === userID){
      const record = customerOrder[x];
      tempCustomerOrder.push(record);
    }
  }

  setCurrCustomerOrder(tempCustomerOrder);

},[customerOrder, userID])

const reload = () => {
  var tempCustomerOrder = [];

  for(var x = 0; x < customerOrder.length; x++){
    if(customerOrder[x].customerID === userID){
      const record = customerOrder[x];
      tempCustomerOrder.push(record);
    }
  }

  setCurrCustomerOrder(tempCustomerOrder);
};

const userID = CommonStore.useState(s => s.userID);
const customerOrder = CommonStore.useState(s => s.customerOrder);

const renderServiceList = ({ item, index }) => {

  return(
    <View style={{ paddingHorizontal: 15, paddingVertical: 5, alignItems: 'center' }}>
    <View
      style={{ 
        width: Dimensions.get('screen').width * 0.85,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: Colors.white,
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
      <View style={{ flex: 3 }}>
        <View style={{ flex: 1, flexDirection: 'row', paddingTop: 15 }}>
          <View style={{ flex: 1 }}>
            <Image
              style={{
                borderRadius: 10,
                width: 80,
                height: 80,
              }}
              source={{uri: item.serviceImg}}
            />
          </View>
          <View style={{ flex: 2, paddingLeft: 10, paddingRight: 10 }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', width: '70%' }} numberOfLines={1}>{item.serviceName}</Text>
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
                fontSize: 10,
                color: Colors.white
              }}>
                {item.status}
              </Text>
              </View>
            </View>
            <View style={{ flex: 3, paddingTop: 5 }}>
              <Text style={{ fontSize: 12, fontWeight: '600' }}>Description:</Text>
              <Text style={{ fontSize: 11 }} numberOfLines={2}>{item.serviceDescription}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ flex: 2, paddingTop: 0, paddingLeft: 5  }}>
        <Text style={{ 
          fontSize: 13,
          }}>
            Order At: {moment(item.createdAt).format('DD/MM/YYYY hh:mm A')}
        </Text>
        <View style={{ marginTop: 5, backgroundColor: Colors.secondaryColor, alignItems: 'center', borderRadius: 5 }}>
          <Text style={{ padding: 2, fontWeight: 'bold' }}>Provider: {item.sellerName}</Text>
      </View>
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
      : null }
    </View>
    </View>
  );
};

return (

  <View style={[styles.container]}>
    {/* <View style={{ paddingVertical: 20 }}>
    <View
        style={{
            width: 300,
            height: 40,
            backgroundColor: Colors.white,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            shadowColor: Colors.black,
            shadowOffset: {
            width: 0,
            height: 0,
            },
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: 10,
            borderWidth: 1,
            borderColor: '#E5E5E5',
        }}>
        <Feather
            name="search"
            size={18}
            color={Colors.iconGrey}
            style={{marginLeft: 15}}
        />
        <TextInput
            style={{
            width: 220,
            fontSize: 15,
            paddingLeft: 10,
            height: 40,
            }}
            clearButtonMode="while-editing"
            placeholder="Search your order"
            //onChangeText={(text) => {
            //setSearch(text);
            //}}
            //value={}
        />
    </View>
    </View> */}
    <View style={{ paddingHorizontal: 40, paddingVertical: 5, marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Total Services: {currCustomerOrder.length}</Text>
        <TouchableOpacity onPress={() => { reload(); }}>
          <Foundation name='refresh' size={30} color={Colors.primaryColor} />
        </TouchableOpacity>
    </View>

      <FlatList
        data={currCustomerOrder.length > 0 ? currCustomerOrder : null}
        nestedScrollEnabled={true}
        renderItem={renderServiceList}
        keyExtractor={(item, index) => index.toString()}
      />

  </View>

);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
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

export default OrderListScreen;
