import { BigGreenButtons } from "../Buttons"
import { AuthenticationInput } from "../Reusables"
import google from "../../assets/google.svg"
import { Link, useNavigate } from "react-router-dom"
import React, { useState } from 'react';

function UserSignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirm_password: '',
        first_name: '', // Add firstName and lastName fields
        last_name: '', // Add lastName field
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        navigate('/auth/sign_up_2', { state: { formData } });
    };

    return (
        <div className="flex flex-col justify-center h-screen">
            <div className="bg-light-yellow h-full flex justify-center items-center py-5">
                <div className="flex flex-col justify-center items-center p-6 border border-green rounded-2xl gap-6">
                    <h2 className="font-bold text-3xl">What's your Email?</h2>
                    <div className="flex flex-col gap-2 w-full">
                        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex flex-col gap-3 w-full">
                            <AuthenticationInput type="email" id="email" autoComplete="email" placeholder="Enter email" value={formData.email} onChange={handleInputChange} />
                            <AuthenticationInput type="password" id="password" autoComplete="new-password" placeholder="Enter password" value={formData.password} onChange={handleInputChange} />
                            <AuthenticationInput type="password" id="confirm_password" autoComplete="new-password" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleInputChange} />
                            <BigGreenButtons text="Continue" className="w-full" />
                        </form>
                        <Link to="/auth/login" className="text-sm">Already have an account? <u className="text-green"><span className="text-green">Login here</span></u></Link>
                        <div className="flex flex-col gap-5 w-full">
                            <p className="text-center">or</p>
                            <button className="flex flex-row items-center gap-5 py-3 px-5 justify-center border border-green rounded-lg hover:bg-white">
                                <p>Continue with Google</p>
                                <img src={google} alt="Google icon" width={30} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserSignUp;
