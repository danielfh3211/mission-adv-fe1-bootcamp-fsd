import React, { useState } from "react";
import HeaderAuth from "../components/HeaderAuth";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <>
      <HeaderAuth />
      <div className="container">
        <h2>Masuk ke Akun</h2>
        <p>Yuk, lanjutin belajarmu di videobelajar</p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">
              E-mail <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Password <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <a href="#" className="forgot-link">
            Lupa password?
          </a>
          <Link to="/beranda" className="btn btn-login">
            Masuk
          </Link>
          <Link to="/register" className="btn btn-register">
            Daftar
          </Link>
          <div className="divider">
            <span>atau</span>
          </div>
          <button type="button" className="btn btn-google">
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google Logo"
            />
            Masuk dengan Google
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
