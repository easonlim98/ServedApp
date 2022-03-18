/* import firebase from 'firebase/app';
import "firebase/firestore";

export const createCustomer = async (userDetail, created) => {
    firebase
        .firestore()
        .collection("User")
        .add(userDetail)
        .then((snapshot) => {
            userDetail.id = snapshot.id
            snapshot.set(userDetail)
        })
        .then(() => console.log('successfully added'))
        .catch((error) => console.log(error))
} */