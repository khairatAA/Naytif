// User Hero Page upon sign up
import heroImage from "../../assets/heroImage.svg"
import { Link } from "react-router-dom";

export default function UserHeroPage() {
    return (
        <div className=" bg-yellow flex flex-col h-screen">
            <div className=" py-5 pl-5" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.25)' }} >
                <h1 className="font-logo text-green text-4xl leading-7 font-bold">Naytiv</h1>
            </div>
            <div className=" flex flex-col justify-center items-center h-full px-10">
                <div className=" flex flex-row max-sm:flex-col justify-center items-center gap-5 p-5 bg-light-yellow rounded-2xl border border-green">
                    <img src={heroImage} alt="Shooting rocket" className=" w-3/6 h-fit" />
                    <div className=" flex flex-col justify-center items-start gap-5">
                        <h1 className=" text-3xl font-bold">Successful ✅</h1>
                        <h2 className=" text-base font-medium">Your account has been created</h2>
                        <h2 className=" text-lg font-medium">Go ahead to log in <Link to="/auth/login" className=" text-green"><u>here</u></Link></h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
