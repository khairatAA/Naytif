// Restuarant Hero Page upon sign up
import hero2 from "../assets/hero2.svg"

export default function RiderHeroPage() {
    
    return (
        <div className=" bg-green flex flex-col h-screen">
            <div className=" py-5 pl-5" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.25)' }}>
                <h1 className="font-logo text-yellow text-4xl leading-7 font-bold"><a href="/">Naytiv</a></h1>
            </div>
            <div className=" flex flex-col justify-center items-center h-full px-10">
                <div className=" flex flex-row max-sm:flex-col justify-center items-center gap-5 p-5 bg-[rgba(255,255,255,30%)]  rounded-2xl border border-green">
                    <img src={hero2} alt="Shooting rocket" className=" w-3/6 h-fit" />
                    <div className=" flex flex-col justify-center items-start gap-5">
                        <h1 className=" text-3xl font-bold">Successful ✅</h1>
                        <h2 className=" text-base font-medium">Your details has been received</h2>
                        <h2 className=" text-lg font-medium">Please check your mail for more information</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
