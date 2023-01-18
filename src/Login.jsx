import React from 'react'
import TextField from '@mui/material/TextField';

function Login() {
  return (
    <div>
      <h2>Log In</h2>
      <form action="">
        <TextField id="outlined-basic" label="Email" variant="outlined" required />
        <TextField id="outlined-basic" label="Password" type="password" variant="outlined" required />
      </form>
    </div>
  )
}

export default Login