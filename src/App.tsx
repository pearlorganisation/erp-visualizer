import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { DevDepartment, BdDepartment, SeoDepartment } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path={"/technology-floor1"} element={<DevDepartment />} />
      <Route path={"/technology-floor2"} element={<BdDepartment />} />
      <Route path={"/technology-floor3"} element={<SeoDepartment />} />
      <Route path={"*"} element={<Navigate to={"/technology-floor1"} />} />
    </Routes>
  );
};

export default App;
