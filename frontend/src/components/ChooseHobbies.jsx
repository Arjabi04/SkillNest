import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function ChooseInterests() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = params.get("userId"); // get userId from URL

  const [selectedInterests, setSelectedInterests] = useState([]);
  const [message, setMessage] = useState("");

  const InterestsList = [
    "Cooking",
    "Painting",
    "Photography",
    "Reading",
    "Music",
    "Traveling",
    "Gaming",
    "Fitness"
  ];

  const toggleHobby = (hobby) => {
    if (selectedInterests.includes(hobby)) {
      setSelectedInterests(selectedInterests.filter(h => h !== hobby));
    } else {
      setSelectedInterests([...selectedInterests, hobby]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      setMessage("User ID missing.");
      return;
    }
    try {
      const res = await fetch("http://localhost:4000/api/interests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, interests: selectedInterests })
      });
      const data = await res.json();
      setMessage(data.msg);
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
      console.log({ userId, selectedInterests });

    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "3rem auto", textAlign: "center" }}>
      <h2>Choose Your Interests</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
          {InterestsList.map((hobby) => (
            <label key={hobby} style={{ border: "1px solid #ccc", padding: "0.5rem 1rem", borderRadius: "8px", cursor: "pointer" }}>
              <input
                type="checkbox"
                value={hobby}
                checked={selectedInterests.includes(hobby)}
                onChange={() => toggleHobby(hobby)}
                style={{ marginRight: "0.5rem" }}
              />
              {hobby}
            </label>
          ))}
        </div>
        <button type="submit" style={{ marginTop: "1rem", padding: "0.75rem 1.5rem", backgroundColor: "#4c5eafff", color: "white", border: "none", borderRadius: "8px" }}>
          Save Interests
        </button>
      </form>
      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </div>
  );
}
