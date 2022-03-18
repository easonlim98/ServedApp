import React, { useState, useEffect } from 'react'
import Colors from '../constant/Colors';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { CommonStore } from '../../store/CommonStore';
import { AuthCredential, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

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
  const [userTypeCustomer, setUserTypeCustomer] = useState('CUSTOMER');
  const [userTypeSeller, setUserTypeSeller] = useState('SELLER');

  const [registrationScreen, setRegistrationScreen] = useState(false);

  const auth = getAuth();

  const loginFunc = () => {

    let credential = signInWithEmailAndPassword(auth, userEmail, userPassword)
        .then(() => {
          console.log('success')
        })
        .catch((error) => {
            alert(error.message)
        });
  };

  const registerFuncCustomer = () => {

    if (regPassword == regRepeatPassword) {
      let credential = createUserWithEmailAndPassword(auth, regEmail, regPassword)
        .then((userCredential) => {
         console.log(userCredential) 
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        })
  }
  }

  const registerFuncSeller = () => {

    if (regPassword == regRepeatPassword) {
      let credential = createUserWithEmailAndPassword(auth, regEmail, regPassword)
        .then((userCredential) => {
         console.log(userCredential) 
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