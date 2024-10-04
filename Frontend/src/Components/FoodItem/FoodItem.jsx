import { assets } from "../../assets/assets";

function FoodItem({ id, name, price, description, image }) {
  return <div className="food-item w-full m-auto rounded-md shadow-md transiton duration-300">
    <div className="food-item-image-container">
      <img className="food-item-image w-full rounded-md" src={image} alt="" />
    </div>
    <div className="food-item-info">
      <div className="food-item-name-rating">
        <p>{name}</p>
        <img src={assets.rating_stars} alt="" />
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">{price.toFixed(2)}€</p>
      </div>
    </div>
  </div>;
}

export default FoodItem;
