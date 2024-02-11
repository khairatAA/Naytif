import React from 'react'

function AvaliableMenuItems() {
  return (
    <div className="flex flex-row bg-powder-blue w-full">
        <RestuarantSideBar />
        <div className=" ml-72 max-md:ml-16 px-5 bg-powder-blue w-full py-5 flex flex-col gap-14 ">
            <RestaurantTop />
            
        </div>
    </div>
  )
}

export default AvaliableMenuItems