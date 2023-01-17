import React , { useEffect } from 'react';
import { useSession } from "next-auth/react";
import Router from 'next/router'


function ProtectedEmployer(props) {
  const { status, data } = useSession();

  useEffect(() => {
    if (status === "unauthenticated" || data?.user.role !== 'employer') Router.replace("/login");
  }, [status])

  if (status === "authenticated") {
    return (
      <div>
        Your accessing this as a job employer
      </div>
    );
  }

  return <div>loading</div>
}

export default ProtectedEmployer;