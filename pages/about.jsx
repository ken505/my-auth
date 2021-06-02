import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthUserContext";

// import {Container, Row, Col} from 'reactstrap';

const LoggedIn = () => {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser) router.push("/");
  }, [authUser, loading]);

  return (
    <div>
      <p>about</p>
      <Button onClick={signOut}>Sign out</Button>
    </div>
  );
};

export default LoggedIn;
