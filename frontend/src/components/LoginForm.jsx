import { useState } from "react";
import { login } from "../api/auth";
import { Link } from "react-router-dom"; // make sure react-router-dom is installed

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(form.email, form.password);
      localStorage.setItem("token", data.token);
      setMessage(`🎉 Logged in as ${data.user.username}`);
      console.log("Login success:", data);
      setForm({ email: "", password: "" }); // reset form
    } catch (err) {
      setMessage("⚠️ Login failed. Invalid credentials.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
      <p style={styles.helperText}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

// Same styling as SignupForm + helper text
const styles = {
  container: {
    maxWidth: "400px",
    margin: "2rem auto",
    padding: "2rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: "center",
  },
  heading: {
    marginBottom: "1rem",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#4c5eafff",
    color: "white",
    cursor: "pointer",
  },
  message: {
    marginTop: "1rem",
    fontWeight: "bold",
    color: "#ff5722",
  },
  helperText: {
    marginTop: "0.5rem",
    fontSize: "0.9rem",
    color: "#555",
  },
};
