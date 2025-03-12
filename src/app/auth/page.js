"use client";
import { useState, useEffect } from "react";
import { signup, login } from "@/utils/api";
import { useRouter } from "next/navigation";
import styles from "./auth.module.css";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(null);
  const [isClient, setIsClient] = useState(false); //  Fix for Hydration Issue
  const router = useRouter();

  //  Handle localStorage after component mounts (Fixes hydration issue)
  useEffect(() => {
    setIsClient(true); //  Ensures client-side execution
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      if (storedToken) router.push("/dashboard");
    }
  }, [router]);

  if (!isClient) return null; //  Prevents hydration mismatch

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      if (isLogin) {
        const response = await login(email, password);
        if (response.token) {
          localStorage.setItem("token", response.token);
          setMessage("Welcome! Login successful! Redirecting...");
          setTimeout(() => router.push("/dashboard"), 1500);
        } else {
          setError("Oops! Invalid login credentials");
        }
      } else {
        await signup(email, password);
        setMessage("Hurray! Signup successful! Now log in.");
        setIsLogin(true);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>{isLogin ? "Login" : "Signup"}</h1>

        {message && <p className={styles.successMessage}>{message}</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className={styles.button}>
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <button className={styles.toggle} onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}
