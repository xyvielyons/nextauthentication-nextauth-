"use client"
import { useTransition,useState } from "react"
import { useSession } from "next-auth/react"
import * as z from "zod"
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select"
import {useForm} from "react-hook-form"
import { Switch } from "@/components/ui/switch"
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
import { UserRole } from "@prisma/client"
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
    name:user?.name || undefined,
    email:user?.email || undefined,
    password:undefined,
    newPassword:undefined,
    role:user?.role || undefined,
    isTwoFactorEnabled:user?.isTwoFactorEnabled as boolean  || undefined
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
                <FormMessage/>
              </FormItem>
            )}
            />
            {user?.isOAuth === false && 
            <>
            <FormField 
            control={form.control}
            name="email"
            render={({field})=>(
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                  {...field}
                  placeholder="JohnDoe@example.com"
                  type="email"
                  disabled={isPending}
                  ></Input>

                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
            />
            <FormField 
            control={form.control}
            name="password"
            render={({field})=>(
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                  {...field}
                  placeholder="********"
                  type="password"
                  disabled={isPending}
                  ></Input>

                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
            />
            <FormField 
            control={form.control}
            name="newPassword"
            render={({field})=>(
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                  {...field}
                  placeholder="********"
                  type="password"
                  disabled={isPending}
                  ></Input>

                </FormControl>
              </FormItem>
            )}
            />
            </>
            }
            
            
            <FormField 
            control={form.control}
            name="role"
            render={({field})=>(
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                disabled={isPending}
                onValueChange={field.onChange}
                defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="select a role"/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={UserRole.ADMIN}>
                      Admin
                    </SelectItem>
                    <SelectItem value={UserRole.USER}>
                      User
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage/>
                
              </FormItem>
            )}
            />
            {user?.isOAuth === false && 
            <>
            <FormField 
            control={form.control}
            name="isTwoFactorEnabled"
            render={({field})=>(
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Two Factor Authentication</FormLabel>
                  <FormDescription>Enable two factor authentication for your account</FormDescription>

                </div>
                <FormControl>
                  <Switch
                  disabled={isPending}
                  checked = {field.value}
                  onCheckedChange={field.onChange}
                  ></Switch>
                </FormControl>
              </FormItem>
            )}
            />
            </>
}
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
