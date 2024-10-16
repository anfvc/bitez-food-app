import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";

function PlaceOrder() {
  const { calculateTotalInCart } = useContext(StoreContext);

  return (
    <form className="place-order px-5 flex flex-col-reverse items-center gap-20 md:px-8 md:gap-40 md:flex-row md:items-start justify-between lg:gap-70 mt-20">
      <div className="place-order-left flex flex-col w-11/12 max-w-6/12">
        <p className="title text-3xl font-semibold mb-10">
          Delivery Information
        </p>
        <div className="multi-fields flex gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="w-full p-2 border border-gray-500 rounded-md my-3 outline-[#034620]"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full p-2 border border-gray-500 rounded-md my-3 outline-[#034620]"
          />
        </div>
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-2 border border-gray-500 rounded-md my-3 outline-[#034620]"
        />
        <input
          type="text"
          placeholder="Street"
          className="w-full p-2 border border-gray-500 rounded-md my-3 outline-[#034620]"
        />
        <div className="multi-fields flex gap-4">
          <input
            type="text"
            placeholder="City"
            className="w-full p-2 border border-gray-500 rounded-md my-3 outline-[#034620]"
          />
          <input
            type="text"
            placeholder="State"
            className="w-full p-2 border border-gray-500 rounded-md my-3 outline-[#034620]"
          />
        </div>
        <div className="multi-fields flex gap-4">
          <input
            type="text"
            placeholder="PLZ"
            className="w-full p-2 border border-gray-500 rounded-md my-3 outline-[#034620]"
          />
          <input
            type="text"
            placeholder="Country"
            className="w-full p-2 border border-gray-500 rounded-md my-3 outline-[#034620]"
          />
        </div>
        <input
          type="text"
          placeholder="Phone"
          className="w-full p-2 border border-gray-500 rounded-md my-3 outline-[#034620]"
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
          <button className="w-full mt-6 border border-black p-2 bg-[#034620] text-white font-semibold text-xl">
            Proceed to Payment
          </button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
