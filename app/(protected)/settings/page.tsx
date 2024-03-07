"use client"
import { useTransition,useState } from "react"
import { useSession } from "next-auth/react"
import * as z from "zod"
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// import { useCurrentUser } from "@/hooks/use-current-user"
// import { useSession,signOut } from "next-auth/react"
import { SettingsSchema } from "@/schemas"
import {Card,CardHeader,CardContent} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { settings } from "@/actions/settings"
import { useCurrentUser } from "@/hooks/use-current-user"
import { FormSuccess } from "@/components/form-success"
import { FormError } from "@/components/form-error"
export default function SettingsPage() {
const user = useCurrentUser()
const [error,setError] = useState<string | undefined>()
  
const [success,setSuccess] = useState<string | undefined>()
  
  //server
// const session = await auth()

//client
// const session = useSession()

// const user = useCurrentUser()
// const onClick=()=>{
//   signOut()
// }
const [isPending,startTransition] = useTransition()
const form = useForm<z.infer<typeof SettingsSchema>>({
  resolver:zodResolver(SettingsSchema),
  defaultValues:{
    name:user?.name || undefined
  }
})
const {update} = useSession()
const onSubmit = (values:z.infer<typeof SettingsSchema>)=>{
  startTransition(()=>{
    settings(values).then((data)=>{
      if(data.error){
          setError(data.error)
      }
      if(data.success){
        update()
          setSuccess(data.success)
      }
    }).catch(()=>setError("something went wrong"))

  })
  
}
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">⚙️ settings</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
            <FormField 
            control={form.control}
            name="name"
            render={({field})=>(
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                  {...field}
                  placeholder="John Doe"
                  disabled={isPending}
                  ></Input>

                </FormControl>
              </FormItem>
            )}
            />
            </div>
            <FormError message={error}/>
            <FormSuccess message={success}/>

            <Button type="submit" disabled={isPending}>Save</Button>

          </form>

        </Form>
      </CardContent>

    </Card>
  )
}
