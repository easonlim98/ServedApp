/* import db from "../constants/firebaseConfig";
import { collection, doc, getDoc, getDocs, onSnapshot, where } from "firebase/firestore";
import {useState, useEffect} from 'react';
import { CommonStore } from "../store/CommonStore";

export const CollectionFunc = async (userID) => {

    const userDoc = collection(db, 'user')
    const userData = await getDocs(userDoc)
    const getUserData = userData.docs.map((doc) => ({...doc.data()}));
    
    CommonStore.update(s => {
        s.userDetails = getUserData;
    });

} */