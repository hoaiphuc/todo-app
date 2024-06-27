import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const Auth = () => {
  const [cookie, setCookie, removeCookie] = useCookies(null);
  const [isLogIn, setIslogIn] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  console.log(cookie);

  const viewLogin = (status) => {
    setError(null);
    setIslogIn(status);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogIn && password !== confirmPassword) {
      setError("Make sure password match!");
      return;
    }

    await axios
      .post(`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
        email,
        password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.detail) {
          setError(response.data.detail);
        } else {
          setCookie("Email", response.data.email);
          setCookie("AuthToken", response.data.token);

          window.location.reload();
        }
      })
      .catch((error) => {
        console.error(error);
        setError(error.data.detail);
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form action="">
          <h2>{isLogIn ? "Please log in" : "Please sign up!"}</h2>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="paswword"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogIn && (
            <input
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input
            type="submit"
            className="create"
            value={"Submit"}
            onClick={(e) => handleSubmit(e, isLogIn ? "login" : "signup")}
          />
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button
            onClick={() => viewLogin(false)}
            style={{
              backgroundColor: !isLogIn
                ? "rgb(255, 255, 255)"
                : "rgb(188, 188, 188)",
            }}
          >
            Sign Up
          </button>
          <button
            onClick={() => viewLogin(true)}
            style={{
              backgroundColor: isLogIn
                ? "rgb(255, 255, 255)"
                : "rgb(188, 188, 188)",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
