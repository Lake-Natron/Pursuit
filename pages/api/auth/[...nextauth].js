import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt';
// import GoogleProvider from "next-auth/providers/google"
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"
// import GitHubProvider from 'next-auth/providers/github'

import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient();

export default NextAuth({

  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const {email, password} = credentials;


        const user = await prisma.User.findUnique({
            where: { email: email }
          });


        if (!user) throw new Error ('Username does not exist')

        //compare password using bcrypt
        const matchPwd = await bcrypt.compare(password, user.password);

        if (!matchPwd) throw new Error ('Please re-enter password')

        return {id: user.id, name: user.first_name + ' ' + user.last_name, email: user.email, role: user.role};
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
      console.log("session", session.user.email)
      const email = session.user.email
      const user = await prisma.User.findUnique({
        where: { email: email }
      });
      session.user.id = user.id;
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