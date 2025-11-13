import { useState } from "react";
import { signup } from "../api/auth";

export default function SignupForm() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signup(form.username, form.email, form.password);
      setMessage(`Welcome, ${data.user.username}!`);
      console.log("Signup success:", data);
    } catch (err) {
      setMessage("Signup failed. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Sign Up</button>
      <p>{message}</p>
    </form>
  );
}
