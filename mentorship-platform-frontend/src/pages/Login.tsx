import "../styles/Auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
   
    console.log("trying to Log-in with:", form.email, form.password);


    try {
      const res = await login({ email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  <div className="auth-container">
  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <p>Don't have an account? <a href="/register">Register</a></p>
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
</form>
    </div>
  );
};

export default Login;
</div>;
};