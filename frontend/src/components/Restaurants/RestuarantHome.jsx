import RestuarantSideBar from "./RestuarantSideBar";
import api from "../api";
import RestaurantTop from "./RestaurantTop";
import { useState, useEffect } from "react";
import { Check } from "lucide-react";

function RestuarantHome() {
  const [restaurants, setRestaurants] = useState([]);
  const restaurant_id = localStorage.getItem("restaurant_id");
  const [restaurantOrders, setRestaurantOrders] = useState([]);
  const [items, setItems] = useState([]); // State variable for order items

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await api.get(`/restaurants/${restaurant_id}`);
        const fetchedRestaurants = response.data.restaurant;
        setRestaurants(fetchedRestaurants);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
    };

    fetchRestaurants();
  }, [restaurant_id]);

  useEffect(() => {
    const fetchRestaurantOrders = async () => {
      try {
        const response = await api.get(`/restaurants/${restaurant_id}/orders`);
        const orders = response.data.orders;

        // Extract and store item IDs in local storage
        const itemIds = orders.reduce((acc, order) => {
          return [...acc, ...order.items.map(item => item.itemId)];
        }, []);
        localStorage.setItem('orderItemIds', JSON.stringify(itemIds));

        // Set restaurantOrders with orders
        setRestaurantOrders(orders);
      } catch (error) {
        console.error("Error fetching restaurant orders:", error);
      }
    };

    fetchRestaurantOrders();
  }, [restaurant_id]);

  const scrollToOrder = (index) => {
    const element = document.getElementById(`order_${index}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Sort the orders by their timestamps in descending order (most recent first)
  const sortedOrders = [...restaurantOrders].reverse();

  return (
    <div className="flex flex-row bg-powder-blue w-full h-full min-h-screen pb-20">
      <RestuarantSideBar />
      <div className="ml-72 max-md:ml-16 px-5 bg-powder-blue w-full py-5 flex flex-col gap-8">
        <RestaurantTop />
        <h1 className="font-extrabold text-3xl">Welcome {restaurants.brand_name}!</h1>
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-xl">ORDER LIST</h2>
          <div className="flex flex-row gap-5">
            {sortedOrders.map((order, index) => (
              <div
                key={index}
                className="flex flex-row p-3 items-center justify-between rounded-lg border border-green w-28 cursor-pointer"
                onClick={() => scrollToOrder(index)}
              >
                <p className="text-green">#{index.toString().padStart(3, "0")}</p>
                <Check className="text-green" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-row flex-wrap max-md:justify-center gap-5">
          {sortedOrders.map((order, index) => (
            <div key={index} id={`order_${index}`} className="bg-[#E5F4FC] rounded-xl p-5 flex flex-col gap-5 w-72 h-fit">
              <div className="flex flex-row justify-between items-start">
                <div className="flex flex-col justify-start">
                  <p className="font-bold text-lg">Order #{index.toString().padStart(3, "0")}</p>
                  <p className="font-normal text-base text-[rgba(0,0,0,45%)]">{order.deliveryAddress}</p>
                </div>
                <div>
                  <p className="font-normal text-base text-[rgba(0,0,0,45%)]">{order.user.name.length > 15 ? `${order.user.name.slice(0, 15)}...` : order.user.name}</p>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex flex-row items-center gap-5 pb-2 border-b border-b-[rgba(0,0,0,45%)]">
                    <div className="flex flex-col gap-1">
                      <div>
                        <p className="font-bold text-base">{item.name}</p>
                        <p></p>
                      </div>
                      <div className="flex flex-row w-full gap-8">
                        <p className="text-base text-[rgba(0,0,0,45%)]">#{parseFloat(item.price).toFixed(2)}</p>
                        <p className="text-base text-[rgba(0,0,0,45%)]">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-row p-2 items-center justify-between self-center rounded-sm cursor-pointer border border-green w-40">
                <Check className="text-green" />
                <p className="text-green">COMPLETED</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RestuarantHome;
