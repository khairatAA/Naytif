import { Search, SearchCheckIcon } from 'lucide-react'
import React from 'react'

function RestaurantTop() {
  return (
    <div className=' flex flex-row w-full justify-between gap-5'>
        <div className=' flex bg-light-green gap-5 items-center rounded-lg px-3'>
            <Search color='black' className=' flex' />
            <input
            type="search"
            name="search"
            id="search"
            placeholder='Search'
            className="block flex-1 rounded w-full bg-light-green py-2 pl-1 placeholder:text-black focus:ring-0 sm:text-sm sm:leading-6 outline-0 hover:border-green" />
        </div>
        <div className=' h-12 w-12 rounded-full bg-yellow'></div>
    </div>
  )
}

export default RestaurantTop