import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { inject } from "@vercel/analytics";
import HomePage from "./pages/HomePage";
import KnowMorePage from "./pages/KnowMorePage";

function App() {
  inject();
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/know-more" element={<KnowMorePage />} />
        </Routes>
      </div>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
