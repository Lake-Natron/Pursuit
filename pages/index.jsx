import React from "react";
import Link from 'next/link';




const App = () => {

  
  return (
    
      <div>
        <Link href="/calendar">Calendar</Link>
        <Link href="/homeJobSeeker"> Home Job Seeker </Link>
        <Link href="/jobSearch">Job Search</Link>
      </div>
  )
}

export default App;
