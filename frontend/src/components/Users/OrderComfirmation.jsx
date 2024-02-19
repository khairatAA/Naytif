// User Hero Page upon sign up
import scotter from '../../assets/scotter.svg';

export default function OrderConfirmation() {
    return (
        <div className=" bg-yellow min-h-screen max-h-full py-14">
            {/* <div className=" py-5 pl-5" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.25)' }} >
                <h1 className="font-logo text-green text-4xl leading-7 font-bold" onClick="/users/home">Naytiv</h1>
            </div> */}
            <div className=" flex flex-col justify-center items-center h-full px-10">
                <div className=" flex flex-row max-md:flex-col justify-center items-center gap-5 p-5 bg-light-yellow rounded-2xl border border-green">
                    <img src={scotter} alt="Shooting rocket" className=" w-3/6 h-fit" />
                    <div className=" flex flex-col justify-center items-start gap-10">
                        <div className=' flex flex-col gap-3'>
                            <h1 className=" text-3xl font-bold">Order Confirmed! ✅</h1>
                            <h2 className=" text-base font-medium">Congratulations! Your order has been successfully placed. We're excited to bring your delicious meal to your doorstep.</h2>
                        </div>
                        <div className=' flex flex-col gap-3'>
                            <h2 className=" text-lg font-semibold">What's Next?</h2>
                            <div className=' flex flex-col gap-2'>
                                <li className=' text-base font-medium'>Sit back, relax, and look forward to enjoying your meal.</li>
                                <li className=' text-base font-medium'>Keep an eye on your phone for a call from the rider.</li>
                                <li className=' text-base font-medium'>Feel free to contact us if you have any questions or concerns.</li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=' text-center mt-5 font-semibold'>
                <p>Thank you for choosing Naytif! We love you and hope you enjoy your meal.</p>
            </div>
        </div>
    )
}
