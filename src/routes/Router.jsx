import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Edit from "../components/Edit";
import Login from "../pages/Login";
import Main from "../pages/Main";
import SignUp from "../pages/SignUp";
import Write from "../pages/Write";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/write" element={<Write />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
