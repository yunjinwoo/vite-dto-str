//import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyChNdhyrJ96Xuh9w4xrHjMQDqiGHEFd6M8",
    authDomain: "jinwoo-gpt4o-test.firebaseapp.com",
    projectId: "jinwoo-gpt4o-test",
    storageBucket: "jinwoo-gpt4o-test.appspot.com",
    messagingSenderId: "567417946132",
    appId: "1:567417946132:web:7feb30d6a6a24550bea701",
    measurementId: "G-9DCVXNDELX"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  //const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

export { db };
