"use client"
import React, { useState } from 'react'
import { CardWrapper } from './card-wrapper'
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import {
Form,
FormControl,
FormField,
FormItem,
FormLabel,
FormMessage
} from "@/components/ui/form"
import * as z from "zod"
import { ResetSchema } from '@/schemas'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import {Reset} from "@/actions/reset"
import { useTransition } from 'react'
export default function ResetForm() {
  const [isPending,startTransition] = useTransition()
  const [error,setError] = useState<string | undefined>("")
  const [success,setSuccess] = useState<string | undefined>("")
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver:zodResolver(ResetSchema),
    defaultValues:{
      email:""
    }
  })
  const onSubmit = (values:z.infer<typeof ResetSchema>)=>{
    setSuccess("")
    setError("")
    console.log(values)
    startTransition(()=>{
      Reset(values).then((data:any)=>{
         setError(data?.error)
        setSuccess(data?.success)
        console.log(data)
      })

    })
  
  }

  return (
    <CardWrapper
    headerLabel='Forgot your password'
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
            name="email"
            render={({field})=>(
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                  {...field}
                  placeholder='john.doe@example.com'
                  type="email"
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
          <Button type='submit' disabled={isPending} className='w-full'>Send Reset email</Button>

        </form>
      </Form>
    </CardWrapper>
  )
}
