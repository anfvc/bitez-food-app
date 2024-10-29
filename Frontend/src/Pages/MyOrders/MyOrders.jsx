import React, { useContext, useState } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";

function MyOrders() {
  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);

  async function fetchAllUserOrders() {
    const response = await fetch(`${url}/api/order/userorders`, {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
        token,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setData(data.orders); //? sent as orders from backend
      console.log(data.orders);
    }
  }

  useEffect(() => {
    if (token) {
      fetchAllUserOrders();
    }
  }, [token]);

  return (
    <div className="my-orders my-20 p-4 md:p-0">
      <h2>My Orders</h2>
      <div className="container flex flex-col gap-8 mt-10">
        {data.map((order, index) => {
          return (
            <div
              key={index}
              className="my-orders-order grid  grid-cols-3 md:grid-cols-6 items-center gap-10 text-xl px-10 py-8 border border-[#034620]"
            >
              <img src={assets.parcel_icon} alt="" className="w-6/12" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="font-bold text-[#034620]">{order.amount}€</p>
              <p>
                Items:{" "}
                <span className="font-bold text-[#034620]">
                  {order.items.length}
                </span>
              </p>
              <p>
                <span className="text-md">Status:</span>{" "}
                <b className="font-bold text-[#034620] text-sm md:text-lg">
                  {order.status}
                </b>
              </p>
              <button
                onClick={fetchAllUserOrders}
                className="p-2 border border-black bg-[#034620] text-white cursor-pointer"
              >
                Track Order
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyOrders;
