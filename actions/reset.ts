"use server"
import * as z from "zod"
import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"

export const Reset = async (values:z.infer<typeof ResetSchema>)=>{
 const validatedFields = ResetSchema.safeParse(values)
 if(!validatedFields.success){
    return{error:"Invalid email!"}
 }
 const {email} = validatedFields.data
 const existingUser = await getUserByEmail(email)
 if(!existingUser){
    return {error:"Email not Found"}
 }

 //generate token and send email
 return {success:"Reset email sent!"}
}