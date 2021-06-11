import { useState, useEffect } from "react";
import Firebase from "../utils/Firebase";

// ↓ user に uid と email を object として代入。
const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
});

// この hooks の役割は？
// 結果としてこの hooks が Context にユーザー情報を持たせることになる。と思う。

// export default function useFirebaseAuth() {
export const useFirebaseAuth = () => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ↓ formatAuthUser の user.id と user.email を Loading した後に authState に持たせる。
  const authStateChanged = async (authState) => {
    // ↓ authState が無い場合、 AuthUser を null で上書きし、 Loading はしない。
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    // ↓ ver から const へ変更
    const formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  // ↓ AuthUser 情報を null で初期化し、 lading する。
  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  // Firebase.js から import された情報をそれぞれに代入、return,export.
  const signInWithEmailAndPassword = (email, password) =>
    Firebase.auth().signInWithEmailAndPassword(email, password);

  const createUserWithEmailAndPassword = (email, password) =>
    Firebase.auth().createUserWithEmailAndPassword(email, password);

  // ............................................ ↓ then() メソッドは Promise を返します。最大2つの引数、 Promise が成功した場合と失敗した場合のコールバック関数を取ります。
  // Promise オブジェクトは非同期処理の最終的な完了処理 (もしくは失敗) およびその結果の値を表現します。
  // callback function 関数の引数に用いられる関数。
  // ここでは clear function が実行される。
  const signOut = () => Firebase.auth().signOut().then(clear);

  // [] なので、親が再レンダリングされない限り、再レンダリングされない。はず。
  useEffect(() => {
    const unsubscribe = Firebase.auth().onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    // ↓ authUser と loading ,ハイライト当たってないし、ミュートしてもエラーが出ないので使われていない？ setAuthUser を定義するには必要だと思われるが・・・❓
    authUser,
    loading,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
  };
};
