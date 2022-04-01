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
import { collection, onSnapshot, query, addDoc, where, getDocs, Timestamp, setDoc } from 'firebase/firestore'
import db from '../../constants/firebaseConfig';
import { CommonStore } from '../../store/CommonStore';


const CustomerOrderScreen = (props) => {

const { navigation, route } = props;

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

const q = query(collection(db, "order"));
const getOrder = onSnapshot(q, (querySnapshot) => {
  const tempOrder = [];
  querySnapshot.forEach((doc) => {
    tempOrder.push(doc.data());
  });
  setCustomerOrder(tempOrder);
});

useEffect(() => {

  getOrder();

},[]);

const [customerOrder, setCustomerOrder] = useState([]);

useEffect(()=> {
  
  var tempCustomerOrder = [];

  for(var x = 0; x < customerOrder.length; x++){
    if(userSelected.uniqueID === customerOrder[x].sellerID){
      const orders = customerOrder[x]
      tempCustomerOrder.push(orders);
    }
  }

  setCurrCustomerOrder(tempCustomerOrder);
  
},[customerOrder, userSelected]);

const [currCustomerOrder, setCurrCustomerOrder] = useState([]);

const userSelected = CommonStore.useState(s => s.userSelected);


const [orderList, setOrderList] = useState([
  {
    name: 'Phone Damage',
    image: 'https://blog.malwarebytes.com/wp-content/uploads/2015/05/photodune-9089398-mobile-devices-s-900x506.jpg',
    description: 'Scratched Sofa skin and bone break, required fixes',
    price: 50.00.toFixed(2),
    starCount: 3,
    orderAt: '12/11/2021 03:24PM',
    status: 'completed'
  }, 
  {
    name: 'Scratch Screen',
    image: 'https://blueflag.com.au/static/3642cc73b5c4a9ceb5fa176c5f5506af/4dad2/vehicle-make.jpg',
    description: 'Table painting with free design options with this seller.',
    price: 150.00.toFixed(2),
    starCount: 5,
    orderAt: '12/11/2021 03:24PM',
    status: 'pending'
  },
  {
    name: 'All Kind Repair',
    image: 'https://www.crossthet.com.au/wp-content/uploads/2021/06/construction-crane-surveyor-1.jpg',
    description: 'Load heavy bed',
    price: 79.00.toFixed(2),
    starCount: 4,
    orderAt: '12/11/2021 03:24PM',
    status: 'in-progress'
  },
]);

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
    </View>
    <View style={{ paddingHorizontal: 40, paddingVertical: 5 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Total Order: {currCustomerOrder.length}</Text>
    </View>

    <View style={{ justifyContent: 'center', alignItems: 'center'}}>
      {currCustomerOrder.map((item, index) => {
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
                      fontSize: 8,
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
      
            <View style={{ flex: 0.8, paddingTop: 0, paddingLeft: 5  }}>
              <Text style={{ 
                fontSize: 13,
                }}>
                  Order Date/Time: {item.createdAt}
              </Text>
            </View>
          </TouchableOpacity>
          </View>
        );
      })}
    </View>

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

export default CustomerOrderScreen;
