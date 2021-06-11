import { createContext, useContext} from "react";
// そもそも Context とは
// コンテクストは各階層で手動でプロパティを下に渡すことなく、コンポーネントツリー内でデータを渡す方法。（生の javascript では this に該当？）
// React コンポーネントのツリーに対して「グローバル」とみなすことができる。
// コンテクストを使用すると、全てのコンポーネントを明示的に通すことなしに
// コンポーネントツリーの深くまで値を渡すことができる。

// createContext とは
// createContext コンテクストオブジェクトを作成。
// React がこのコンテクストオブジェクトが登録されているコンポーネントをレンダーする場合、ツリー内の最もマッチングする現在のコンテクストの値を Provider から読み取ります。

// ? そもそも Provider とは
// 英意日本語直訳 供給者

// Context.Provider
// Example <MyContext.Provider value={/* 何らかの値 */}>
// 全てのコンテクストオブジェクトには Provider コンポーネントが付属しており、これによりコンシューマコンポーネント(値を消費する = 値を受け取るコンポーネントの意味？)はコンテクストの変更を subscribe (許可？登録＝上書き？)できます。

// useContext (基本の hook )
// コンテクストオブジェクト（React.createContext からの戻り値）を受け取り、そのコンテクストの現在値を返します。コンテクストの現在値は、ツリー内でこのフックを呼んだコンポーネントの直近にある <MyContext.Provider> の value の値によって決定されます。

// import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";

const authUserContext = createContext({
  // このアプリでは、 authUserContext hooks を _app で import し、グローバルに
  // authUserContext を受け取れる code になっている。

  // ↓ defaultValue object
  // 👇 authUser を null で初期化❓
  // ↓ オーソライズユーザーの略で認証されたユーザーの意味
  authUser: null,

  // 👇 まずは load するということ❓
  loading: true,

  // async (非同期)
  // 非同期通信は、やり取りする相手からの反応を待たないで次の処理を始める通信です。
  // 相手に要求を投げたら、応答が返ってくるまで待たず次の処理を進めます。

  // async function は呼び出されるとPromiseを返す。
  // Promise オブジェクトは非同期処理の最終的な完了処理 (もしくは失敗) およびその結果の値を表現します。

  // async function が値を return した場合、 Promise は戻り値を resolve (解決)する。
  // async function が例外や何らかの値を throw (投入)した場合はその値を reject (拒否)する。

  // ↓ 電子メールとパスワードを使用して非同期にサインインします。
  // メールアドレスとパスワードが一致しない場合、エラーで失敗します。
  // Official Documents https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithemailandpassword
  signInWithEmailAndPassword: async () => {},

  // ↓ この関数は、新しいユーザー アカウントを作成し、初期ユーザー パスワードを設定します。
  // 電子メール アドレスはユーザーの一意の識別子として機能し、電子メール ベースのパスワード リセットを可能にします。
  // ユーザー アカウントの作成に成功すると、このユーザーはアプリケーションにもサインインします。
  // アカウントがすでに存在するか、パスワードが無効な場合、ユーザー アカウントの作成に失敗する可能性があります。
  // Official Documents https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createuserwithemailandpassword
  createUserWithEmailAndPassword: async () => {},

  // ↓ 現在のユーザーをサインアウトします。
  signOut: async () => {},
});

// ↓ function version
// export function AuthUserProvider({ children }) {

// ↓ Context object をグローバルに持たせることができる component.
// _app にて import.
export const AuthUserProvider = (props) => {
  // ..........↓ hooks を auth へ代入。
  const auth = useFirebaseAuth();
  return (
    // ↓ original writing style version
    // <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>

    // ↓ props children に、 auth へ格納された const authUserContext の Context object (authUser loading signInWithEmailAndPassword createUserWithEmailAndPassword signOut) を持たせる。
    <authUserContext.Provider value={auth}>
      {props.children}
    </authUserContext.Provider>
  );
};

// custom hook to use the authUserContext and access authUser and loading
// authUserContext を使用して authUser にアクセスし、ロードするためのカスタム フック
// 👇 Context object value は AuthUserProvider と全く同じ。リファクタできそう❗️
export const useAuth = () => useContext(authUserContext);
