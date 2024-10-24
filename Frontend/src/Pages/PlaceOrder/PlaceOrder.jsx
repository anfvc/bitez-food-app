import { useContext, useState } from "react";
import { StoreContext } from "../../Context/StoreContext";

function PlaceOrder() {
  const { calculateTotalInCart, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    plz: "",
    country: "",
    phone: "",
  });

  function handleChange(e) {
    setData((prevValue) => ({ ...prevValue, [e.target.name]: e.target.value }));
  }

  async function placeOrder(e) {
    e.preventDefault();

    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: calculateTotalInCart() + 5,
    };

    let response = await fetch(`${url}/api/order/place`, {
      method: "POST",
      body: JSON.stringify({ orderData }),
      headers: {
        "Content-Type": "application/JSON",
        token,
      },
    });

    if (response.ok) {
      const session_url = await response.json();
      window.location.replace(session_url);
    } else {
      alert("Error")
    }
  }

  return (
    <form
      className="place-order px-5 flex flex-col-reverse items-center gap-20 md:px-8 md:gap-40 md:flex-row md:items-start justify-between lg:gap-70 mt-20"
      onSubmit={placeOrder}
    >
      <div className="place-order-left flex flex-col w-11/12 max-w-6/12">
        <p className="title text-3xl font-semibold mb-10">
          Delivery Information
        </p>
        <div className="multi-fields flex gap-4">
          <input
            required
            type="text"
            name="firstName"
            placeholder="First Name"
            className="w-full p-2 border border-gray-500 rounded-md my-3 outline-[#034620]"
            value={data.firstName}
            onChange={handleChange}
          />
          <input
            required
            name="lastName"
            type="text"
            placeholder="Last Name"
            className="w-full p-2 border border-gray-500 rounded-md my-3 outline-[#034620]"
            value={data.lastName}
            onChange={handleChange}
          />
        </div>
        <input
          required
          name="email"
          type="email"
          placeholder="Email Address"
          className="w-full p-2 border border-gray-500 rounded-md my-3 outline-[#034620]"
          value={data.email}
          onChange={handleChange}
        />
        <input
          required
          type="text"
          name="street"
          placeholder="Street"
          className="w-full p-2 border border-gray-500 rounded-md my-3 outline-[#034620]"
          value={data.street}
          onChange={handleChange}
        />
        <div className="multi-fields flex gap-4">
          <input
            required
            type="text"
            name="city"
            placeholder="City"
            className="w-full p-2 border border-gray-500 rounded-md my-3 outline-[#034620]"
            onChange={handleChange}
            value={data.city}
          />
          <input
            required
            type="text"
            placeholder="State"
            name="state"
            className="w-full p-2 border border-gray-500 rounded-md my-3 outline-[#034620]"
            onChange={handleChange}
            value={data.state}
          />
        </div>
        <div className="multi-fields flex gap-4">
          <input
            required
            type="text"
            placeholder="PLZ"
            name="plz"
            className="w-full p-2 border border-gray-500 rounded-md my-3 outline-[#034620]"
            onChange={handleChange}
            value={data.plz}
          />
          <input
            required
            type="text"
            placeholder="Country"
            name="country"
            className="w-full p-2 border border-gray-500 rounded-md my-3 outline-[#034620]"
            onChange={handleChange}
            value={data.country}
          />
        </div>
        <input
          required
          type="text"
          placeholder="Phone"
          name="phone"
          className="w-full p-2 border border-gray-500 rounded-md my-3 outline-[#034620]"
          onChange={handleChange}
          value={data.phone}
        />
      </div>
      <div className="place-order-right w-full max-w-4/12">
        <div className="cart-total flex-1 flex flex-col gap-8">
          <h2 className="text-3xl font-semibold">Cart Total</h2>
          <div className="">
            <div className="cart-total-details flex justify-between items-center">
              <p className="text-2xl">Subtotal</p>
              <p className="text-2xl">{calculateTotalInCart()}€</p>
            </div>
            <hr className="my-2" />
            <div className="cart-total-details flex justify-between items-center">
              <p className="text-2xl">Delivery Fee</p>
              <p className="text-2xl">
                {calculateTotalInCart() === 0 ? 0 : 5}€
              </p>
            </div>
            <hr className="my-2" />
            <div className="cart-total-details flex justify-between items-center">
              <b className="text-2xl">Total</b>
              <p className="text-2xl">
                {calculateTotalInCart() === 0 ? 0 : calculateTotalInCart() + 5}€
              </p>
            </div>
          </div>
          {/* When pressed the button, take me to the other page */}
          <button
            type="submit"
            className="w-full mt-6 border border-black p-2 bg-[#034620] text-white font-semibold text-xl"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
