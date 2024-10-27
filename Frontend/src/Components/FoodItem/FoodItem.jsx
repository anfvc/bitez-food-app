import { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";

function FoodItem({ id, name, price, description, image }) {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div className="food-item w-full m-auto rounded-md shadow-md transiton duration-300">
      <div className="food-item-image-container relative">
        <img className="food-item-image w-full rounded-md" src={url+"/images/"+image} alt={name} />
        {/* When item Q is 0, show me a + to increase the product's quantity. When item is not 0, show me two buttons (+, -) to control the Q of the item */}
        {!cartItems[id] ? (
          <img
            src={assets.add_icon_white}
            alt=""
            className="add w-9 absolute bottom-3 right-4 cursor-pointer rounded-full"
            onClick={() => addToCart(id)}
          />
        ) : (
          <div className="food-item-counter absolute bottom-3 right-4 flex items-center gap-4 p-1.5 rounded-full bg-white">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
              className="w-10"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
              className="w-10"
            />
          </div>
        )}
      </div>
      <div className="food-item-info p-3">
        <div className="food-item-name-rating flex justify-between items-center mb-4">
          <p>{name}</p>
          <img
            src={assets.rating_stars}
            alt="rating stars image"
            className="w-30"
          />
        </div>
        <p className="food-item-desc text-sm">{description}</p>
        <p className="food-item-price text-[#034620] text-lg font-bold mx-0 my-2">
          {price.toFixed(0)}€
        </p>
      </div>
    </div>
  );
}

export default FoodItem;
