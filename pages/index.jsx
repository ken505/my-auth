import Link from "next/link";
import { useState } from "react";
// ↓ next.js が提供する React hooks です。
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthUserContext";

const Home = () => {
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
        // email password を受け取って合否判定オッケーならログインページへ遷移。
        // ❓合否は firebase 側でやっている、と思う。
        router.push("/logged_in");
      })
      // 例外の場合エラーメッセージを setError へ持たせる。
      .catch((error) => {
        setError(error.message);
      });
    // ↓ イベントが明示的に処理されない場合にその既定のアクションを通常どおりに行うべきではないことを伝えます。
    // 例外処理の場合に画面遷移させないようにしてる❓
    // .then が実行されると preventDefault が実行される前に画面遷移すると予想。
    e.preventDefault();
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        {error && <p>{error}</p>}
        <div>
          <label>Email</label>
        </div>
        <div>
          <input
            //  ↓ 電子メールアドレスを編集するための欄です。 text 入力欄のように見えますが、対応しているブラウザーや動的なキーボードのある端末では、入力値を検証したり、関連するキーボードを表示したりします。
            type="email"
            // ↓ 最初、 HTML で明確に指定された場合は初期値。もっと一般的には、このフォームコントロールの現在の値。名前/値の組の部分としてフォームと一緒に送信される。
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // ↓ 入力欄コントロールの名前。名前/値の組の部分としてフォームと一緒に送信される
            name="email"
            // ↓ フォームコントロールが空の時にフォームコントロール内に表示される内容
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
};
export default Home;
