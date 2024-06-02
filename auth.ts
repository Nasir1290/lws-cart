import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { compare } from 'bcryptjs'
import NextAuth, { type User } from 'next-auth'
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
   debug: true,
   providers: [
      Facebook({
         clientId: process.env.AUTH_FACEBOOK_ID,
         clientSecret: process.env.AUTH_FACEBOOK_SECRET,
         authorization: {
            params: { access_type: 'offline' },
         },
      }),
      Google({
         clientId: process.env.AUTH_GOOGLE_ID,
         clientSecret: process.env.AUTH_GOOGLE_SECRET,
         // Google requires "offline" access_type to provide a `refresh_token`
         authorization: {
            params: { access_type: 'offline', prompt: 'consent' },
         },
      }),
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

            return user
         },
      }),
   ],
   callbacks: {
      async jwt({ token, account, profile, user }: any) {
         if (account) {
            const userProfile: User = {
               id: token.sub,
               name: profile?.name,
               email: profile?.email,
               image: token?.picture,
            }
            return {
               access_token: account.access_token,
               expires_at: account.expires_at,
               refresh_token: account.refresh_token,
               user: userProfile,
            }
         } else if (Date.now() < token.expires_at * 1000) {
            // if the `access_token` is still valid, return the JWT
            return token
         } else {
            // if the `access_token` has expired, try to refresh it
            if (!token.refresh_token) throw new Error('Missing refresh token')

            try {
               let response
               if (account?.provider === 'google') {
                  response = await fetch(
                     'https://oauth2.googleapis.com/token',
                     {
                        headers: {
                           'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: new URLSearchParams({
                           client_id: process.env.AUTH_GOOGLE_ID!,
                           client_secret: process.env.AUTH_GOOGLE_SECRET!,
                           grant_type: 'refresh_token',
                           refresh_token: token.refresh_token!,
                        }),
                        method: 'POST',
                     },
                  )
               } else if (account?.provider === 'facebook') {
                  response = await fetch(
                     'https://graph.facebook.com/v10.0/oauth/access_token',
                     {
                        headers: {
                           'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: new URLSearchParams({
                           client_id: process.env.AUTH_FACEBOOK_ID!,
                           client_secret: process.env.AUTH_FACEBOOK_SECRET!,
                           grant_type: 'refresh_token',
                           refresh_token: token.refresh_token!,
                        }),
                        method: 'POST',
                     },
                  )
               } else {
                  return { ...token }
               }

               const responseTokens = await response.json()

               if (!response.ok) throw responseTokens

               console.log('Token response', responseTokens)

               return {
                  // Keep the previous token properties
                  ...token,
                  access_token: responseTokens.access_token,
                  expires_at: Math.floor(
                     Date.now() / 1000 + (responseTokens.expires_in as number),
                  ),
                  refresh_token:
                     responseTokens.refresh_token ?? token.refresh_token,
               }
            } catch (error) {
               console.error('Error refreshing access token', error)
               return { ...token, error: 'RefreshAccessTokenError' as const }
            }
         }
      },
      async session({ session, token }: any) {
         if (token.user) {
            session.user = token.user as User
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
