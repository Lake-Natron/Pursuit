import React , { useEffect } from 'react';
import { useSession, signOut } from "next-auth/react";
import Router from 'next/router'


function ProtectedUser(props) {
  const { status, data } = useSession();
  console.log(data);


  useEffect(() => {
    if (status === "unauthenticated" || data?.user.role !== 'seeker') Router.replace("/login");
  }, [status])

    if (status === "authenticated") {
      return (
        <div>
          <div>
            You are authenticated as a Job Seeker
          </div>
          <div>
            {'signed in as ' + data?.user.name}
          </div>
          <div>
            {'user ID: ' + data?.user.id}
          </div>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      )
    }

    return <div>loading</div>
}

export default ProtectedUser;