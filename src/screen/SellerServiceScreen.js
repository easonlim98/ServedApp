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
import { CommonStore } from '../../store/CommonStore';
import moment from 'moment';
import { collection, onSnapshot, query, addDoc, where, getDocs, Timestamp, setDoc } from 'firebase/firestore'
import db from '../../constants/firebaseConfig';

const SellerServiceScreen = (props) => {

const { navigation, route } = props;

const [serviceData, setServiceData] = useState([]);

const q = query(collection(db, "service"));
const getService = onSnapshot(q, (querySnapshot) => {
  const tempService = [];
  querySnapshot.forEach((doc) => {
    tempService.push(doc.data());
  });
  setServiceData(tempService);
});

useEffect(() => {

  getService();

},[]);

useEffect(()=> {
  
  var tempSellerService = [];

  for(var x = 0; x < serviceData.length; x++){
    if(userSelected.uniqueID === serviceData[x].sellerID){
      const service = serviceData[x]
      tempSellerService.push(service);
    }
  }

  setSellerService(tempSellerService);
  
},[serviceData, userSelected]);

const [sellerService, setSellerService] = useState([]);

const userSelected = CommonStore.useState(s => s.userSelected);

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
        My Service
      </Text>
    </View>
  ),
});


const renderServiceList = ( item, index ) => {
  return(
    <View style={{ paddingHorizontal: 15, paddingVertical: 5, alignItems: 'center' }}>
    <TouchableOpacity
      style={{ 
        width: Dimensions.get('screen').width * 0.85,
        height: 130,
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
      onPress={() => {
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
              source={{uri: item.image}}
            />
          </View>
          <View style={{ flex: 2, paddingLeft: 10, paddingRight: 10 }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', width: '70%' }} numberOfLines={1}>{item.name}</Text>
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
                {item.status}
              </Text>
              </View>
            </View>
            <View style={{ flex: 3, paddingTop: 5 }}>
              <Text style={{ fontSize: 12, fontWeight: '600' }}>Description:</Text>
              <Text style={{ fontSize: 11 }} numberOfLines={2}>{item.description}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ flex: 0.8, paddingTop: 0, paddingLeft: 5  }}>
        <Text style={{ 
          fontSize: 13,
          }}>
            Order Date/Time: {item.orderAt}
        </Text>
      </View>
    </TouchableOpacity>
    </View>
  );
};

return (

  <View style={[styles.container]}>
    <View style={{ paddingVertical: 20 }}>
    <View style={{ alignItems: 'center' }}>
        <TouchableOpacity
          style={[styles.AddServiceButton]}
          onPress={() => {
            navigation.navigate('AddServiceScreen')
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.black }}>Add Service</Text>
        </TouchableOpacity>
    </View>
    </View>
    <View style={{ paddingHorizontal: 40, paddingVertical: 5 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Total Services: {sellerService.length}</Text>
    </View>

    <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center'}}>
      {/* <FlatList
        data={orderList}
        renderItem={renderServiceList}
        keyExtractor={(item, index) => index.toString()}
      /> */}
      {sellerService.map((item, index) => {
        return(
          <View style={{ paddingHorizontal: 15, paddingVertical: 5, alignItems: 'center' }}>
          <TouchableOpacity
            style={{ 
              width: Dimensions.get('screen').width * 0.85,
              height: 130,
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
            onPress={() => {
                
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
                    source={item.serviceImg}
                  />
                </View>
                <View style={{ flex: 2, paddingLeft: 10, paddingRight: 10 }}>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', width: '75%' }} numberOfLines={1}>{item.serviceName}</Text>
                    <View style={{ paddingVertical: 0, width: '30%' }}>
                    <Text style={{
                      backgroundColor: 'red',
                      borderRadius: 10,
                      paddingVertical: 4,
                      textAlign: 'center',
                      fontSize: 8,
                      color: Colors.white
                    }}>
                      REMOVE
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
      
            <View style={{ flex: 0.8, paddingTop: 0, paddingLeft: 5  }}>
              <Text style={{ 
                fontSize: 13,
                }}>
                  Created At: {moment(item.createdAt).format('DD/MM/YYYY hh:mm A')}
              </Text>
            </View>
          </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>

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
  AddServiceButton: {
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

export default SellerServiceScreen;
