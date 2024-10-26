import React, { useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import { useEffect } from "react";

function Verify() {
  //? We're gonna take the info from the params on the verify pagge once the payment is successful
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success"); //* This will showup on the params
  const orderId = searchParams.get("orderId"); //* This will showup on the params
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  async function verifyPayment() {
    const response = await fetch(`${url}/api/order/verify`, {
      method: "POST",
      body: JSON.stringify({ success, orderId }),
      headers: {
        "Content-Type": "application/JSON",
      },
    });

    if (response.ok) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  }

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify min-h-dvh grid">
      <div className="spinner w-52 h-52 place-self-center border-8 border-gray-300 border-t-[#034620] rounded-full animate-spin "></div>
    </div>
  );
}

export default Verify;