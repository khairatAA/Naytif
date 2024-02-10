import { BigGreenButtons } from "./Buttons"
import { AuthenticationInput } from "./Reusables"
import google from "../assets/google.svg"
import { Link } from "react-router-dom"

// User Sign Up Page
function UserSignUp() {
    return (
     <div className=" flex flex-col justify-center h-screen">
        <div className=" bg-yellow py-5 pl-5">
            <h1 className="font-logo text-green text-4xl leading-7 font-bold">Naytiv</h1>
        </div> 
        <div className=" bg-light-yellow h-full flex justify-center items-center py-5">
            <div className=" flex flex-col justify-center items-center p-6 border border-green rounded-2xl gap-6">
                <h2 className=" font-bold text-3xl">What's your Email?</h2>
                <div className=" flex flex-col gap-2 w-full">
                    <form action="" method="post" className=" flex flex-col gap-3 w-full">
                        <>
                            <AuthenticationInput type="email" name="email" id="email" autoComplete="email" placeholder="Enter email" />
                            <AuthenticationInput type="password" name="password" id="Newpassword" autoComplete="password" placeholder="Enter password" />
                            <AuthenticationInput type="password" name="password" id="Confirmpassword" autoComplete="password" placeholder="Confirm password" />
                        </>

                        <div className=" flex flex-col gap-5 w-full">
                            <Link to="/auth/sign_up_2" className=" flex justify-center items-center">
                                <BigGreenButtons text="Continue" className="w-full" />
                            </Link>
                            <p className=" text-center ">or</p>
                            <button className=" flex flex-row items-center gap-5 py-3 px-5 justify-center border border-green rounded-lg hover:bg-white">
                                <p>Continue with Google</p>
                                <img src={google} alt="Google icon" width={30} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
     </div>
    )
  }
  
  export default UserSignUp
