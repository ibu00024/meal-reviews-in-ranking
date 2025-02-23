// import React from "react";
import { FormDataForm } from "./pages/ReviewPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import RestaurantPage from "./pages/RestaurantPage.tsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="submit" element={<FormDataForm />} />
        <Route path="/restaurant/:id" element={<RestaurantPage />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
