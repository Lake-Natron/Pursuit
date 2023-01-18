import React from "react";
import Link from 'next/link';
<<<<<<< HEAD
import { signIn } from 'next-auth/react'
=======
import NavBar from '../src/navBar';
>>>>>>> signup-page

const App = () => {
  return (
    <div>
      <NavBar />
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
