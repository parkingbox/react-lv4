import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Edit from "../components/Edit";
import Main from "../pages/Main";
import Write from "../pages/Write";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/write" element={<Write />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
