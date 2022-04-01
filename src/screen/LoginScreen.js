import React, { useState, useEffect } from 'react'
import Colors from '../constant/Colors';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { CommonStore } from '../../store/CommonStore';
import { AuthCredential, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, onSnapshot, query, addDoc, where, getDocs, Timestamp, setDoc, doc } from 'firebase/firestore'
import db from '../../constants/firebaseConfig';

const LoginScreen = props => {

  const { navigation, route } = props;

  //Login//
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  //Register//
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRepeatPassword, setRegRepeatPassword] = useState('');
  const userTypeCustomer = 'CUSTOMER';
  const userTypeSeller = 'SELLER';
  const userID = CommonStore.useState(s => s.userID);
  const userDetails = CommonStore.useState(s => s.userDetails);
  const [registrationScreen, setRegistrationScreen] = useState(false);

  const auth = getAuth();

  const [userData, setUserData] = useState([]);

  const q = query(collection(db, "user"));
  const getUsers = onSnapshot(q, (querySnapshot) => {
    const tempUser = [];
    querySnapshot.forEach((doc) => {
      tempUser.push(doc.data());
    });
    setUserData(tempUser);
  });

  useEffect(() => {

    getUsers();

  },[]);

  useEffect(() => {
    CommonStore.update(s => { s.userDetails = userData })
  },[userData]);

  const loginFunc = () => {

    signInWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
          console.log(userCredential)
          CommonStore.update(s => {
            s.userID = userCredential.user.uid;
         });
         var tempUserSelected = {};
         for (var i = 0; i < userData.length; i++){
           if(userData[i].uniqueID === userCredential.user.uid){
             tempUserSelected = userData[i];
             CommonStore.update(s => {
              s.userSelected = tempUserSelected;
            })
           }
         }
        })
        .catch((error) => {
            alert(error.message)
        });
  };

  const registerFuncCustomer = async () => {

    if (regPassword == regRepeatPassword) {
      await createUserWithEmailAndPassword(auth, regEmail, regPassword)
        .then( async (userCredential) => {
          try {
            var body = {
              uniqueID: userCredential.user.uid,
              userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/640px-User_icon_2.svg.png',
              userName: regFullName,
              userEmail: regEmail,
              userType: userTypeCustomer,
              walletAmount: 0,
              createdAt: Date.now(),
              isActive: true,
            }
            await setDoc(doc(db, 'user', userCredential.user.uid), body)
            console.log('added to database')
            CommonStore.update(s => {
              s.userID = userCredential.user.uid;
              s.userSelected = body;
           });
         } catch (error) {
           alert(error)
         }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        })
      }
      
    }

  const registerFuncSeller = async () => {

    if (regPassword == regRepeatPassword) {
      await createUserWithEmailAndPassword(auth, regEmail, regPassword)
        .then( async (userCredential) => {
          try {
            var body = {
              uniqueID: userCredential.user.uid,
              userImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/640px-User_icon_2.svg.png',
              userName: regFullName,
              userEmail: regEmail,
              userType: userTypeSeller,
              walletAmount: 0,
              createdAt: Date.now(),
              isActive: true,
            }
            await setDoc(doc(db, 'user', userCredential.user.uid), body)
            console.log('added to database')
            CommonStore.update(s => {
              s.userID = userCredential.user.uid;
              s.userSelected = body;
           });
         } catch (error) {
           alert(error)
         }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        })
      }
  }


  return (
    <View style={[styles.container]}>
    { registrationScreen === false ?
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ justifyContent: 'center', paddingVertical: 40}}>
        <Image
          source={require('../assets/image/ServedLogo.png')}
          style={[styles.logo]}
        />
      </View>
      <View style={{ justifyContent: 'center', paddingVertical: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
          <Feather name={'mail'} size={25} />
          <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.black, paddingVertical: 5, marginLeft: 10 }}>Email</Text>
        </View>
        <TextInput
          style={[styles.textInput]}
          placeholder="Email"
          value={userEmail}
          onChangeText={text => setUserEmail(text)}
        />
      </View>
      <View style={{ justifyContent: 'center', paddingVertical: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
          <Feather name={'key'} size={25} />
          <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.black, paddingVertical: 5, marginLeft: 10 }}>Password</Text>
        </View>
        <TextInput
          style={[styles.textInput]}
          placeholder="Password"
          value={userPassword}
          onChangeText={text => setUserPassword(text)}
        />
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity style={{ paddingVertical: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.black }}>Forget Password?</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ paddingVertical: 20 }}>
        <TouchableOpacity
          style={[styles.loginButton]}
          onPress={() => {
            loginFunc();
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: '700', color: Colors.black }}>LOGIN</Text>
        </TouchableOpacity>
        <View style={{ alignItems: 'center', paddingVertical: 10 }}>
          <TouchableOpacity
            onPress={() => {
              setRegistrationScreen(true);
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.black, textDecorationLine: 'underline' }}>Create An Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    :
    <ScrollView style={[styles.container]}>
    <View style={{ paddingHorizontal: 20, paddingTop: 30 }}>
      <TouchableOpacity
        onPress={() => {
          setRegistrationScreen(false);
        }}
      >
        <Feather name={'arrow-left'} size={40} />
      </TouchableOpacity>
    </View>
    <View style={{ flex: 2, alignItems: 'center' }}>
      <View style={{ justifyContent: 'center', paddingVertical: 10}}>
      <Text style={{ fontSize: 24, fontWeight: '700', color: Colors.black, paddingVertical: 5, marginLeft: 10 }}>Create Your Account</Text>
      </View>
      <View style={{ justifyContent: 'center', paddingVertical: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
          <Feather name={'user'} size={25} />
          <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.black, paddingVertical: 5, marginLeft: 10 }}>Full Name</Text>
        </View>
        <TextInput
          style={[styles.textInput]}
          placeholder="Full Name"
          value={regFullName}
          onChangeText={text => setRegFullName(text)}
        />
      </View>
      <View style={{ justifyContent: 'center', paddingVertical: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
          <Feather name={'mail'} size={25} />
          <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.black, paddingVertical: 5, marginLeft: 10 }}>Email</Text>
        </View>
        <TextInput
          style={[styles.textInput]}
          placeholder="Email"
          value={regEmail}
          onChangeText={text => setRegEmail(text)}
        />
      </View>
      <View style={{ justifyContent: 'center', paddingVertical: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
          <Feather name={'key'} size={25} />
          <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.black, paddingVertical: 5, marginLeft: 10 }}>Password</Text>
        </View>
        <TextInput
          style={[styles.textInput]}
          placeholder="Password"
          value={regPassword}
          onChangeText={text => setRegPassword(text)}
        />
      </View>
      <View style={{ justifyContent: 'center', paddingVertical: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
          <Feather name={'key'} size={25} />
          <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.black, paddingVertical: 5, marginLeft: 10 }}>Repeat Password</Text>
        </View>
        <TextInput
          style={[styles.textInput]}
          placeholder="Repeat Password"
          value={regRepeatPassword}
          onChangeText={text => setRegRepeatPassword(text)}
        />
      </View>

      <View style={{ paddingVertical: 20 }}>
        <TouchableOpacity
          style={[styles.registerButton]}
          onPress={() => {
            registerFuncCustomer();
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: '700', color: Colors.black }}>Register As Customer</Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingVertical: 5 }}>
        <TouchableOpacity
          style={[styles.registerSellerButton]}
          onPress={() => {
            registerFuncSeller();
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: '700', color: Colors.white }}>Register As Seller</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  }

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  logo: {
    width: 250,
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
  registerButton: {
    width: 300,
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
  registerSellerButton: {
    width: 300,
    height: 50,
    backgroundColor: '#A55013',
    borderRadius: 20,
    shadowColor: '#000000',
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
  },
});

export default LoginScreen;