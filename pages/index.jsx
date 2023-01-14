import React from "react";
import Link from 'next/link';
import Component from './components/login-btn.jsx'

const App = () => {
  return (
    <div>
      <button>
        <Link href="/calendar">Calendar</Link>
      </button>
      <Component />
    </div>

  )
}

export default App;
