import { auth } from "@/auth"
import { UserInfo } from "@/components/user-info"
import { currentUser } from "@/lib/auth"
export default async function ServerPage() {
    const user = await currentUser()
  return (
    <div>
        <UserInfo user={user} label="💻 Server component"></UserInfo>
    </div>
  )
}
