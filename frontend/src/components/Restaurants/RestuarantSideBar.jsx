import { DeleteIcon, HomeIcon, LogOutIcon, PanelRightOpenIcon, PlusCircleIcon, SettingsIcon, X } from "lucide-react";
import naytiv from '../../assets/naytiv.svg';
import naytifGreen from "../../assets/naytifGreen.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SwalDelete from '../SwalDelete';
import Swal from 'sweetalert2';
import api from "../api";

export default function RestuarantSideBar() {
    const [activeItem, setActiveItem] = useState('HOME');
    const restaurant_id = localStorage.getItem("restaurant_id")
    const navigate = useNavigate();
    
    const handleClick = (item) => {
        setActiveItem(item);
    }

    const handleLogout = async () => {
        try {
            // Call your API to delete the item
            await api.delete(`/restaurants/logout`);
            console.log("revoked jwt")
        } catch (error) {
            console.error('Error deleting restaurant:', error);
        }
        // Clear session data
        localStorage.clear(); // Example: Clear token from local storage

        // Redirect the user to the login page or any other page
        navigate("/")

        console.log('User logged out');
    };

    // Delete Restaurant
    const handleDelete = async (restaurantId) => {
        try {
            // Call your API to delete the item
            await api.delete(`/restaurants/${restaurant_id}`);
            console.log('deleted retaurant');
            Swal.fire({
                title: 'Deleted!',
                text: 'Your restaurant has been deleted.',
                icon: 'success',
            });
            navigate("/")
            // window.location.reload();
        } catch (error) {
            console.error('Error deleting restaurant:', error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to delete the item.',
                icon: 'error',
            });
        }
    };

    return (
        <div className="bg-green flex flex-col h-screen w-72 max-md:w-16 px-3 py-3 justify-between fixed">
            <div className="flex flex-col gap-5">
                {/* <img src={naytiv} alt="" className="h-20" /> */}
                {/* <img src={naytifGreen} alt="" className="h-10" /> */}
                <img src={naytifGreen} className="h-10 w-20 fill-slate-300" alt="Naytif" />
                <div className="flex flex-col gap-3">
                    <Link to='/restuarants/home' onClick={() => handleClick('HOME')} className={`flex p-3 justify-start gap-5 items-center rounded-md border border-yellow hover:bg-yellow ${activeItem === 'HOME' ? 'bg-yellow' : ''}`}>
                        <HomeIcon color="white" />
                        <h2 className="text-white hidden md:block">HOME</h2>
                    </Link>
                    <Link to={`/restaurants/${restaurant_id}/menu`} onClick={() => handleClick('ADD A MENU ITEM')} className={`flex p-3 justify-start gap-5 items-center rounded-md border border-yellow hover:bg-yellow ${activeItem === 'ADD A MENU ITEM' ? 'bg-yellow' : ''}`}>
                        <PlusCircleIcon color="white" />
                        <h2 className="text-white hidden md:block">ADD A MENU ITEM</h2>
                    </Link>
                    <Link to={`/restaurants/${restaurant_id}/available_menu`} onClick={() => handleClick('PRODUCTS')} className={`flex p-3 justify-start gap-5 items-center rounded-md border border-yellow hover:bg-yellow ${activeItem === 'PRODUCTS' ? 'bg-yellow' : ''}`}>
                        <PanelRightOpenIcon color="white" />
                        <h2 className="text-white hidden md:block">PRODUCTS</h2>
                    </Link>
                    <Link to={`/restaurants/${restaurant_id}/update_restaurant`} onClick={() => handleClick('SETTINGS')} className={`flex p-3 justify-start gap-5 items-center rounded-md border border-yellow hover:bg-yellow ${activeItem === 'SETTINGS' ? 'bg-yellow' : ''}`}>
                        <SettingsIcon color="white" />
                        <h2 className="text-white hidden md:block">SETTINGS</h2>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <div
                     onClick={SwalDelete({
                            title: `Are you sure you want to delete your restaurant?`,
                            warningText: "This action cannot be undone.",
                            onConfirmDelete: () => handleDelete(restaurant_id),
                            cancel_text: "Restaurant is not deleted",
                          })
                        }
                        // handleClick('DELETE RESTUARANT');
                    className={`flex p-3 justify-start gap-5 items-center rounded-md border border-red hover:bg-red ${activeItem === 'DELETE RESTUARANT' ? 'bg-red' : ''}`}
                    >
                    <X color="white" />
                    <h2 className="text-white hidden md:block">DELETE RESTUARANT</h2>
                </div>
                <div onClick={handleLogout} className="flex p-3 justify-start gap-5 items-center rounded-md bg-black border border-black cursor-pointer">
                    <LogOutIcon color="white" />
                    <h2 className="text-white hidden md:block">Log Out</h2>
                </div>
            </div>
        </div>
    );
}