import { createContext, useState, useEffect } from "react";
// import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

function StoreContextProvider({ children }) {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:5555";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  function addToCart(itemId) {
    if (!cartItems[itemId]) {
      //if the itemId is not in the cartItems object
      setCartItems((prevValue) => ({ ...prevValue, [itemId]: 1 })); //* this form is safer, BEST PRACTICE
    } else {
      setCartItems((prevValue) => ({
        ...prevValue,
        [itemId]: prevValue[itemId] + 1,
      }));
    }
  }

  function removeFromCart(itemId) {
    setCartItems((prevValue) => ({
      ...prevValue,
      [itemId]: prevValue[itemId] - 1,
    }));
  }

  // useEffect(() => {
  //   console.log(cartItems);
  // }, [cartItems])

  function calculateTotalInCart() {
    let totalAmount = 0;

    //* why for in? cartItems is an object
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  }

  async function getFoodList() {
    try {
      const response = await fetch(`${url}/api/food/list`);
      if (response.ok) {
        const data = await response.json();
        setFoodList(data)
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    async function loadData() {
      await getFoodList()
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      }
    }

    loadData()
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    calculateTotalInCart,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
}

export default StoreContextProvider;
