import NextAuth,{DefaultSession} from "next-auth"
import authConfig from "@/auth.config"
import {PrismaAdapter} from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { getUserById } from "@/data/user"
import { UserRole } from "@prisma/client"
import { TwoFactorConfirmation } from "@prisma/client"
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages:{
    signIn:"/auth/login",
    error:"/auth/error"
  },
  events:{
    async linkAccount({user}){
      await db.user.update({
        where:{id:user.id},
        data:{emailVerified:new Date()}

      })
    }

  },
  callbacks:{
    async signIn({user,account}){
      //allow Oauth without email verification
      if(account?.provider !== "credentials") return true
       const existingUser = await getUserById(user.id);
       //prevent sign in without email verification
      if(!existingUser || !existingUser.emailVerified){
        return false
      }

      //Add 2fa check
     
      if(existingUser.isTwoFactorEnabled){
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
        console.log(twoFactorConfirmation)
        if(!twoFactorConfirmation) return false

        //delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where:{id:twoFactorConfirmation.id}
        })
      }

       return true
    },
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
      if(token.isTwoFactorEnabled && session.user){
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as Boolean
      }
      return session
    },
    async jwt({token}){
      
     token.customField = "test"
     if(!token.sub) return token;
     const existingUser = await getUserById(token.sub)
     if(!existingUser) return token
    token.role = existingUser.role
    token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

      return token
    }
  },
  adapter:PrismaAdapter(db),
  session:{strategy:"jwt"},
  ...authConfig,
  
})