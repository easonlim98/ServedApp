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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonStore } from '../../store/CommonStore';
import { getAuth, signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, Timestamp, setDoc, updateDoc, doc, query, onSnapshot, increment } from 'firebase/firestore';
import db from '../../constants/firebaseConfig';
import { CollectionFunc } from '../../util/CommonFunc';
import Foundation from 'react-native-vector-icons/Foundation'
import moment from 'moment';

const ProfileScreen = props => {

const { navigation, route } = props;

const auth = getAuth();

useEffect(() => {
  if(props){
    CollectionFunc(userID);
  }
})

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
        Profile
      </Text>
    </View>
  ),
  headerRight: () => (
    <TouchableOpacity style={{
    }} 
    onPress={() => {
      signOut(auth).then(() => {
        CommonStore.update(s => {
          s.isLoggedIn = false;
          s.firebaseUid = '';
        });
        console.log('successfully signed out')
      })
      .catch((error) => {
        console.log(error)
      });
      //firebase.auth().signOut()
    }}>
      <View style={{
        justifyContent: 'center',
        paddingLeft: 5,
      }}>
        <MaterialCommunityIcons
          name='logout'
          size={24}
          color={Colors.black}
          style={{
          }}
        />
      </View>
  </TouchableOpacity>
  ),
});

});

useEffect(() => {

  var selected = [];

  for(var x = 0; x < userDetails.length; x++){
    if(userDetails[x].uniqueID === userID){
      const record = userDetails[x];
      selected.push(record)

    }
  }

  setCurrProfile(selected);

},[userDetails, userID])

const reload = () => {

  var selected = [];

  for(var x = 0; x < userDetails.length; x++){
    if(userDetails[x].uniqueID === userID){
      const record = userDetails[x];
      selected.push(record)

    }
  }

  setCurrProfile(selected);

  var tempTransaction = [];

  for (var i = 0; i < transactionList.length; i++){
    if(transactionList[i].userID === userID){
      const record = transactionList[i]
      tempTransaction.push(record)
    }
  }

  console.log(tempTransaction)

  setUserTransactions(tempTransaction);

}

const [currProfile, setCurrProfile] = useState([]);

const userID = CommonStore.useState(s => s.userID);
const userDetails = CommonStore.useState(s => s.userDetails);
const transactionList = CommonStore.useState(s => s.transactionList);

useEffect(() => {

  var tempTransaction = [];

  for (var i = 0; i < transactionList.length; i++){
    if(transactionList[i].userID === userID){
      const record = transactionList[i]
      tempTransaction.push(record)
    }
  }

  setUserTransactions(tempTransaction);

}, [transactionList, userID]);

const [userTransactions, setUserTransactions] = useState([]);

const [showAddWallet, setShowAddWallet] = useState(false);
const [reloadAmount, setReloadAmount] = useState(0);

const addWalletAmount = async () => {

  var tempUser = [];

  for(var i = 0; i < userDetails.length; i++){
    if(userDetails[i].uniqueID === userID){
      const record = userDetails[i]
      tempUser.push(record)
    }
  }

  const userRef = doc(db, 'user', tempUser[0].docID);
  await updateDoc(userRef, {
    walletAmount: increment(reloadAmount)
  })

    setShowAddWallet(false);

  var body = {
    amount: reloadAmount,
    userID: userID,
    serviceName: 'undefined',
    createdAt: Date.now()
  }

  await addDoc(collection(db, 'transaction'), body);
  console.log(body)

};

