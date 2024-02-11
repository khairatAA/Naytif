// This file displays the home page of the restuarant route
import RestuarantSideBar from "./RestuarantSideBar"
import api from "../api";

function RestuarantHome() {
  return (
    <div className="flex flex-row bg-powder-blue w-full h-screen">
        <RestuarantSideBar />
        <div className=" ml-72 px-5 bg-powder-blue py-5 ">
                HAPPY
        </div>
    </div>
  )
}

export default RestuarantHome