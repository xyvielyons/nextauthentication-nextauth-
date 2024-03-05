import NextAuth,{DefaultSession} from "next-auth"
import authConfig from "@/auth.config"
import {PrismaAdapter} from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { getUserById } from "@/data/user"
import { UserRole } from "@prisma/client"


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  callbacks:{
    // async signIn({user}){
    //   console.log("userr",user)
    //   const existingUser = await getUserById(user.id);
    //   if(!existingUser || !existingUser.emailVerified){
    //     return false
    //   }

    //    return true
    // },
    // async signIn({ account, profile }) {
    //   if (account.provider === "google") {
    //     return profile.email_verified && profile.email.endsWith("@example.com")
    //   }
    //   return true // Do different verification for other providers that don't have `email_verified`
    // },
    async session({token,session}){
      if(session.user){
        session.user.customField = token.customField
      }
      if(token.sub && session.user){
        session.user.id = token.sub
      }
      if(token.role && session.user){
        session.user.role = token.role as UserRole
      }
      return session
    },
    async jwt({token}){
      
     token.customField = "test"
     if(!token.sub) return token;
     const existingUser = await getUserById(token.sub)
     if(!existingUser) return token
    token.role = existingUser.role

      return token
    }
  },
  adapter:PrismaAdapter(db),
  session:{strategy:"jwt"},
  ...authConfig,
  
})