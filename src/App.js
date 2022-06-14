import React from "react";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Registration from "./pages/Registration";
import Report from "./Report";
import Tests from "./Tests";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Registration />} />
      <Route path="/test/:id" element={<Tests />} />
      <Route path="report" element={<Report />} />
      <Route path="page-not-found" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
