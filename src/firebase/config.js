import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBeYxiajCA0F8GfxHVTfO4-J3MZVE7-1l8',
  authDomain: 'wealthyleaf-6ada6.firebaseapp.com',
  projectId: 'wealthyleaf-6ada6',
  storageBucket: 'wealthyleaf-frontend.appspot.com',
  messagingSenderId: '1234567890',
  appId: '1:1234567890:web:abcdef123456',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };