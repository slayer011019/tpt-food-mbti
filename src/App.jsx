// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage.jsx";
import TasteTest from "./pages/TasteTest.jsx";
import TasteDetailTest from "./pages/TasteDetailTest.jsx";
import ResultPage from "./pages/ResultPage.jsx";
import AppLayout from "./layouts/AppLayout.jsx";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/taste-test" element={<TasteTest />} />
        <Route path="/taste-detail" element={<TasteDetailTest />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/result/:type" element={<ResultPage />} />
        <Route path="/MainPage" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
