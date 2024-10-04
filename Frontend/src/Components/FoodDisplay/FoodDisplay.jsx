import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

function FoodDisplay({ category }) {
  const { food_list } = useContext(StoreContext);
  return (
    <div className="food-display mt-10">
      <h2 className="font-semibold text-4xl">Top Dishes near you!</h2>
      <div className="food-display-list grid grid-cols-auto-fill-minmax gap-x-6 gap-y-10 mt-10">
        {food_list.map((item, index) => {
          return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />;
        })}
      </div>
    </div>
  );
}

export default FoodDisplay;
