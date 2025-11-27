import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <Router>
      <div>
        <h1 style={{ textAlign: "center" }}>SkillNest</h1>

        <Routes>
          
          {/* Default route → send user to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
