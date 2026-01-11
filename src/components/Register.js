import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import axios from "../api/posts";
import { Link, useNavigate } from "react-router-dom";

const USER_REGEX = /^[A-Z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@gmail\.com$/;
const REGISTER_URL = "/register";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validemail, setvalidEmail] = useState(false);
  const [emailfocus, setemailFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => { userRef.current.focus(); }, []);
  useEffect(() => { setValidName(USER_REGEX.test(user)); }, [user]);
  useEffect(() => { setvalidEmail(EMAIL_REGEX.test(email)); }, [email]);
  useEffect(() => { setValidPwd(PWD_REGEX.test(pwd)); setValidMatch(pwd === matchPwd); }, [pwd, matchPwd]);
  useEffect(() => { setErrMsg(""); }, [user, pwd, matchPwd, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!USER_REGEX.test(user) || !PWD_REGEX.test(pwd)) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      await axios.post(REGISTER_URL, JSON.stringify({ user, pwd, email }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setUser(""); setPwd(""); setMatchPwd(""); setEmail("");
      navigate("/login");
    } catch (err) {
      if (!err?.response) setErrMsg("No Server Response");
      else if (err.response?.status === 409) setErrMsg("Username Taken");
      else setErrMsg("Registration Failed");
      errRef.current.focus();
    }
  };

  return (
    <div className="auth-container">
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Join Us</h2>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>Create an account to join the community</p>

      {errMsg && <p ref={errRef} className="statusMsg" style={{ color: "var(--error)" }} aria-live="assertive">{errMsg}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Username:</label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              className="form-input"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
            />
            <FaUser style={{ position: 'absolute', top: '50%', left: '0.75rem', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />

            {user && (
              <div style={{ position: 'absolute', top: '50%', right: '0.75rem', transform: 'translateY(-50%)' }}>
                <FontAwesomeIcon icon={validName ? faCheck : faTimes} className={validName ? "valid" : "invalid"} />
              </div>
            )}
          </div>
          {userFocus && user && !validName && (
            <p className="instructions" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              <FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 chars. Must begin with a letter.
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Email:</label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="form-input"
              onFocus={() => setemailFocus(true)}
              onBlur={() => setemailFocus(false)}
              style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
            />
            <MdOutlineAlternateEmail style={{ position: 'absolute', top: '50%', left: '0.75rem', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />

            {email && (
              <div style={{ position: 'absolute', top: '50%', right: '0.75rem', transform: 'translateY(-50%)' }}>
                <FontAwesomeIcon icon={validemail ? faCheck : faTimes} className={validemail ? "valid" : "invalid"} />
              </div>
            )}
          </div>
          {emailfocus && !validemail && (
            <p className="instructions" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              <FontAwesomeIcon icon={faInfoCircle} /> Must be a valid Gmail address.
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Password:</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              className="form-input"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              style={{ paddingLeft: '2.5rem', paddingRight: '4.5rem' }}
            />
            <FaLock style={{ position: 'absolute', top: '50%', left: '0.75rem', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />

            {pwd && (
              <div style={{ position: 'absolute', top: '50%', right: '2.5rem', transform: 'translateY(-50%)' }}>
                <FontAwesomeIcon icon={validPwd ? faCheck : faTimes} className={validPwd ? "valid" : "invalid"} />
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', top: '50%', right: '0.75rem', transform: 'translateY(-50%)', background: 'none', color: 'var(--text-muted)' }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {pwdFocus && !validPwd && (
            <p className="instructions" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              <FontAwesomeIcon icon={faInfoCircle} /> 8-24 chars. Must include uppercase, lowercase, number, special char.
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Confirm Password:</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              className="form-input"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
            />
            <FaLock style={{ position: 'absolute', top: '50%', left: '0.75rem', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />

            {matchPwd && (
              <div style={{ position: 'absolute', top: '50%', right: '0.75rem', transform: 'translateY(-50%)' }}>
                <FontAwesomeIcon icon={validMatch ? faCheck : faTimes} className={validMatch ? "valid" : "invalid"} />
              </div>
            )}
          </div>
          {matchFocus && !validMatch && (
            <p className="instructions" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              <FontAwesomeIcon icon={faInfoCircle} /> Passwords must match.
            </p>
          )}
        </div>

        <button
          className="btn-primary"
          style={{ width: '100%', marginTop: '1rem', opacity: (!validName || !validPwd || !validMatch || !validemail) ? 0.5 : 1 }}
          disabled={!validName || !validPwd || !validMatch || !validemail}
        >
          Sign Up
        </button>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>Already registered? <Link to="/login" style={{ color: 'var(--accent-primary)' }}>Sign In</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Register;
