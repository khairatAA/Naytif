import { BigGreenButtons } from "./Buttons"
import { AuthenticationInput, FormContent } from "./Reusables"
import google from "../assets/google.svg"
import { Link } from "react-router-dom"
import naytiv from "../assets/naytiv.svg"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "./api"

// User Login Page
function Login() {

    // Connection wth backend and error and success handling
    const [formValue, setFormValue] = useState({email:'', password:''})
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const navigate = useNavigate();

    const handleInput = (e) => {
        if (e && e.target) {
            const { name, value } = e.target;
            setFormValue((prevFormValue) => ({ ...prevFormValue, [name]: value }));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        let formData = new FormData();
        formData.append("email", formValue.email);
        formData.append("password", formValue.password);
    
        try {
            const response = await api.post('/restaurants/login', formData);
            console.log(response);
            localStorage.setItem("token", response.data.access_token)
            console.log(localStorage)
            setSuccessMessage('You have been successfully logged in');
            setErrorMessage('');
            setFormValue({ email:'', password:'' });
            setTimeout(() => {
                setIsSubmitting(false);
                setSuccessMessage('');
                navigate("/restuarant/home");
            }, 2000);
        } catch (error) {
            console.log(error);
            if (error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Invalid email or password. Please try again."); // set error message
            }
            setSuccessMessage('');
            setIsSubmitting(false);
            window.scrollTo(0, 0); //scroll to the top of the page
        }
    };

    return (
     <div className=" flex flex-col justify-center h-full" style={{backgroundColor: 'rgb(229 244 252' }}>
        <div className=" bg-light-green w-full flex justify-center items-center py-5">
            <div className=" flex flex-col justify-center items-center p-6 border border-yellow rounded-2xl gap-6">
                <div className=" flex flex-row justify-center items-baseline gap-2">
                    <h2 className=" font-bold text-3xl">Welcome To</h2>
                    <img src={naytiv} alt="" className=" h-20 relative -bottom-2" />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                    <form action="" onSubmit={handleSubmit} className=" flex flex-col gap-3 w-full">
                        {errorMessage && <p className=" text-[#ff0000] font-semibold">{errorMessage}</p>}
                        <>
                            <FormContent type="email" name="email" id="email" autoComplete="email" placeholder="Enter email" value={formValue.email} onChange={handleInput} />
                            <FormContent type="password" name="password" id="password" placeholder="Enter password" value={formValue.password} onChange={handleInput} />
                            <a href="" className=" text-xs"><u>Forget Password</u></a>
                        </>

                        <div className=" flex flex-col gap-3 w-full">
                            <div className=" flex flex-col gap-2 w-full">
                                <BigGreenButtons type="submit" disabled={isSubmitting} text="Login" className="w-full" />
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