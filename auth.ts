import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { compare } from 'bcryptjs'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Facebook from 'next-auth/providers/facebook'
import Google from 'next-auth/providers/google'

import clientPromise from './db/client-promise'
import { mongoConnect } from './db/mongo-connect'
import { User as UserModel } from './models/user'

export const { handlers, signIn, signOut, auth } = NextAuth({
   adapter: MongoDBAdapter(clientPromise, {
      databaseName: 'shadhin-shop',
   }),
   session: { strategy: 'jwt' },
   providers: [
      Facebook,
      Google,
      Credentials({
         credentials: {
            email: {},
            password: {},
         },
         authorize: async (credentials: any) => {
            if (!credentials) return null
            const { email, password } = credentials
            let user = null
            await mongoConnect()
            user = await UserModel.findOne({ email })
            if (!user) throw new Error('User not found.')
            if (!user?.password)
               throw new Error('Only Social login available with this email')

            const isMatched = await compare(password, user.password)
            if (!isMatched) throw new Error('Invalid email or password')
            console.log({ ...user._doc, id: user._doc._id.toString() })
            return { ...user._doc, id: user._doc._id.toString() }
         },
      }),
   ],
   callbacks: {
      async jwt({ token, user }) {
         if (user) {
            token.id = user.id
         }
         return token
      },
      async session({ session, token }) {
         if (token?.id) {
            session.user.id = token.id as string
         }
         return session
      },
   },
})

declare module 'next-auth' {
   interface Session {
      error?: 'RefreshAccessTokenError'
   }
}
