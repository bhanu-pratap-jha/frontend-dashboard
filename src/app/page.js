"use client";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome to Dashboard App</h1>
        <p className={styles.subtitle}>
          Manage your data with ease & efficiency.
        </p>
        <Button
          text="Get Started"
          onClick={() => router.push("/auth")}
          className={styles.button}
        />
      </div>
    </div>
  );
}
