import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaArrowLeft } from "react-icons/fa";
import RazorpayPayment from "./payment/RazorpayPayment";

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { auth } = useAuth();
  return (
    <section className="unauthorized d-flex flex-column align-items-center">
      <div className="flex-grow">
        <div className="d-flex  flex-column align-items-center">
          <h1>Unauthorized</h1>
          <p className=" text-center fs-3">
            You do not have access to the requested page.
          </p>
          <p style={styles.subtitle}>
            You need a premium subscription to access this content.
          </p>
          <button className="unauthorized-btn btn-lg" onClick={goBack}>
            <FaArrowLeft style={{ marginRight: "8px" }} /> Go Back
          </button>
        </div>
        <div
          className={`${
            auth.accessToken && auth?.roles?.includes(2001) ? "" : "hide"
          } mt-5`}
        >
          <RazorpayPayment />
        </div>
      </div>
    </section>
  );
};

const styles = {
  title: {
    color: "#1f2937",
    fontWeight: "700",
    fontSize: "2rem",
    marginBottom: "10px",
    marginTop: "0",
  },
  subtitle: {
    color: "#4b5563",
    fontSize: "1.1rem",
    marginBottom: "30px",
  },
};

export default Unauthorized;
