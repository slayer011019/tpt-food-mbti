// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage.jsx";
import TasteTest from "./pages/TasteTest.jsx";
import ResultPage from "./pages/ResultPage.jsx";
import AppLayout from "./layouts/AppLayout.jsx";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/taste-test" element={<TasteTest />} />
        <Route path="/taste-detail" element={<Navigate to="/taste-test" replace />} />
        <Route path="/big-five-test" element={<Navigate to="/" replace />} />
        <Route path="/validation-dashboard" element={<Navigate to="/" replace />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/result/:type" element={<ResultPage />} />
        <Route path="/MainPage" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
