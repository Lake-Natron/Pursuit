import * as React from "react";
import '../public/main.css';
import React from 'react';
import { SessionProvider } from "next-auth/react"
import PropTypes from "prop-types";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
const lora = require("@fontsource/lora");
const montserrat = require("@fontsource/montserrat");
import theme from "../src/theme";

// export default function MyApp({ Component, pageProps: {session, ...pageProps}, }) {
//   return (
//     <SessionProvider session={session}>
//       <Component {...pageProps} />
//     </SessionProvider>
//   )
// }

export default function MyApp(props) {
  const { Component, pageProps : {session, ...pageProps} } = props;

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
