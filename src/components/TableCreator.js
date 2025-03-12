"use client";
import { useState } from "react";
import styles from "./tableCreator.module.css";
import Button from "./Button";
import Input from "./Input";

export default function TableCreator() {
  const [tables, setTables] = useState([]);
  const [tableName, setTableName] = useState("");
  const [columns, setColumns] = useState([{ name: "", type: "text" }]);
  const [tableData, setTableData] = useState({});

  const addColumn = () => {
    setColumns([...columns, { name: "", type: "text" }]);
  };

  const createTable = () => {
    if (!tableName.trim()) {
      alert("Table name cannot be empty!");
      return;
    }
    if (columns.some((col) => !col.name.trim())) {
      alert("All column names must be filled!");
      return;
    }

    setTables([
      ...tables,
      { id: tables.length + 1, name: tableName, columns: [...columns], rows: [] },
    ]);
    setTableName("");
    setColumns([{ name: "", type: "text" }]);
  };

  const addDataToTable = (tableId) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              rows: [...(table.rows || []), table.columns.map((col) => tableData[col.name] || "")],
            }
          : table
      )
    );
    setTableData({});
  };

  return (
    <div className={styles.tableCreatorContainer}>
      <h2 className={styles.heading}>Create a Custom Table</h2>
      <div className={styles.inputContainer}>
        <Input
          className={styles.tableInput}
          type="text"
          placeholder="Table Name"
          value={tableName || ""} // Ensure default value
          onChange={(e) => setTableName(e.target.value)}
        />
      </div>

      {columns.map((col, index) => (
        <div key={index} className={styles.columnInput}>
          <Input
            type="text"
            placeholder="Column Name"
            value={col.name || ""} // Ensure default value
            onChange={(e) => {
              const newColumns = [...columns];
              newColumns[index].name = e.target.value;
              setColumns(newColumns);
            }}
          />
          <select
            value={col.type}
            onChange={(e) => {
              const newColumns = [...columns];
              newColumns[index].type = e.target.value;
              setColumns(newColumns);
            }}
          >
            <option value="text">Text</option>
            <option value="date">Date</option>
          </select>
        </div>
      ))}

      <Button text="Add Column" onClick={addColumn} className={styles.addColumn} />
      <Button text="Create Table" onClick={createTable} className={styles.createTable} />

      {tables.map((table) => (
        <div key={table.id} className={styles.tableContainer}>
          <h3>{table.name}</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                {table.columns.map((col, index) => (
                  <th key={index}>{col.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(table.rows || []).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              addDataToTable(table.id);
            }}
          >
            {table.columns.map((col, index) => (
              <Input
                key={index}
                type={col.type}
                placeholder={col.name}
                value={tableData[col.name] || ""} // Ensure default value
                onChange={(e) => setTableData({ ...tableData, [col.name]: e.target.value })}
              />
            ))}
            <Button text="Add Data" type="submit" className={styles.submit} />
          </form>
        </div>
      ))}
    </div>
  );
}
