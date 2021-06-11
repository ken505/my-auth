// ↓ ( Modules ) firebase instande app を Firebase として import. 
import Firebase from "firebase/app";

// ↓ ( Modules ) デフォルトのアプリまたは特定のアプリの認証サービスを取得します。
// auth() を呼び出せば、 firebase auth にアクセスできる。ということだと思う。
// firebase.auth(app) を使用して、特定のアプリに関連付けられている認証サービスにアクセスします。
// ↓ しかし、 ❓どこでどう使っているのかわからない。
// ミュート時のエラー文は、
// Unhandled Runtime Error TypeError: _utils_Firebase__WEBPACK_IMPORTED_MODULE_3__.default.auth is not a function.
// default.auth は関数ではありませんと怒られるが？？
import "firebase/auth";

// ↓ Firebase の資格情報
const FirebaseCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

// if a Firebase instance doesn't exist, create one.
// Firebase インスタンスが存在しない場合は作成。
// ......... ↓ firebase variavles apps （読み取り専用）初期化されたすべてのアプリの配列。
if (!Firebase.apps.length) {
  // ..... ↓ Firebaseアプリインスタンスを作成して初期化するメソッド。
  Firebase.initializeApp(FirebaseCredentials);
}
// Firebase 資格情報(Key, Domain, Id)を expoert.
export default Firebase;
