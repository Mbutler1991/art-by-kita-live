import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Gallery from "./Gallery";
import Contact from "./Contact";
import About from "./About";
import PaintingDetail from "./PaintingDetail";
import CustomWork from "./CustomWork";
import CheckoutForm from "./CheckoutForm";

const App = () => {
  return (
    <div className="relative">
      {/* Basket Icon - Always Visible */}

      {/* Routes */}
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/gallery/*" element={<Gallery />} />
        <Route path="/custom-work" element={<CustomWork />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/painting" element={<PaintingDetail />} />
        <Route path="/painting/:id" element={<PaintingDetail />} />
      </Routes>
    </div>
  );
};

export default App;

