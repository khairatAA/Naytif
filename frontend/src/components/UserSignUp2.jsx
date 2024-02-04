// Second Sign Up page

import { BigGreenButtons, GreenButtons, GreenButtonsWithIcon } from "./Buttons"
import { AuthenticationInput } from "./Reusables"
import google from "../assets/google.svg"
import { Link } from "react-router-dom"
import { ArrowLeft, ArrowRight } from "lucide-react"

// User Sign Up Page
function UserSignUp2() {
    return (
     <div className=" flex flex-col justify-center h-screen">
        <div className=" bg-yellow py-5 pl-5">
            <h1 className="font-logo text-green text-4xl leading-7 font-bold">Naytiv</h1>
        </div> 
        <div className=" bg-light-yellow h-full flex justify-center items-center py-5">
            <div className=" flex flex-col justify-center items-center p-8 border border-green rounded-2xl gap-6">
                <h2 className=" font-bold text-3xl">What's your Name?</h2>
                <div className=" flex flex-col gap-2 w-full">
                    <form action="" method="post" className=" flex flex-col gap-5 w-full">
                        <AuthenticationInput type="text" name="first-name" id="first-mame" autoComplete="name" placeholder="Enter First Name" />
                        <AuthenticationInput type="text" name="last-name" id="last-mame" autoComplete="name" placeholder="Enter Last Name" />
                        <div className=" flex flex-row gap-5 w-full justify-between items-center">
                            <Link to="/auth/sign_up_1" className=" flex justify-center items-center w-12 h-12 rounded-full bg-white border border-green">
                                <ArrowLeft />
                            </Link>
                            <Link to="/auth/success" className="flex items-center px-7 py-3 justify-center rounded-lg bg-green gap-4 hover:bg-black active:bg-green focus:outline-none focus:ring">
                                <span className="text-white text-xl font-sans font-normal">Next</span>
                                <ArrowRight color="white" />
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
     </div>
    )
  }
  
  export default UserSignUp2;