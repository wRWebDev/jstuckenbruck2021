import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore, collection, doc, addDoc, updateDoc, deleteDoc, query, where, limit, startAfter, orderBy, documentId, getDocs, getDoc, Timestamp } from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updatePassword } from 'firebase/auth'

const firebaseSettings = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
}

const app = !getApps().length ? initializeApp( firebaseSettings ) : getApp()
const db = getFirestore()
const auth = getAuth()

export {
    app,
    db,
    collection,
    doc,
    documentId,
    addDoc,
    updateDoc,
    deleteDoc,
    where,
    limit, 
    query,
    startAfter,
    orderBy,
    auth,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    getDocs,
    getDoc,
    Timestamp,
    updatePassword
}
