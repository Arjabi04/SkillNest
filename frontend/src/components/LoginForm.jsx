import { useState } from "react";
import { login } from "../api/auth";
import { Link } from "react-router-dom";
import "./LoginForm.css"; // import CSS
import loginImage from "../assets/login-image.jpg"; // put your image in assets folder

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(form.email, form.password);
      localStorage.setItem("token", data.token);
      setMessage(`Logged in as ${data.user.username}`);
      setForm({ email: "", password: "" });
    } catch (err) {
      setMessage("⚠️ Login failed. Invalid credentials.");
    }
  };

  return (
    <div className="login-page">
  {/* Left side image */}
  <div className="image-side">
    <img src={loginImage} alt="Login illustration" />
  </div>

  {/* Right side form */}
  <div className="login-container">
  <h1 className="skillnest-text">SkillNest</h1>

  {/* Wrap the rest to center vertically */}
  <div className="form-wrapper">
    <h2 className="login-heading">Welcome Back!</h2>
    <h3 className="login-subheading">Enter your email and password</h3>
    <form onSubmit={handleSubmit} className="login-form">
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
       <p className="forgot-password">
       <Link to="/signup">Forgot password?</Link>
    </p>
      <button type="submit">Login</button>
    </form>
    
    <p className="helper-text">
      Don't have an account? <Link to="/signup">Sign up</Link>
    </p>
    {message && <p className="login-message">{message}</p>}
  </div>
</div>

</div>
  );
}
