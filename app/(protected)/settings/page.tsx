"use client"

import { useCurrentUser } from "@/hooks/use-current-user"
import { useSession,signOut } from "next-auth/react"
import { Navbar } from "../_components/navbar"
export default function SettingsPage() {
  //server
// const session = await auth()

//client
// const session = useSession()

const user = useCurrentUser()
const onClick=()=>{
  signOut()
}

  return (
    <div className="bg-white p-4 rounded-xl">
      <Navbar/>
        <button onClick={onClick}>Sign Out</button>
    </div>
  )
}
