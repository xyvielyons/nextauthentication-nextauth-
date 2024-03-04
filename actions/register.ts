"use server"
import * as z from "zod"
import { RegisterSchema } from "@/schemas";
export const Register = async (values:z.infer<typeof LoginSchema>)=>{
    const validatedFields = RegisterSchema.safeParse(values)

    if(!validatedFields.success){
        return {error:"Invalid fields"}
    }
   return {success:"Email sent!"}
    
}