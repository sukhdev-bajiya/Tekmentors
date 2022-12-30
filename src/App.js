import "./styles.css";
import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import FileMode from "./Pages/FileMode";
import UIMode from "./Pages/UIMode";
import Home from "./Pages/Home";
export default function App() {
  return (
    <div className="App">
      <h1>Tax Calculator</h1>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Link to="/filemode">File Mode</Link>
        <Link to="/">Home</Link>
        <Link to="/uimode">UI Mode</Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filemode" element={<FileMode />} />
        <Route path="/uimode" element={<UIMode />} />
      </Routes>
    </div>
  );
}
