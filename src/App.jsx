import SignUp from "../src/components/pages/SignUp";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashborad/Dashboard";
import Login from "./components/pages/Login";
import ForgotPassword from "./components/pages/ForgotPassword";
import UpdateProfile from "./components/pages/UpdateProfile";
import GeneralStockPage from "./components/GeneralStockPage/GeneralStockPage";
import Home from "./components/Home/Home";
import React, { useState, useEffect } from "react";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/update-profile" element={<UpdateProfile />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard/stockPage" element={<GeneralStockPage />} />
      <Route path="/stockPage" element={<GeneralStockPage />} />
    </Routes>
  );
}

export default App;
