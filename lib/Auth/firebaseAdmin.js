import * as firebaseAdmin from 'firebase-admin'

if(!firebaseAdmin.apps.length){
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert({
            privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
            clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
            projectId: process.env.FIREBASE_PROJECT_ID
        }),
        databaseURL: 'https://hurwitzviolins2021.firebaseio.com'
    })
}

export { firebaseAdmin }