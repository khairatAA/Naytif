import { BigGreenButtons } from "./Buttons"
import { AuthenticationInput, FormContent } from "./Reusables"
import google from "../assets/google.svg"
import { Link } from "react-router-dom"
import naytiv from "../assets/naytiv.svg"

// User Login Page
function Login() {
    return (
     <div className=" flex flex-col justify-center">
        <div className=" bg-light-green py-5 pl-5">
            <h1 className="font-logo text-green text-4xl leading-7 font-bold">Naytiv</h1>
        </div> 
        <div className=" bg-light-green h-full w-full flex justify-center items-center py-5">
            <div className=" flex flex-col justify-center items-center p-6 border border-yellow rounded-2xl gap-6">
                <div className=" flex flex-row justify-center items-baseline gap-2">
                    <h2 className=" font-bold text-3xl">Welcome To</h2>
                    <img src={naytiv} alt="" className=" h-20 relative -bottom-2" />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                    <form action="" method="post" className=" flex flex-col gap-3 w-full">
                        <>
                            <FormContent type="email" name="email" id="email" autoComplete="email" placeholder="Enter email" />
                            <FormContent type="password" name="password" id="password" autoComplete="password" placeholder="Enter password" />
                            <a href="" className=" text-xs"><u>Forget Password</u></a>
                        </>

                        <div className=" flex flex-col gap-3 w-full">
                            <div className=" flex flex-col gap-2 w-full">
                                <Link to="" className=" w-full">
                                    <BigGreenButtons text="Login" className="w-full" />
                                </Link>
                                <p className=" text-xs">Don’t have an account? <a href="/auth/restuarant/sign_up" className=" text-yellow">Sign Up</a></p>
                            </div>
                            <p className=" text-center ">or</p>
                            <button className=" flex flex-row items-center gap-5 py-3 px-5 justify-center border border-yellow rounded-lg hover:bg-white">
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
  
  export default Login