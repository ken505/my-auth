import Link from "next/link";
import { useState } from "react";
// ↓ next.js が提供する React hooks です。
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthUserContext";

export default function Home() {
  // ↓ 初期化の定義？
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // ↓ ❓ page が切り替わるたびに ↑ の初期化処理を走らせると思われる。
  const router = useRouter();

  // Context で import したユーザー情報などを object として定義❓
  const { signInWithEmailAndPassword } = useAuth();

  const onSubmit = (e) => {
    // ↓ erro の state を null に。（エラーリセット的な❓）
    setError(null);
    signInWithEmailAndPassword(email, password)
      // ↓ then() メソッドは Promise を返します。最大2つの引数、 Promise が成功した場合と失敗した場合のコールバック関数を取ります。
      // Promise オブジェクトは非同期処理の最終的な完了処理 (もしくは失敗) およびその結果の値を表現します。
      // ..... ↓ 使っていないとのことなので一旦ミュートに。
      // .then((authUser) => {
      .then(() => {
        router.push("/logged_in");
      })
      .catch((error) => {
        setError(error.message);
      });
    e.preventDefault();
  };

  return (
    <div className=".container">
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        {error && <p>{error}</p>}
        <div>
          <label>Email</label>
        </div>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            id="loginEmail"
            placeholder="Email"
          />
        </div>
        <br />
        <div>
          <label>Password</label>
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="loginPassword"
            placeholder="Password"
          />
        </div>
        <br />
        <button>Login</button>
        <br />
        <p>No account?</p>
        <button>
          <Link href="/sign_up">Create one</Link>
        </button>
      </form>
    </div>
  );
}
