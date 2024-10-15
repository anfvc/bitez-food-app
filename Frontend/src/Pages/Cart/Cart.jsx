import React, { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";

function Cart() {
  const { cartItems, food_list, removeFromCart } = useContext(StoreContext);

  return (
    <div className="cart mt-10 px-5 md:px-8">
      <div className="class-items">
        <div className="cart-items-title grid grid-cols-6 place-items-center text-gray-500">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            {
              return (
                <div>
                  <div
                    key={index}
                    className="cart-items-title grid grid-cols-6 items-center place-items-center cart-items-item my-6 mx-0"
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="w-7/12 rounded-xl"
                    />
                    <p>{item.name}</p>
                    <p>{item.price}€</p>
                    <p>x {cartItems[item._id]}</p>
                    <p>{item.price * cartItems[item._id]}€</p>
                    <p
                      className="cross cursor-pointer border border-black p-2 rounded-md"
                      onClick={() => removeFromCart(item._id)}
                    >
                      X
                    </p>
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
          <h2 className="text-2xl font-semibold">Cart Total</h2>
          <div className="">
            <div className="cart-total-details flex justify-between items-center">
              <p>Subtotal</p>
              <p>{0}</p>
            </div>
            <hr className="my-2" />
            <div className="cart-total-details flex justify-between items-center">
              <p>Delivery Fee</p>
              <p>{2}</p>
            </div>
            <hr className="my-2"/>
            <div className="cart-total-details flex justify-between items-center">
              <b>Total</b>
              <p>{0}</p>
            </div>
          </div>
          <button className="w-full border border-black p-2 bg-[#034620] text-white font-semibold text-xl rounded-xl">Proceed to Checkout</button>
        </div>
        <div className="cart-promo-code flex-1">
          <div>
            <p>If you have a discount, enter it here:</p>
            <div className="cart-promo-code-input flex justify-between mt-4 items-center">
              <input type="text" placeholder="Discount" className="w-full border-0 bg-gray-200 outline-0 pl-4 py-3"/>
              <button className="border border-black px-8 md:px-12 py-2 bg-[#034620] text-white text-xl">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
