import "../styles/globals.css";
import { AuthUserProvider } from "../context/AuthUserContext";

// function MyApp({ Component, pageProps }) {
const MyApp = (props) => {
  return (
    // ↓ context でラッピングし、 page 全てで Firebase の情報が受け取れるようになっている。という表現でいいかな？
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