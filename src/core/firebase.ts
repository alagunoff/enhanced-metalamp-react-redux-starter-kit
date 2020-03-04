import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAIknzKD3fHzM0lvCUlK1xqB8TiyiUpxwk',
  authDomain: 'training-project-6c8e4.firebaseapp.com',
  databaseURL: 'https://training-project-6c8e4.firebaseio.com',
  projectId: 'training-project-6c8e4',
  storageBucket: 'training-project-6c8e4.appspot.com',
  messagingSenderId: '514734547218',
  appId: '1:514734547218:web:1f26cd8203cfdce2d0d3cb',
};

const configureFirebase = () => firebase.initializeApp(firebaseConfig);
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { configureFirebase, googleProvider, facebookProvider };
