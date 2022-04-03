import React, { Component, useState, useEffect, useCallback } from 'react';
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
import { CommonStore } from '../../store/CommonStore';
import { ServiceCategory } from '../../store/ServiceCategory';
import { CollectionFunc } from '../../util/CommonFunc';
import { collection, onSnapshot, query, addDoc, where, getDocs, Timestamp, setDoc } from 'firebase/firestore'
import db from '../../constants/firebaseConfig';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = props => {

const { navigation, route } = props;

const userID = CommonStore.useState(s => s.userID);
const customerOrder = CommonStore.useState(s => s.customerOrder);
const serviceList = CommonStore.useState(s => s.serviceList);
const userDetails = CommonStore.useState(s => s.userDetails);

const [userSelected, setUserSelected] = useState();

useEffect(() => {
  if(props){
    CollectionFunc(userID);
  }
})

useEffect(() => {

  console.log(customerOrder)

  var selected = {};

  for(var x = 0; x < userDetails.length; x++){
    if(userDetails[x].uniqueID === userID){

      selected = userDetails[x];

    }
  }

  setUserSelected(selected);

},[userDetails, userID])


const renderCategoryList = ({item, index}) => {
  return(
    <View style={{ paddingHorizontal: 15, paddingVertical: 15, alignItems: 'center' }}>
    <TouchableOpacity
      style={{ 
        width: 85, 
        height: 85,
      }}
      onPress={() => {
        var tempServiceSelected = [];
          for(var x = 0; x < serviceList.length; x++){
            if(item.id === serviceList[x].serviceCategory){
              const record = serviceList[x];
              tempServiceSelected.push(record)
            }
          }
          CommonStore.update(s => {
            s.serviceCategorySelected = tempServiceSelected;
          });
          navigation.navigate('ServiceListScreen')
      }}>
      <Image
        style={{
          width: '100%',
          height: '100%',
        }}
        source={{uri: item.image}}
      />
    </TouchableOpacity>
    <Text style={{ fontSize: 12 }}>{item.name}</Text>
    </View>
  )
};

return (

  <ScrollView style={[styles.container]}>
    <View style={{ paddingHorizontal: 30 }}>
    <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 40}}>
    <Image
        source={require('../assets/image/ServedLogo.png')}
        style={[styles.homeLogo]}
    />
    </View>
    <View style={{ justifyContent: 'center' }}>
    <Text style={{ fontSize: 24, fontWeight: '900', color: Colors.black, paddingVertical: 5, }}>Hi {userSelected ? userSelected.userName : 'User'}</Text>
    <Text style={{ width: '80%', fontSize: 18, fontWeight: '700', color: Colors.black }}>What service are you looking for?</Text>
    </View>
    </View>

    <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 20}}>
      <FlatList
        numColumns={3}
        data={ServiceCategory}
        renderItem={renderCategoryList}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>

  </ScrollView>

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

export default HomeScreen;
