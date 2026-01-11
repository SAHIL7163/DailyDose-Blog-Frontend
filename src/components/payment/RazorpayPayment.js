import { useState } from "react";
import img from "./../../img/cashless-payment_4108843.png";
import axios from "../../api/posts";
import useAuth from "../../hooks/useAuth";
import { FaCreditCard } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const RazorpayPayment = () => {
  const { auth } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const prevurl = location?.state?.from || "/";

  const handlePayment = async () => {
    try {
      const { data } = await axios.post("/payment/create-order");

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "DailyDose Blog",
        description: "Premium Blog Subscription",
        image: img,
        order_id: data.id,
        handler: async function (response) {
          const verifyRes = await axios.post("/payment/verify", {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            email: auth?.user.email,
          });

          if (verifyRes.status === 200) {
            auth.roles = [5150];
            alert("Payment Successful 🎉");
            navigate(prevurl, { replace: true });
          }
        },
        prefill: {
          name: auth?.user || "Guest",
          email: auth?.user.email || "test@example.com",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-100 d-flex justify-content-center">
      <div className="mt-2 w-100" style={{ maxWidth: '320px' }}>
        <button
          onClick={handlePayment}
          style={{
            ...styles.gradientButton,
            transform: isHovered ? "scale(1.02)" : "scale(1)",
            boxShadow: isHovered ? "0 15px 30px rgba(99, 102, 241, 0.4)" : "0 10px 20px rgba(99, 102, 241, 0.2)"
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div style={styles.cardIconWrapper}>
            <FaCreditCard color="white" size={20} />
          </div>
          <span>Subscribe Now</span>
        </button>
      </div>
    </div>
  );
};

const styles = {
  gradientButton: {
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)", // Indigo to Violet
    border: "none",
    padding: "16px 32px",
    borderRadius: "16px",
    color: "white",
    fontSize: "1.1rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    boxShadow: "0 10px 20px rgba(99, 102, 241, 0.3)",
    transition: "all 0.3s ease",
    width: "100%",
  },
  cardIconWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default RazorpayPayment;
