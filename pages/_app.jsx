import "../styles/globals.css";
import { AuthUserProvider } from "../context/AuthUserContext";

// function MyApp({ Component, pageProps }) {
const MyApp = (props) => {
  return (
    <AuthUserProvider>
      <props.Component {...props.pageProps} />
    </AuthUserProvider>
  );
};
export default MyApp;

{
  /* <AuthUserProvider>
      <Component {...pageProps} />
    </AuthUserProvider> */
}