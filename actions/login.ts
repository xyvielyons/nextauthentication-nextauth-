"use server"
import * as z from "zod"
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { db } from "@/lib/db";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "@/data/user";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { generateVerificationToken,generateTwoFactorToken } from "@/lib/tokens";
import { sendVerificationEmail,sendTwoFactorTokenEmail } from "@/lib/mail";
export const Login = async (values:z.infer<typeof LoginSchema>)=>{
    const validatedFields = LoginSchema.safeParse(values)

    if(!validatedFields.success){
        return {error:"Invalid fields"}
    }
   const {email,password,code} = validatedFields.data
   console.log(validatedFields.data)

   const existingUser = await getUserByEmail(email);
   if(!existingUser || !existingUser.email || !existingUser.password){
    return {error:"Email does not exist"}
   }
   if(!existingUser.emailVerified){
    const verificationToken = await generateVerificationToken(existingUser.email)
    return {success:"confirmation email sent"}
   
   }

   if(existingUser.isTwoFactorEnabled && existingUser.email){
    if(code){
        console.log(code)
        const twoFactorToken = await getTwoFactorTokenByEmail(
            existingUser.email
        )
        if(!twoFactorToken){
            return {error:"Invalid code!"}
        }
        if(twoFactorToken.token !== code){
            return {error:"invalid code"}
        }
        const hasExpired = new Date(twoFactorToken.expires) < new Date()
        if(hasExpired){
            return {error:"Code expired"}
        }
        await db.twoFactorToken.delete({
            where:{id:twoFactorToken.id}
        })
        const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
        if(existingConfirmation){
            await db.twoFactorConfirmation.delete({
                where:{id:existingConfirmation.id}
            })
        }
        await db.twoFactorConfirmation.create({
            data:{
                userId:existingUser.id
            }
        })
    }else{
    const twoFactorToken = await generateTwoFactorToken(existingUser.email)

    await sendTwoFactorTokenEmail(
        twoFactorToken.email,
        twoFactorToken.token
    )
    console.log("sent")
    return {twoFactor:true}

   }
}

try {
    await signIn("credentials",{
        email,password,redirectTo:DEFAULT_LOGIN_REDIRECT,
    })
    
} catch (error) {
    if(error instanceof AuthError){
        switch(error.type){
            case "CredentialsSignin":
            return {error:"Invalid credentials"}
            default:
            return {error:"Something went wrong"}
        }
    }
    throw error;
    
}
    
}