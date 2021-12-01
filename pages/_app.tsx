import type { AppProps } from "next/app";
import { wrapper } from "../redux";
import "../assets/scss/globals.scss";
import { useTypedSelector } from "../hooks";

function MyApp({ Component, pageProps }: AppProps) {
  const {
    data,
    // : { token, type },
    loading,
    error,
  } = useTypedSelector((state) => state.auth);
  console.log(data);
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
