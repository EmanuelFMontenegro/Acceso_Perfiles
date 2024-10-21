import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAtk515-h3bF2Wq-2VkAoP_9bBiqe4HgXs',
  authDomain: 'users-roles-69679.firebaseapp.com',
  projectId: 'users-roles-69679',
  storageBucket: 'users-roles-69679.appspot.com',
  messagingSenderId: '623051501259',
  appId: '1:623051501259:web:353be7ff5fd33a8afa754e',
};

// Inicializar la aplicación
const app = initializeApp(firebaseConfig);

export const environment = {
  production: true,
  firebase: firebaseConfig,
};
