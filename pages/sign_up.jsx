import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "../context/AuthUserContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const router = useRouter();
  const [error, setError] = useState(null);

  const { createUserWithEmailAndPassword } = useAuth();

  const onSubmit = (e) => {
    setError(null);
    //check if passwords match. If they do, create user in Firebase
    // and redirect to your logged in page.
    // パスワードが一致するかどうかをチェックします。一致していれば、Firebaseでユーザーを作成し を作成し、ログインしたページにリダイレクトします。
    if (passwordOne === passwordTwo)
      createUserWithEmailAndPassword(email, passwordOne)
        // ..... ↓ 未使用
        // .then((authUser) => {
        .then(() => {
          // console.log("Success. The user is created in Firebase");
          router.push("/logged_in");
        })
        .catch((error) => {
          // An error occurred. Set error message to be displayed to user
          // ユーザーに表示するエラーメッセージの設定
          setError(error.message);
        });
    else setError("Password do not match");
    e.preventDefault();
  };

  return (
    <div>
      <h1>Create an account</h1>
      <form className="custom-form" onSubmit={onSubmit}>
        {/* ↓ toast じゃない version の error 表示 */}
        {error && <p>{error}</p>}
        <div>
          <label>Email</label>
        </div>
        <input
          type="email"
          value={email}
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>
          <br />
          <label>Password</label>
        </div>
        <input
          type="password"
          name="passwordOne"
          value={passwordOne}
          placeholder="Password"
          onChange={(error) => setPasswordOne(e.target.value)}
        />
        <div>
          <br />
          <label>Confirm Password</label>
        </div>
        <input
          type="password"
          name="password"
          value={passwordTwo}
          placeholder="Password"
          onChange={(e) => setPasswordTwo(e.target.value)}
        />
        <br />
        <br />
        <button>Sign Up</button>
      </form>
      <br />
      <button>
        <Link href="/">I'm quitting</Link>
      </button>
    </div>
  );
};
export default SignUp;
