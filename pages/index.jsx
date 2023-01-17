import React from "react";
import Link from 'next/link';
import { signIn } from 'next-auth/react'

const App = () => {
  return (
    <div>
      <button>
        <Link href="/calendar">Calendar</Link>
      </button>
      <button onClick={() => {
        signIn();
      }}>Log In</button>
    </div>

  )
}

export default App;
