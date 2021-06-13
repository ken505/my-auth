import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthUserContext";

const LoggedIn = () => {
  // ❗️ named mport した要素 を定数に代入してから使わなくてはいけない理由を説明できない。( JavaScript の勉強不足 )
  const { authUser, loading, signOut } = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed.
  // loading と authUserの変更をリッスンし、必要に応じて redirect します。
  // loading と authUser が無かったら / page へ遷移。
  // authUser と loading に変更があったら ↑ を発火。
  useEffect(() => {
    if (!loading && !authUser) router.push("/");
  }, [authUser, loading]);

  return (
    <div>
      <p>logged_in page</p>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
};
// pages 配下ファイルの export 先って _app よね❓ 書いてはないけれど。
export default LoggedIn;
