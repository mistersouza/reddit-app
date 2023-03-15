import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

export const createUser = functions.auth
    .user()
    .onCreate(async(user) => {
        const { uid, email, displayName, photoURL } = user;
        
        db.collection("users")
        .doc(user.uid)
        .set({ uid, email, displayName, photoURL });
    });
