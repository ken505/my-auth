import Firebase from "firebase/app";
import "firebase/auth";

const FirebaseCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

// if a Firebase instance doesn't exist, create one
// Firebase インスタンスが存在しない場合は作成
if (!Firebase.apps.length) {
  Firebase.initializeApp(FirebaseCredentials);
}
export default Firebase;
