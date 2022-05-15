import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey:process.env.REACT_APP_FIREBASE_APP_ID, 
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN, 
    projectId:process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket:process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID, 
    appId:process.env.REACT_APP_FIREBASE_APP_ID, 
    measurementId:process.env.REACT_APP_FIREBASE_MEASUREMENT_ID, 
  };

const app = initializeApp(firebaseConfig);


export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoURL;
  
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("profilePic", profilePic);
      })
      .catch((error) => {
        console.log(error);
      });
  };
