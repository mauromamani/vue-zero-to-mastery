import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBKgqaCwNmHsAuSri7jNyQjoNzkwyB32WM',
  authDomain: 'vue-music-app-92114.firebaseapp.com',
  projectId: 'vue-music-app-92114',
  storageBucket: 'vue-music-app-92114.appspot.com',
  messagingSenderId: '1069331537545',
  appId: '1:1069331537545:web:25df00b041bb307af4b058',
};

firebase.initializeApp(firebaseConfig);

// Firebase services
const getAuth = firebase.auth();
const getFirestore = firebase.firestore();
const getStorage = firebase.storage();

// Collections
const usersCollection = getFirestore.collection('users');
const songsCollection = getFirestore.collection('songs');
const commentsCollection = getFirestore.collection('comments');

export {
  getAuth,
  getFirestore,
  getStorage,
  usersCollection,
  songsCollection,
  commentsCollection,
};
