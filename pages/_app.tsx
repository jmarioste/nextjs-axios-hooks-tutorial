import "../styles/globals.css";
import type { AppProps } from "next/app";
import { loadCache } from "axios-hooks";

function MyApp({ Component, pageProps }: AppProps) {
  loadCache(pageProps.__CACHE__ ?? []);
  return <Component {...pageProps} />;
}

export default MyApp;
