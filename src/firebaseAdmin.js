import { initializeApp } from 'firebase-admin/app';

export const adminApp = initializeApp({
    credential: applicationDefault(),
    databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});