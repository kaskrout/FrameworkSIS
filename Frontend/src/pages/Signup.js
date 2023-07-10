import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [FullName, setFullName] = useState("");
  const [Position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(FullName, Position, email, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>FullName:</label>
      <input
        type="FullName"
        onChange={(e) => setFullName(e.target.value)}
        value={FullName}
      />

      <label>Position:</label>
      <select
        id="position"
        onChange={(e) => setPosition(e.target.value)}
        value={Position}
      >
        <option value="">Select a position</option>
        <option value="Senior Manager">Senior Manager</option>
        <option value="Manager">Manager</option>
        <option value="Senior">Senior</option>
        <option value="Junior">Junior</option>
      </select>

      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
