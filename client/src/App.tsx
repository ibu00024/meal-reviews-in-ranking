// import React from "react";
import { FormDataForm } from "./pages/ReviewPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import RestaurantPage from "./pages/RestaurantPage.tsx";
import NavigationBar from "./layouts/NavigationBar.tsx";

const App = () => {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="submit" element={<FormDataForm />} />
        <Route path="/restaurant/:id" element={<RestaurantPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
