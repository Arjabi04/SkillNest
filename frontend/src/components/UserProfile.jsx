// UserProfile.jsx
import { useLocation } from "react-router-dom";

export default function UserProfile() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = params.get("userId");

  // For now, you can just display the userId
  return (
    <div style={{ maxWidth: "800px", margin: "3rem auto", textAlign: "center" }}>
      <h2>User Profile</h2>
      <p>Welcome, user with ID: <strong>{userId}</strong></p>
      <p>Your interests will be shown here soon!</p>
    </div>
  );
}
