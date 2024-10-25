import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../../assets/admin_assets/assets";

function Orders({ url }) {
  const [orders, setOrders] = useState([]);
  console.log(orders);

  async function fetchAllOrders() {
    const response = await fetch(`${url}/api/order/list`);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setOrders(data);
    } else {
      toast.error("We couldn't list the orders");
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add p-2 md:p-10">
      <h3>Order Page</h3>
      <div className="orders">
        {orders.map((order, index) => (
          <div className="order-item grid grid-cols-5 items-start gap-10 p-4 my-10" key={index}>
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
              <p className="order-item-name font-bold mt-8">{order.address.firstName + " " + order.address.lastName}</p>
              <div className="order-item-address mb-4">
                <p>{order.address.street + ", "}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country}</p>
              </div>
              <p className="order-item-phone">
                {order.address.phone}
              </p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>Order Amount: {order.amount}€</p>
            <select className="w-5/6 border border-black p-4 outline-none">
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
