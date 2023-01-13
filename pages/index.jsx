import React from "react";
import Link from 'next/link';

const App = () => {
  return (
    <div>
      <button>
        <Link href="/calendar">Calendar</Link>
      </button>
    </div>
  )
}

export default App;
