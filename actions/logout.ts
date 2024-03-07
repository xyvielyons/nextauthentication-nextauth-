"use server";

import { signOut } from "@/auth";
export const logout = async ()=>{

    //some server stuff before logging out the user
    await signOut()
}