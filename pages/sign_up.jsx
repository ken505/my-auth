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

  const onSubmit = (event) => {
    setError(null);
    //check if passwords match. If they do, create user in Firebase
    // and redirect to your logged in page.
    if (passwordOne === passwordTwo)
      createUserWithEmailAndPassword(email, passwordOne)
        .then((authUser) => {
          console.log("Success. The user is created in Firebase");
          router.push("/logged_in");
        })
        .catch((error) => {
          // An error occurred. Set error message to be displayed to user
          setError(error.message);
        });
    else setError("Password do not match");
    event.preventDefault();
  };

  return (
    <div>
      <h1>Create an account</h1>
      <form className="custom-form" onSubmit={onSubmit}>
        {error && <alert color="danger">{error}</alert>}
        <div>
          <label for="signUpEmail">Email</label>
        </div>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          name="email"
          id="signUpEmail"
          placeholder="Email"
        />
        <div>
          <br />
          <label for="signUpPassword" sm={4}>
            Password
          </label>
        </div>
        <input
          type="password"
          name="passwordOne"
          value={passwordOne}
          onChange={(event) => setPasswordOne(event.target.value)}
          id="signUpPassword"
          placeholder="Password"
        />
        <div>
          <br />
          <label for="signUpPassword2" sm={4}>
            Confirm Password
          </label>
        </div>
        <input
          type="password"
          name="password"
          value={passwordTwo}
          onChange={(event) => setPasswordTwo(event.target.value)}
          id="signUpPassword2"
          placeholder="Password"
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
