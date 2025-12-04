import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import ResetPasswordPage from "./components/ResetPasswordPage";
import ForgotPasswordPage from "./components/ForgotPassword";
import ChooseInterests from "./components/ChooseInterests";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <Router>
      <div>
        {/* <h1 style={{ textAlign: "center" }}>SkillNest</h1> */}

        <Routes>

          {/* Default route → send user to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />

          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/choose-interests" element={<ChooseInterests />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
