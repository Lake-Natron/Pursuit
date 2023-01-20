import React , { useEffect } from 'react';
import { useSession } from "next-auth/react";
import Router from 'next/router'


function ProtectedRouter(props) {
  const { status, data }= useSession();


  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/login");
  }, [status])

    if (status === "authenticated") {
      return (
        <div>
          You are authenticated as a Job Seeker
        </div>
      )
    }
}

export default ProtectedRouter;