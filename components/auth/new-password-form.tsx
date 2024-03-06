"use client"
import React, { useState } from 'react'
import { CardWrapper } from './card-wrapper'
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import { useSearchParams } from 'next/navigation'
import {
Form,
FormControl,
FormField,
FormItem,
FormLabel,
FormMessage
} from "@/components/ui/form"
import * as z from "zod"
import { NewPasswordSchema } from '@/schemas'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { newPassword } from '@/actions/new-password'
import { useTransition } from 'react'

export default function NewPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
 

  const [isPending,startTransition] = useTransition()
  const [error,setError] = useState<string | undefined>("")
  const [success,setSuccess] = useState<string | undefined>("")
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver:zodResolver(NewPasswordSchema),
    defaultValues:{
      password:""
    }
  })
  const onSubmit = (values:z.infer<typeof NewPasswordSchema>)=>{
    setSuccess("")
    setError("")
    console.log(values)
    startTransition(()=>{
      newPassword(values,token).then((data:any)=>{
         setError(data?.error)
        setSuccess(data?.success)
        console.log(data)
      })

    })
  
  }

  return (
    <CardWrapper
    headerLabel='Enter a new password'
    backButtonLabel="Back to login"
    backButtonHref='/auth/login'
    >
      <Form {...form}>
        <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6'
        >
          <div className='space-y-4'>
            <FormField
            control={form.control}
            name="password"
            render={({field})=>(
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                  {...field}
                  placeholder='******'
                  type="password"
                  disabled={isPending}
                  ></Input>
                </FormControl>
                
                <FormMessage/>

              </FormItem>
            )}
            />

          
          </div>
          <FormError message={error}></FormError>
          <FormSuccess message={success}></FormSuccess>
          <Button type='submit' disabled={isPending} className='w-full'>Reset Password</Button>

        </form>
      </Form>
    </CardWrapper>
  )
}
