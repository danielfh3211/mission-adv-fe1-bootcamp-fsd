import React, { useState } from "react";
import HeaderAuth from "../components/HeaderAuth";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Kata sandi tidak cocok!");
      return;
    }
    console.log({ name, email, phoneNumber, password });
  };

  return (
    <>
      <HeaderAuth />

      <div className="container">
        <h2>Pendaftaran Akun</h2>
        <p>Yuk, daftarkan akunmu sekarang juga!</p>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="name">
              Nama Lengkap <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="name"
              id="name"
              name="name"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              E-mail <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="number-phone">
              No. Hp <span style={{ color: "red" }}>*</span>
            </label>
            <div className="phone-input-group">
              <div className="country-code-box">
                <span className="flag-box">
                  <img
                    src="https://flagcdn.com/id.svg"
                    alt="ID"
                    className="flag-icon"
                  />
                </span>
                <select
                  id="country-code"
                  name="country-code"
                  required
                  className="country-select"
                >
                  <option value="+62" selected>
                    +62
                  </option>
                </select>
              </div>
              <input
                type="tel"
                id="number-phone"
                name="number-phone"
                required
                autoComplete="tel"
                className="phone-input"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Kata Sandi <span style={{ color: "red" }}>*</span>
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
          <div className="form-group">
            <label htmlFor="confirm-password">
              Konfirmasi Kata Sandi <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              required
              autoComplete="confirm-current-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <Link to="/" className="forgot-link">
            Sudah punya akun? Masuk
          </Link>
          <Link to="/" className="btn btn-login">
            Daftar
          </Link>
          <Link to="/" className="btn btn-register">
            Masuk
          </Link>
          <div className="divider">
            <span>atau</span>
          </div>
          <button type="button" className="btn btn-google">
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google Logo"
            />
            Daftar dengan Google
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
