import SignupForm from "./components/SignupForm";
// import LoginForm from "./components/LoginForm";

function App() {
  return (
    <div>
      <h1 style={{
    display: "flex",
    justifyContent: "center", // horizontal center
    alignItems: "center",     // vertical center
  }}>SkillNest Auth Test</h1>
      <SignupForm />
      {/* <LoginForm /> */}
    </div>
  );
}


export default App;
