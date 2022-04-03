import React, { useEffect } from 'react'
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
import Colors from '../constant/Colors';
import { CollectionFunc } from '../../util/CommonFunc';

const Preload = (props) => {

const { navigation, route } = props;

useEffect(() => {
    CollectionFunc();
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.secondaryColor }}>
        <Text style={{ fontSize: 25, color: Colors.black, fontWeight: 'bold' }}>Welcome to Served</Text>
        <TouchableOpacity 
            style={{ marginTop: 10 ,borderRadius: 5, width: 100, height: 40, backgroundColor: Colors.primaryColor, borderWidth: 0, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => { navigation.navigate('HomeScreen') }}>
                    <Text style={{ fontSize: 20, color: Colors.black, fontWeight: '600' }}>START</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Preload