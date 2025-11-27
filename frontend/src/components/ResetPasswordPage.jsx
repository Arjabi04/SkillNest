// src/components/ResetPasswordPage.jsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./LoginForm.css"; // reuse your CSS for inputs/buttons

export default function ResetPasswordPage() {
  const { token } = useParams(); // get token from URL
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:4000/api/forgot-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      setMessage(data.msg);
      setPassword("");
    } catch (err) {
      console.error(err);
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="skillnest-text">SkillNest</h1>
        <div className="form-wrapper">
          <h2 className="login-heading">Reset Password</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Reset Password</button>
          </form>
          {message && <p className="login-message">{message}</p>}
        </div>
      </div>
    </div>
  );
}
