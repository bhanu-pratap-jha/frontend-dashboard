"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchSheetData, addSheetData, logout } from "@/utils/api";
import Button from "../../components/Button";
import Input from "../../components/Input";
import styles from "./dashboard.module.css";
import TableCreator from "../../components/TableCreator";

export default function Dashboard() {
  const [data, setData] = useState([]); // Google Sheets Data
  const [columns, setColumns] = useState([]); // Google Sheets headers
  const [dynamicColumns, setDynamicColumns] = useState([]); // User-added columns
  const [formData, setFormData] = useState({});
  const [newColumnName, setNewColumnName] = useState("");
  const [newColumnType, setNewColumnType] = useState("text");
  const [error, setError] = useState("");
  const [token, setToken] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // Fetch Data & Handle Authentication Only on Client
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      if (!storedToken) router.push("/auth");
    }

    const loadData = async () => {
      try {
        const sheetData = await fetchSheetData();
        if (sheetData.length > 0) {
          setColumns(sheetData[0]); // First row as headers
          setData(sheetData.slice(1)); // Remaining rows as data
        }
      } catch (err) {
        setError("Failed to load data. Try again later.");
      }
    };

    loadData();

    // Fetch updates every 10 seconds for real-time updates
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, [router]);

  // Restore Dynamic Columns & Ensure formData includes all fields
  useEffect(() => {
    const savedDynamicColumns = JSON.parse(localStorage.getItem("dynamicColumns") || "[]");
    setDynamicColumns(savedDynamicColumns);

    // Initialize formData to include all columns (existing + dynamic)
    setFormData((prev) =>
      [...columns.slice(3), ...savedDynamicColumns].reduce(
        (acc, col) => ({ ...acc, [col.name || col]: prev[col.name || col] || "" }),
        prev
      )
    );
  }, [columns]);

  if (!isClient) return null; // Prevents hydration mismatch

  // Handle Adding Data to Google Sheets
  const handleAddData = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.date) {
      setError("All fields are required!");
      return;
    }

    const newRow = [
      formData.name,
      formData.email,
      formData.date,
      ...dynamicColumns.map((col) => formData[col.name] || ""),
    ];

    console.log("New Row Data Before Sending:", newRow);

    try {
      await addSheetData(newRow);
      setData([...data, newRow]);
      setFormData({});
      setError("");
    } catch (error) {
      setError("Failed to add data.");
      console.error("Full Error Object:", error);
    }
  };

  // Handle Adding Dynamic Columns (Only in UI)
  const handleAddColumn = () => {
    if (!newColumnName.trim()) {
      alert("Column name cannot be empty!");
      return;
    }

    const updatedColumns = [...dynamicColumns, { name: newColumnName, type: newColumnType }];
    setDynamicColumns(updatedColumns);
    localStorage.setItem("dynamicColumns", JSON.stringify(updatedColumns));

    // Update formData to include new column
    setFormData((prev) => ({ ...prev, [newColumnName]: "" }));

    setNewColumnName("");
    setNewColumnType("text");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Dashboard - Google Sheets Data</h1>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <div className={styles.logoutContainer}>
          <Button text="Logout" onClick={logout} className={styles.logout} />
        </div>

        {/* Table Rendering */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th key={index}>{col}</th>
                ))}
                {dynamicColumns.map((col, index) => (
                  <th key={`dynamic-${index}`}>{col.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col, colIndex) => (
                    <td key={`${rowIndex}-${colIndex}`}>{row[colIndex] || ""}</td>
                  ))}
                  {dynamicColumns.map((col, colIndex) => (
                    <td key={`${rowIndex}-dyn-${colIndex}`}>
                      {row[columns.length + colIndex] || ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Google Sheet Button */}
        <Button
          text="Open Google Sheet"
          onClick={() => window.open("https://docs.google.com/spreadsheets/d/1MYUHr_0TRJSor9sMZyFcck0PP7wCi6ayLORCMKzvdlk/edit?gid=0#gid=0", "_blank")}
          className={styles.googleSheetButton}
        />

        {/* Add Data Form */}
        <form className={styles.form} onSubmit={handleAddData}>
          <Input
            type="text"
            placeholder="Name"
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            type="email"
            placeholder="Email"
            value={formData.email || ""}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input
            type="date"
            value={formData.date || ""}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />

          {/* Dynamically Render Inputs for All Existing and New Columns */}
          {dynamicColumns.map((col, index) => (
            <Input
              key={`dyn-input-${index}`}
              type={col.type}
              placeholder={col.name}
              value={formData[col.name] || ""}
              onChange={(e) => setFormData({ ...formData, [col.name]: e.target.value })}
            />
          ))}

          <Button text="Add Data" type="submit" className={styles.submit} />
        </form>

        {/* Add Dynamic Column Form */}
        <div className={styles.dynamicColumnForm}>
          <input
            type="text"
            placeholder="Column Name"
            value={newColumnName}
            onChange={(e) => setNewColumnName(e.target.value)}
          />
          <select value={newColumnType} onChange={(e) => setNewColumnType(e.target.value)}>
            <option value="text">Text</option>
            <option value="date">Date</option>
          </select>
          <Button text="Add Column" onClick={handleAddColumn} className={styles.addColumn} />
        </div>

        <TableCreator />
      </div>
    </div>
  );
}
