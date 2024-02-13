import { BigGreenButtons } from "../Buttons"
import { AuthenticationInput } from "../Reusables"
import google from "../../assets/google.svg"
import { Link } from "react-router-dom"
import naytiv from "../../assets/naytiv.svg"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api"
import Swal from "sweetalert2"

// User Login Page
function UserLogin() {
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
            const response = await api.post('/users/login', formData);
            console.log(response);
            localStorage.setItem("token", response.data.access_token)
            localStorage.setItem("user_id", response.data.user_id)
            console.log(localStorage)
            setSuccessMessage('You have been successfully logged in');
            setErrorMessage('');
            setFormValue({ email:'', password:'' });
            setTimeout(() => {
                setIsSubmitting(false);
                setSuccessMessage('');
                navigate("");
            }, 2000);
        } catch (error) {
            console.log(error);
            if (error.response.msg) {
                setErrorMessage(error.response.data.msg);
            } else {
                setErrorMessage("Invalid email or password. Please try again."); // set error message
            }
            setSuccessMessage('');
            setIsSubmitting(false);
            window.scrollTo(0, 0); //scroll to the top of the page
        }
    };

    // Handle forget password
    const handleForgotPassword = async () => {
        const { value: email } = await Swal.fire({
            title: 'Forgot Password',
            text: 'Enter your email address:',
            input: 'email',
            inputPlaceholder: 'Email address',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            cancelButtonText: 'Cancel',
            inputValidator: (value) => {
                if (!value) {
                    return 'Email address is required';
                }
            }
        });

        if (email) {
            try {
                // /restaurants/forgot_password
                const response = await api.post('/users/forgot', { email });
                Swal.fire({
                    title: 'Password Reset Email Sent!',
                    text: 'Please check your email for further instructions.',
                    icon: 'success'
                });
            } catch (error) {
                console.error('Error sending password reset email:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to send password reset email. Please try again later.',
                    icon: 'error'
                });
            }
        }
    };

    return (
     <div className=" flex flex-col justify-center h-screen">
        {/* <div className=" bg-yellow py-5 pl-5">
            <h1 className="font-logo text-green text-4xl leading-7 font-bold">Naytiv</h1>
        </div>  */}
        <div className=" bg-light-yellow h-full w-full flex justify-center items-center py-5">
            <div className=" flex flex-col justify-center items-center p-6 border border-green rounded-2xl gap-6">
                <div className=" flex flex-row justify-center items-baseline gap-2">
                    <h2 className=" font-bold text-3xl">Welcome To</h2>
                    <img src={naytiv} alt="" className=" h-20 relative -bottom-2" />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                    <form onSubmit={handleSubmit} className=" flex flex-col gap-3 w-full">
                        {successMessage && <p className=" text-green font-semibold">{successMessage}</p>}
                        {errorMessage && <p className=" text-[#ff0000] font-semibold">{errorMessage}</p>}
                        <> 
                            <AuthenticationInput type="email" name="email" id="email" autoComplete="email" placeholder="Enter email" />
                            <AuthenticationInput type="password" name="password" id="password" autoComplete="password" placeholder="Enter password" />
                            <div onClick={handleForgotPassword} className=" text-xs cursor-pointer"><u>Forget Password</u></div>
                        </>

                        <div className=" flex flex-col gap-3 w-full">
                            <div className=" flex flex-col gap-2 w-full">
                                <BigGreenButtons type='submit' disabled={isSubmitting} text="Login" className="w-full" />
                                <p className=" text-xs">Don’t have an account? <a href="/auth/sign_up_1" className=" text-green">Sign Up</a></p>
                            </div>
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
  
  export default UserLogin