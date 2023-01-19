import React from "react";
import Link from 'next/link';
import NavBar from '../src/navBar';




const App = () => {

  
  return (

    <div>
      <NavBar />
      <button>
        <Link href="/calendar">Calendar</Link>
        <Link href="/homeJobSeeker">Home Job Seeker </Link>
        <Link href="/jobSearch">Job Search</Link>
      </button>
      <button>
        <Link href="/postJob">Post Job</Link>
      </button>
    </div>
  )
}

export default App;
