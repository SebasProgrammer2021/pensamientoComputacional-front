import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Report from "./Report";
import Tests from "./Tests";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Tests />} />
      <Route path="report" element={<Report />} />
    </Routes>
  );
}

export default App;
