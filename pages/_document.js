import { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

export default function Document() {
  return (
    <Html>
      <Head>
        <link href='https://fonts.googleapis.com/css?family=Montserrat&display=optional' rel='stylesheet' />
        <link href='https://fonts.googleapis.com/css?family=Lora&display=optional' rel='stylesheet' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}