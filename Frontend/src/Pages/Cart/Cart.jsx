import React, { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { ImCross } from "react-icons/im";
import { ImPlus } from "react-icons/im";
import { useNavigate } from "react-router-dom";

function Cart() {
  const {
    cartItems,
    food_list,
    addToCart,
    removeFromCart,
    calculateTotalInCart,
    url,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className="cart mt-20 px-5 md:px-8">
      <div className="class-items">
        <div className="cart-items-title grid grid-cols-7 place-items-center text-gray-500">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Add More</p>
          <p>Remove Item</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            {
              return (
                <div key={index}>
                  <div className="cart-items-title grid grid-cols-7 items-center place-items-center cart-items-item my-6 mx-0">
                    <img
                      src={url + "/images/" + item.image}
                      alt=""
                      className="w-7/12 rounded-xl"
                    />
                    <p>{item.name}</p>
                    <p>{item.price}€</p>
                    <p>x {cartItems[item._id]}</p>
                    <p>{item.price * cartItems[item._id]}€</p>
                    <ImPlus onClick={() => addToCart(item._id)} className="text-green-700 cursor-pointer"
                      title="Remove Item" />
                    <ImCross
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-700 cursor-pointer"
                      title="Remove Item"
                    />
                  </div>
                  <hr className="h-1 bg-gray-500 opacity-45" />
                </div>
              );
            }
          }
        })}
      </div>
      <div className="cart-bottom mt-20 flex-col-reverse gap-12 md:flex-row flex justify-between md:gap-52">
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
            onClick={() => navigate("/order")}
            className="w-full border border-black p-2 bg-[#034620] text-white font-semibold text-xl"
          >
            Proceed to Checkout
          </button>
        </div>
        <div className="cart-promo-code flex-1">
          <div>
            <p>If you have a discount, enter it here:</p>
            <div className="cart-promo-code-input flex justify-between mt-4 items-center">
              <input
                type="text"
                placeholder="Discount"
                className="w-full border-0 bg-gray-200 outline-0 pl-4 py-3"
              />
              <button className="border border-black px-8 md:px-12 py-2 bg-[#034620] text-white text-xl">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
