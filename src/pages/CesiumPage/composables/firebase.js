// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase , ref as firebase_ref, set } from "firebase/database";



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};
// Initialize Firebase
const firebaseDB = initializeApp(firebaseConfig);
const db = getDatabase(firebaseDB);

// User ID for transactions
const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
// Create user id once at the beginning
const userID = uuidv4() 



//to search and replace    
function replaceUndefinedOrNull(key, value) {
  if (value === null || value === undefined || value === "" || value == 0) {
    return undefined;
  }
  
  return value;
}
export async function postFirebase(obj) {
    
    let firebaseSavedObj ={
      ...obj,
      "userID": userID
    }
    set(firebase_ref(db, (new Date()).getTime().toString()),firebaseSavedObj)
    .then(() => {
      return 200
    })
    .catch((error) => {
      alert("Oups something went wrong! We couldn't save your data. Please try again.")
    });
}