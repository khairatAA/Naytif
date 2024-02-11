import { DeleteIcon, HomeIcon, LogOutIcon, PanelRightOpenIcon, PlusCircleIcon, SettingsIcon, X } from "lucide-react";
import naytiv from '../../assets/naytiv.svg';
import flame from "../../assets/flame.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RestuarantSideBar() {
    const [activeItem, setActiveItem] = useState('HOME');
    const handleClick = (item) => {
        setActiveItem(item);
    }

    return (
        <div className="bg-green flex flex-col h-screen w-72 max-md:w-16 px-3 py-3 justify-between fixed">
            <div className="flex flex-col gap-5">
                {/* <img src={naytiv} alt="" className="h-20" /> */}
                <img src={flame} alt="" className="h-16" />
                <div className="flex flex-col gap-3">
                    <Link to='/restuarant/home' onClick={() => handleClick('HOME')} className={`flex p-3 justify-start gap-5 items-center rounded-md border border-yellow hover:bg-yellow ${activeItem === 'HOME' ? 'bg-yellow' : ''}`}>
                        <HomeIcon color="white" />
                        <h2 className="text-white hidden md:block">HOME</h2>
                    </Link>
                    <Link to="" onClick={() => handleClick('ADD A MENU ITEM')} className={`flex p-3 justify-start gap-5 items-center rounded-md border border-yellow hover:bg-yellow ${activeItem === 'ADD A MENU ITEM' ? 'bg-yellow' : ''}`}>
                        <PlusCircleIcon color="white" />
                        <h2 className="text-white hidden md:block">ADD A MENU ITEM</h2>
                    </Link>
                    <div onClick={() => handleClick('PRODUCTS')} className={`flex p-3 justify-start gap-5 items-center rounded-md border border-yellow hover:bg-yellow ${activeItem === 'PRODUCTS' ? 'bg-yellow' : ''}`}>
                        <PanelRightOpenIcon color="white" />
                        <h2 className="text-white hidden md:block">PRODUCTS</h2>
                    </div>
                    <div onClick={() => handleClick('SETTINGS')} className={`flex p-3 justify-start gap-5 items-center rounded-md border border-yellow hover:bg-yellow ${activeItem === 'SETTINGS' ? 'bg-yellow' : ''}`}>
                        <SettingsIcon color="white" />
                        <h2 className="text-white hidden md:block">SETTINGS</h2>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                {/* <div onClick={() => handleClick('DELETE A MENU ITEM')} className={`flex p-3 justify-start gap-5 items-center rounded-md border border-red hover:bg-red ${activeItem === 'DELETE A MENU ITEM' ? 'bg-red' : ''}`}>
                    <DeleteIcon color="white" />
                    <h2 className="text-white hidden md:block">DELETE A MENU ITEM</h2>
                </div> */}
                <div onClick={() => handleClick('DELETE RESTUARANT')} className={`flex p-3 justify-start gap-5 items-center rounded-md border border-red hover:bg-red ${activeItem === 'DELETE RESTUARANT' ? 'bg-red' : ''}`}>
                    <X color="white" />
                    <h2 className="text-white hidden md:block">DELETE RESTUARANT</h2>
                </div>
                <div className="flex p-3 justify-start gap-5 items-center rounded-md bg-black border border-black">
                    <LogOutIcon color="white" />
                    <h2 className="text-white hidden md:block">Log Out</h2>
                </div>
            </div>
        </div>
    );
}
