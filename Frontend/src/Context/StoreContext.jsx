import { createContext, useState, useEffect } from "react";
// import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

function StoreContextProvider({ children }) {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:5555";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  async function addToCart(itemId) {
    if (!cartItems[itemId]) {
      //if the itemId is not in the cartItems object
      setCartItems((prevValue) => ({ ...prevValue, [itemId]: 1 })); //* this form is safer, BEST PRACTICE
    } else {
      setCartItems((prevValue) => ({
        ...prevValue,
        [itemId]: prevValue[itemId] + 1,
      }));
    }

    if (token) {
      await fetch(`${url}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ itemId }),
      });
    }
  }

  async function removeFromCart(itemId) {
    setCartItems((prevValue) => ({
      ...prevValue,
      [itemId]: prevValue[itemId] - 1,
    }));

    if (token) {
      await fetch(`${url}/api/cart/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ itemId }),
      });
    }
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
        setFoodList(data);
      }
    } catch (error) {}
  }

  async function loadCartData(token) {
    const response = await fetch(`${url}/api/cart/get`, {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/JSON",
        token,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setCartItems(data.cartData);
    }
  }

  useEffect(() => {
    async function loadData() {
      await getFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token")); //* Loading the data that is in the cart as long as there is a token available. When the user refreshes the page, we should still see the data
      }
    }

    loadData();
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
