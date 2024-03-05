import { auth,signOut } from "@/auth"
import { Button } from "@/components/ui/button"
export default async function SettingsPage() {
const session = await auth()
session?.user
  return (
    <div>
        {JSON.stringify(session)}
        <form action={async ()=>{
          "use server"
          await signOut()
        }}>
          <Button type="submit" variant="outline">
            Sign out
          </Button>
        </form>
    </div>
  )
}
