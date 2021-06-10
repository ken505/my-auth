import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthUserContext";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { signInWithEmailAndPassword } = useAuth();

  const onSubmit = (event) => {
    setError(null);
    signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        router.push("/logged_in");
      })
      .catch((error) => {
        setError(error.message);
      });
    event.preventDefault();
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
            onChange={(event) => setEmail(event.target.value)}
            name="email"
            id="loginEmail"
            placeholder="Email"
          />
        </div>
        <br />
        <div>
          <label>
            Password
          </label>
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
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
