import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FiArrowLeft, FiLock } from "react-icons/fi";
import RazorpayPayment from "./payment/RazorpayPayment";

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { auth } = useAuth();

  return (
    <section
      className="d-flex align-items-center justify-content-center"
      style={{
        position: 'fixed',
        top: '120px',
        left: 0,
        width: '100%',
        height: 'calc(100vh - 80px)',
        zIndex: 50,
        background: 'var(--bg-primary)',
        padding: '20px'
      }}
    >
      <div
        className="d-flex flex-column align-items-center justify-content-center text-center p-5"
        style={{
          maxWidth: '800px',
          width: '100%',
          minHeight: '500px',
          background: 'var(--bg-secondary)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--border-color)',
          borderRadius: '30px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          className="mb-4"
          style={{
            width: '90px',
            height: '90px',
            minHeight: '90px',
            minWidth: '90px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
            border: '1px solid var(--border-color)',
            color: 'var(--accent-primary)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 0
          }}
        >
          <FiLock size={40} />
        </div>

        <h1 className="fw-bold mb-3" style={{ fontSize: '3rem', letterSpacing: '-0.02em', textAlign: 'center', color: 'var(--text-primary)' }}>Access Denied</h1>

        <p className="text-secondary" style={{ fontSize: '1.3rem', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto 1rem auto', textAlign: 'center', color: 'var(--text-secondary)' }}>
          This content is exclusive to premium members.<br />
          <span style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Upgrade your account to unlock full access.</span>
        </p>

        <div className="w-100 mb-5 d-flex justify-content-center">
          <div className={`${auth.accessToken ? "" : "hide"} w-100 d-flex justify-content-center`} style={{ maxWidth: '400px' }}>
            <RazorpayPayment />
          </div>
        </div>

        {!auth.accessToken && (
          <p className="text-muted" style={{ fontSize: '1.1rem', margin: '0 auto 1rem auto', textAlign: 'center' }}>
            Already a member? <a href="/login" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: '600' }}>Login</a>
          </p>
        )}

        <button
          onClick={goBack}
          className="d-flex align-items-center gap-2 mt-2"
          style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-secondary)',
            fontWeight: '600',
            fontSize: '1rem',
            padding: '12px 35px',
            borderRadius: '50px',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            marginTop: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--accent-primary)';
            e.currentTarget.style.borderColor = 'var(--accent-primary)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.boxShadow = '0 10px 20px rgba(99, 102, 241, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--bg-primary)';
            e.currentTarget.style.borderColor = 'var(--border-color)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <FiArrowLeft size={20} /> Go Back
        </button>
      </div>
    </section>
  );
};

export default Unauthorized;
