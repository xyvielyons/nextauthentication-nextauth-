"use client";
import {BeatLoader,MoonLoader,PacmanLoader,ClimbingBoxLoader,HashLoader,RotateLoader
} from "react-spinners"
import {CardWrapper} from "@/components/auth/card-wrapper"
export const NewVerificationForm = ()=>{
    return(
        <CardWrapper
        headerLabel="Confirming your verification"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
        >
            <div className="flex items-center w-full justify-center">
                <RotateLoader

                
                />
            </div>
        </CardWrapper>
    )
}