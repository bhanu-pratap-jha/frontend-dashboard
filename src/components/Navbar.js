"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import { FiHome } from "react-icons/fi"; // Home icon
import { BiBarChart } from "react-icons/bi"; // Dashboard icon
import { AiOutlineLock } from "react-icons/ai"; // Auth icon

export default function Navbar() {
  const [currentPath, setCurrentPath] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  return (
    <div className={styles.navbar}>
      <Link href="/" className={`${styles.icon} ${currentPath === "/" ? styles.active : ""}`}>
        <FiHome size={24} />
      </Link>
      <Link href="/auth" className={`${styles.icon} ${currentPath === "/auth" ? styles.active : ""}`}>
        <AiOutlineLock size={24} />
      </Link>
      <Link href="/dashboard" className={`${styles.icon} ${currentPath === "/dashboard" ? styles.active : ""}`}>
        <BiBarChart size={24} />
      </Link>
    </div>
  );
}
