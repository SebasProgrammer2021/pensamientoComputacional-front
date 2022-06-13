import React from "react";
import { Routes, Route } from "react-router-dom";
import Registration from "./pages/Registration";
import Report from "./Report";
import Tests from "./Tests";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Registration />} />
      <Route path="/test/:id" element={<Tests />} />
      <Route path="report" element={<Report />} />
    </Routes>
  );
}

export default App;
