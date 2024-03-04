"use server"
import * as z from "zod"
import bcrypt from "bcrypt"
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
export const Register = async (values:z.infer<typeof RegisterSchema>)=>{
    const validatedFields = RegisterSchema.safeParse(values)
    
    if(!validatedFields.success){
        return {error:"Invalid fields"}
    }

    const {name,email,password} = validatedFields.data
    const hashedPassword = await bcrypt.hash(password,10)
    const existingUser = await getUserByEmail(email)
    if(existingUser){
        return{error:"Email already in use"}
    }
    await db.user.create({
        data:{
            name,
            email,
            password:hashedPassword
        }
    })

    //Todo:send verification email later

   return {success:"user created"}
    
}