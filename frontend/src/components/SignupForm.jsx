import { useState } from "react";
import { signup } from "../api/auth";

import { Link, useNavigate } from "react-router-dom";
import "./SignupForm.css"; // import CSS


export default function SignupForm() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // for redirecting

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signup(form.username, form.email, form.password);
      setMessage(`🎉 Welcome, ${data.user.username}!`);
      setForm({ username: "", email: "", password: "" });


      // redirect to choose hobbies page for new users only
if (data.isNew) {
  navigate(`/choose-hobbies?userId=${data.user._id}`); // use _id, not id
}



    } catch (err) {
      setMessage("⚠️ Signup failed. Try again.");
    }
  };

  return (
    <div className="signup-page">
  <div className="signup-image"></div>
  <div className="signup-container">
    <h1 className="signup-brand">SkillNest</h1>
    <h2 className="signup-heading">Sign Up</h2>
    <h3 className="signup-subheading">Create your account</h3>

    <form className="signup-form" onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <button type="submit">Sign Up</button>
    </form>

    {message && <p className="signup-message">{message}</p>}
    <p className="helper-text">Already have an account? <Link to="/login">Log in</Link></p>
  </div>
</div>

  );
}
