import React , { useEffect } from 'react';
import { useSession } from "next-auth/react";
import Router from 'next/router'


function ProtectedUser(props) {
  const { status, data }= useSession();
  console.log(data);


  useEffect(() => {
    if (status === "unauthenticated" || data?.user.role !== 'user') Router.replace("/login");
  }, [status])

    if (status === "authenticated") {
      return (
        <div>
          You are authenticated as a Job Seeker
        </div>
      )
    }

    return <div>loading</div>
}

export default ProtectedUser;