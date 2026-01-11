import { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "./../../api/posts";
import useAuth from "../../hooks/useAuth";

const Stripe = () => {
  const { auth } = useAuth();
  const [product, setProduct] = useState({
    name: "React",
    price: 10,
    productby: "facebook",
  });

  const makePayment = async (token) => {
    const body = {
      token,
      product,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post("/payment", body, { headers });
      const { status } = response;
      if (status === 200) auth.roles = [5150];
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Stripe">
      <StripeCheckout
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        token={makePayment}
        name="pay 10$"
        amount={product.price * 100}
      >
        <div className="d-column mt-4">
          <h3 style={{ textAlign: "center" }}>Pay & get Subsrciption</h3>
          <div className="d-flex align-items-center justify-content-center">
            <button className="d-flex align-items-center justify-content-center">
              <h4>10$</h4>
            </button>
          </div>
        </div>
      </StripeCheckout>
    </div>
  );
};

export default Stripe;
