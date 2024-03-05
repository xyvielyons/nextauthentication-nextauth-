"use client";
import {BeatLoader,MoonLoader,PacmanLoader,ClimbingBoxLoader,HashLoader,RotateLoader
} from "react-spinners"
import { useCallback,useEffect,useState} from "react";
import {CardWrapper} from "@/components/auth/card-wrapper"
import { useSearchParams } from "next/navigation";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { NewVerification } from "@/actions/new-verification";
export const NewVerificationForm = ()=>{
    const searchParams = useSearchParams()
    const [error,setError] = useState<string | undefined>()
    const [success,setSuccess] = useState<string | undefined>()
    const token = searchParams.get("token")
    const onSubmit = useCallback(()=>{
        if(!token) {
            setError("Missing token!")
            return
        }
       NewVerification(token).then((data)=>{
        setSuccess(data.success)
        setError(data.error)
       }).catch(()=>{
        setError("something went wrong")
       })

    },[token])
    useEffect(()=>{
      onSubmit()
    },[onSubmit])

    
    return(
        <CardWrapper
        headerLabel="Confirming your verification"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
        >
            <div className="flex items-center w-full justify-center">
                {!success && !error && <HashLoader/> }
                
                <FormSuccess message={success}></FormSuccess>
                <FormError message={error}></FormError>
            </div>
        </CardWrapper>
    )
}