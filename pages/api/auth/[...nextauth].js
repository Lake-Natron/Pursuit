import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials'
// import GoogleProvider from "next-auth/providers/google"
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"
// import GitHubProvider from 'next-auth/providers/github'


export default NextAuth({
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      authorize(credentials, req) {
        const {email, password} = credentials;


        if (email === 'andy@gmail.com' && password === '1234') {
          const user = {id: '1234', name: "John Doe", email: "john@gmail.com", role: "user"};
          return {id: '1234', name: "John Doe", email: "john@gmail.com", role: "user"};
        }

        if (email === 'employer@gmail.com' && password === "1234") {
          const user = {id: '1234', name: "John Doe", email: "john@gmail.com", role: "user"};
          return {id: '1234', name: "John Doe", email: "john@gmail.com", role: "employer"};
        }

        throw new Error('invalid credentials')

        if (email !== 'andy@gmail.com' || password !== '1234') {
          throw new Error('invalid credentials')
        }

        //perform your login logic
        //find user from db
        return {id: '1234', name: "John Doe", email: "john@gmail.com"};
      }
    })
  ],
  pages: {
    signIn: "../../login",
    //error page
    //signout page
  },
  callbacks: {
    async session({ session, token}) {
      const user = {id: '1234', name: "John Doe", email: "john@gmail.com", role: "employer"};
      session.user.role = user.role; // Add role value to user object so it is passed along with session
      return session;
    }
  }
})


// export default NextAuth({
//   providers: [
//     // OAuth authentication providers
//     // AppleProvider({
//     //   clientId: process.env.APPLE_ID,
//     //   clientSecret: process.env.APPLE_SECRET,
//     // }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//     // Sign in with passwordless email link
//     // EmailProvider({
//     //   server: process.env.MAIL_SERVER,
//     //   from: "<no-reply@example.com>",
//     // }),
//   ],
// })