const renderTransaction = ({ item, index }) => {
  return(
    <View style={{ flexDirection: 'row', paddingBottom: 15 }}>
      <View style={{ }}>
        <FontAwesome 
          name={item.serviceName === 'undefined' ? 'plus-circle' : 'minus-circle'} 
          size={20}
          color={item.serviceName === 'undefined' ? Colors.primaryColor : '#003BD1'}
        />
      </View>
      <View style={{ paddingLeft: 20 }}>
        <View style={{  }}>
          <Text style={{ 
            fontSize: 14, 
            fontWeight: 'bold',
            color: item.serviceName === 'undefined' ? Colors.primaryColor : '#003BD1'
            }}>
              RM {item.amount}
          </Text>
        </View>
        { item.serviceName === 'undefined' ?
        <></>
        :
        <View style={{  }}>
          <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{item.serviceName}</Text>
        </View>
        }
        <View style={{  }}>
          <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{moment(item.createdAt).format('DD-MM-YYYY HH:MM')}</Text>
        </View>
      </View>
    </View>
  )
}

return (

  <ScrollView style={[styles.container]}>

  <Modal
      visible={showAddWallet}
      transparent={true}
      animationType={'slide'}
    >
      <View style={[styles.ModalContainer]}>
        <View style={[styles.modalView]}>
          <View>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.white }}>Enter Reload Amount</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10, }}>
              <TextInput 
                style={{ paddingLeft: 12, fontSize: 16, fontWeight: 'bold', color: Colors.white }}
                placeholderTextColor="#FFFFFF"
                placeholder={"0"}
                value={reloadAmount}
                onChangeText={text => setReloadAmount(text)}
                />
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
                addWalletAmount();
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
                setShowAddWallet(false);
              }}
             >
               <Text style={{ fontSize: 14, color: Colors.black, fontWeight: 'bold' }}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>

    <View style={{ paddingBottom: 20 }}>
      <View style={{ flexDirection: 'row', paddingVertical: 30, width: '80%', alignSelf: 'center' }}>
        <View style={{ width: '30%', justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={{
              borderRadius: 80,
              width: 80,
              height: 80,
            }}
            source={currProfile.length !== 0 ? { uri: currProfile[0].userImage } : null}
          />
        </View>
        <View style={{ width: '70%', paddingVertical: 0, paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{currProfile.length !== 0 ? currProfile[0].userName : 'null'}</Text>
            <TouchableOpacity onPress={() => { reload(); }}>
              <Foundation name='refresh' size={30} color={Colors.primaryColor} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Fontisto name={'wallet'} size={20} color={Colors.primaryColor}/>
              <Text style={{ paddingLeft: 12, fontSize: 16, fontWeight: 'bold' }}>RM {currProfile.length !== 0 ? currProfile[0].walletAmount: '0'}</Text>
            </View>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => { setShowAddWallet(true); }}>
              <FontAwesome name={'plus-circle'} size={20} color={Colors.primaryColor} />
            </TouchableOpacity>
          </View>
        </View>
    </View>
    
    <View style={{ 
      paddingHorizontal: 50,
      paddingVertical: 15, 
      height: Dimensions.get('screen').height * 0.5, 
      width: '80%', 
      alignSelf: 'center',
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
    }}>
      <View style={{ paddingBottom: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Transaction</Text>
      </View>
    <FlatList
      style={{
        //height: '80%',
        //width: '100%',
        alignSelf: 'center',
      }}
      nestedScrollEnabled={true}
      data={userTransactions}
      renderItem={renderTransaction}
      keyExtractor={(item, index) => index.toString()}
    />
    </View>
    </View>
    { currProfile.length > 0 && currProfile[0].userType === "SELLER" ?
    <>
    <View style={{ alignItems: 'center' }}>
        <TouchableOpacity
          style={[styles.SellerButton]}
          onPress={() => {
            navigation.navigate('SellerServiceScreen')
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.black }}>My Service</Text>
        </TouchableOpacity>
    </View>
    <View style={{ alignItems: 'center', paddingVertical: 10, }}>
        <TouchableOpacity
          style={[styles.SellerButton]}
          onPress={() => {
            navigation.navigate('CustomerOrderScreen')
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.black }}>Customer's Order</Text>
        </TouchableOpacity>
    </View>
    </>
    :
    null
    }
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
    height: 150,
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
  SellerButton: {
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

export default ProfileScreen;
