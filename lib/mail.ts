import {Resend} from "resend"
const resend = new Resend(process.env.RESEND_API_KEY)
const domain = process.env.NEXT_PUBLIC_APP_URL
export const sendTwoFactorTokenEmail = async(
    email:string,
    token:string
)=>{
   await resend.emails.send({
    from:"onboarding@resend.dev",
        to:email,
        subject:"2FA Code",
        html:`<p>Your 2FA code:${token}</p>`

   })
}

export const sendVerificationEmail = async(
    email:string,
    token:string
)=>{
    const confirmLink = `${domain}/auth/new-verification?token=${token}`
    await resend.emails.send({
        from:"onboarding@resend.dev",
        to:email,
        subject:"Confirm your email",
        html:`<p>click <a href="${confirmLink}">here</a> to confirm email</p>`
    })
}
export const sendPasswordResetEmail = async(email:string,token:string)=>{
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`
    await resend.emails.send({
        from:"onboarding@resend.dev",
        to:email,
        subject:"Confirm your email",
        html:`<p>click <a href="${resetLink}">here</a> to reset password</p>`
    })

}