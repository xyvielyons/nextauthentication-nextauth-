"use client"

import { useCurrentUser } from "@/hooks/use-current-user"
import { useSession,signOut } from "next-auth/react"

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
    <div>
        {JSON.stringify(user)}
        <button onClick={onClick}>Sign Out</button>
    </div>
  )
}
