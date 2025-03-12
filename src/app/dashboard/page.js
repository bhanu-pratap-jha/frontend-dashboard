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
  const [newColumnType, setNewColumnType] = useState("text"); // Default: Text input
  const [error, setError] = useState("");
  const [token, setToken] = useState(null);
  const [isClient, setIsClient] = useState(false); //  Fix for Hydration Issue
  const router = useRouter();

  //  Fetch Data & Handle Authentication Only on Client
  useEffect(() => {
    setIsClient(true); //  Ensures client-side execution
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      if (!storedToken) router.push("/auth");
    }

    fetchSheetData()
      .then((sheetData) => {
        if (sheetData.length > 0) {
          setColumns(sheetData[0]); //  First row is headers
          setData(sheetData.slice(1)); //  Remaining rows are actual data
        }
      })
      .catch(() => setError(" Failed to load data. Try again later."));

    //  Restore Dynamic Columns from Local Storage
    const savedDynamicColumns = JSON.parse(localStorage.getItem("dynamicColumns") || "[]");
    setDynamicColumns(savedDynamicColumns);
  }, [router]);

  if (!isClient) return null; //  Prevents hydration mismatch

  //  Handle Adding Data to Google Sheets
  const handleAddData = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.date) {
      setError(" All fields are required!");
      return;
    }

    const newRow = [
      formData.name,
      formData.email,
      formData.date,
      ...dynamicColumns.map((col) => formData[col.name] || ""),
    ];

    console.log(" New Row Data Before Sending:", newRow);

    try {
      await addSheetData(newRow);
      setData([...data, newRow]);
      setFormData({});
      setError("");
    } catch (error) {
      setError(" Failed to add data.");
      console.error(" Full Error Object:", error);
    }
  };

  //  Handle Adding Dynamic Columns (Only in UI)
  const handleAddColumn = () => {
    if (!newColumnName.trim()) {
      alert("Column name cannot be empty!");
      return;
    }

    const updatedColumns = [...dynamicColumns, { name: newColumnName, type: newColumnType }];
    setDynamicColumns(updatedColumns);
    localStorage.setItem("dynamicColumns", JSON.stringify(updatedColumns));

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

        {/*  Table Rendering */}
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

        {/*  Add Data Form */}
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
          <Button text="Add Data" type="submit" className={styles.submit} />
        </form>

        {/*  Add Dynamic Column Form */}
        <div className={styles.dynamicColumnForm}>
          <input type="text" placeholder="Column Name" value={newColumnName} onChange={(e) => setNewColumnName(e.target.value)} />
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
