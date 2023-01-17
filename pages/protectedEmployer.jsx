import React , { useEffect } from 'react';
import { useSession, signOut} from "next-auth/react";
import Router from 'next/router'


function ProtectedEmployer(props) {
  const { status, data } = useSession();

  console.log(data?.user)

  useEffect(() => {
    if (status === "unauthenticated" || data?.user.role !== 'company') Router.replace("/login");
  }, [status])

  if (status === "authenticated") {
    return (
      <div>
        <div>
          You are authenticated as a Employer
        </div>
        <div>
          {'signed in as ' + data?.user.name}
        </div>
        <div>
            {'user ID: ' + data?.user.id}
          </div>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }

  return <div>loading</div>
}

export default ProtectedEmployer;