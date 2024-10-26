import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../../assets/admin_assets/assets";

function Orders({ url }) {
  const [orders, setOrders] = useState([]);
  // console.log(orders);

  async function fetchAllOrders() {
    const response = await fetch(`${url}/api/order/list`);

    if (response.ok) {
      const data = await response.json();
      // console.log(data);
      setOrders(data);
    } else {
      toast.error("We couldn't list the orders");
    }
  }

  async function handleStatusChange(e, orderId) {
    console.log(e, orderId);
    const response = await fetch(`${url}/api/order/status`, {
      method: "POST",
      body: JSON.stringify({ orderId, status: e.target.value }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.okf) {
      await fetchAllOrders();
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add p-8 lg:p-14">
      <h3>Order Page</h3>
      <div className="orders p-8 lg:p-14">
        {orders.map((order, index) => (
          <div
            className="order-item grid grid-cols-1 place-items-start lg:grid-cols-5 md:items-center md:place-items-start gap-10  p-4 lg:p-8 my-10 border border-[#034620]"
            key={index}
          >
            <img src={assets.parcel_icon} alt="" />
            <div className="">
              <p className="order-item-food font-bold">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name font-bold mt-8">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address mb-4">
                <p>{order.address.street + ", "}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>Order Amount: {order.amount}€</p>
            <select
              onChange={(e) => handleStatusChange(e, order._id)}
              value={order.status}
              className="w-full lg:w-5/6 border border-[#034620] p-4 outline-none"
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
