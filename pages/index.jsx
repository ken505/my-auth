import Link from "next/link";
import { useMemo, useState } from "react";
// ↓ next.js が提供する React hooks です。
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthUserContext";

const Home = () => {
  // ↓ 初期化の定義？
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // ↓ useRouter を router へ代入。
  const router = useRouter();

  // Context で import useAuth function を signInWithEmailAndPassword object へ代入。
  const { signInWithEmailAndPassword } = useAuth();

  const onSubmit = (e) => {
    // ↓ erro の state を null に。（おそらく初期化❓）
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
    // 例外処理の場合は画面遷移させない。
    e.preventDefault();
  };

  // react hot toast の toast を notify へ代入。
  // useMemo で error の値に変化がある時だけ toast 処理を発火。
  // useMemo がないと、 password を修正した文字数分だけ toast が表示される。
  // toast の引数は error とし、 toast の文章として表示される。
  const notify = useMemo(() => toast(error), [error]);
  return (
    <div>
      {/* ↓ エラーの回数が表示されて困っている❗️ */}
      {error && (
        <div>
          {notify} <Toaster />
        </div>
      )}
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Email</label>
        </div>
        <div>
          <input
            //  ↓ 電子メールアドレスを編集するための欄です。 text 入力欄のように見えますが、対応しているブラウザーや動的なキーボードのある端末では、入力値を検証したり、関連するキーボードを表示したりします。
            type="email"
            // ↓ 最初、 HTML で明確に指定された場合は初期値。もっと一般的には、このフォームコントロールの現在の値。名前/値の組の部分としてフォームと一緒に送信される。
            value={email}
            name="email"
            // ↓ フォームコントロールが空の時にフォームコントロール内に表示される内容
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            // ↓ 入力欄コントロールの名前。名前/値の組の部分としてフォームと一緒に送信される
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
