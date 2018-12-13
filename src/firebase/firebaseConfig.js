import * as firebase from 'firebase';

const config = {
  apiKey: 'your-api-key',
  authDomain: 'domain-name',
  databaseURL: 'doamin-name',
  projectId: 'your-project',
  storageBucket: '79df8.appspot.com',
  messagingSenderId: '948901872239',
};
firebase.initializeApp(config);

const databaseRef = firebase.database().ref();
const userRef = databaseRef.child('users');

export default userRef;
