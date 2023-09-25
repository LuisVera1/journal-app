// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAVJTxCtblTN6Q4G5lZdBQhQWTA9LH3eqU',
	authDomain: 'journal-app-4d1c6.firebaseapp.com',
	projectId: 'journal-app-4d1c6',
	storageBucket: 'journal-app-4d1c6.appspot.com',
	messagingSenderId: '694853744707',
	appId: '1:694853744707:web:d4649e2a14404f7e347cf6',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);
