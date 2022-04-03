import db from "../constants/firebaseConfig";
import { collection, doc, getDoc, getDocs, onSnapshot, query } from "firebase/firestore";
import { CommonStore } from "../store/CommonStore";

export const CollectionFunc = async (userID) => {

    console.log('loaded')

    const userRef = query(collection(db, "user"));

    onSnapshot(userRef, (querySnapshot) => {
        const tempUser = [];
        querySnapshot.forEach((doc) => {
            tempUser.push({...doc.data(), docID: doc.id});
        })
        CommonStore.update(s => {
            s.userDetails = tempUser;
         });
        
        });

    const serviceRef = query(collection(db, "service"));

    onSnapshot(serviceRef, (querySnapshot) => {
        const tempService = [];
        querySnapshot.forEach((doc) => {
            tempService.push({...doc.data(), docID: doc.id});
        })
        CommonStore.update(s => {
            s.serviceList = tempService;
         });
        
        });

    const orderRef = query(collection(db, "order"));

    onSnapshot(orderRef, (querySnapshot) => {
        const tempOrder = [];
        querySnapshot.forEach((doc) => {
            tempOrder.push({...doc.data(), docID: doc.id});
        })
        CommonStore.update(s => {
            s.customerOrder = tempOrder;
         });
        
        });

    const transactionRef = query(collection(db, "transaction"));

    onSnapshot(transactionRef, (querySnapshot) => {
        const tempTransaction = [];
        querySnapshot.forEach((doc) => {
            tempTransaction.push({...doc.data(), docID: doc.id});
        })
        CommonStore.update(s => {
            s.transactionList = tempTransaction;
            });
        
        });

    const chatRef = query(collection(db, "chat"));

    onSnapshot(chatRef, (querySnapshot) => {
        const tempChat = [];
        querySnapshot.forEach((doc) => {
            tempChat.push({...doc.data(), docID: doc.id});
        })
        CommonStore.update(s => {
            s.chatList = tempChat;
            });
        
        });

}