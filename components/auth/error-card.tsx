import { CardWrapper } from "./card-wrapper";
import { FaExclamationTriangle } from "react-icons/fa";


export default function ErrorCard() {
  return (
    <CardWrapper
    headerLabel="Oops something went wrong"
    backButtonHref="/auth/login"
    backButtonLabel="Back to Login"
    >
        <div className="w-full items-center flex justify-center">
        <FaExclamationTriangle className="text-destructive"></FaExclamationTriangle>
        </div>
        
    </CardWrapper>
  )
}
