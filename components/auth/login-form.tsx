"use client"
import React from 'react'
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
import { LoginSchema } from '@/schemas'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { log } from 'console'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'


export default function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver:zodResolver(LoginSchema),
    defaultValues:{
      email:"",
      password:""
    }
  })
  const onSubmit = (values:z.infer<typeof LoginSchema>)=>{
console.log(values)
  }

  return (
    <CardWrapper
    headerLabel='Welcome back'
    backButtonLabel="Don't have an account?"
    backButtonHref='/auth/register'
    showSocial={true}
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
                  placeholder='************'
                  type="password"
                  ></Input>
                </FormControl>
                <FormMessage/>

              </FormItem>
            )}
            />

          </div>
          <FormError message=''></FormError>
          <FormSuccess message="Authentication accepted"></FormSuccess>
          <Button type='submit' className='w-full'>Login</Button>

        </form>
      </Form>
    </CardWrapper>
  )
}
