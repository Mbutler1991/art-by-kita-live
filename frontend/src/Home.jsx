import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ArtGallerySlider from "./ArtGallerySlider";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { fetchPaintings } from "./api"; // Ensure this function fetches painting data

const Home = () => {
  const [paintings, setPaintings] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const getPaintings = async () => {
      try {
        const data = await fetchPaintings();
        setPaintings(data);
      } catch (error) {
        console.error("Error fetching paintings:", error);
      }
    };
    getPaintings();
  }, []);

  const location = useLocation();
  const [paymentMessage, setPaymentMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("payment_status");

    if (status === "success") {
      setPaymentMessage("✅ Order successful! Thank you for your purchase.");
    } else if (status === "cancel") {
      setPaymentMessage("❌ Order cancelled. You can try again.");
    }

    // Remove the query parameter from the URL after displaying the message
    window.history.replaceState({}, document.title, "/");
  }, [location]);

  return (
    <>
      <Navbar currentPainting={paintings[currentIndex]?.image} />
      <Routes>
        <Route 
          path="/" 
          element={<ArtGallerySlider paintings={paintings} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />} 
        />
      </Routes>
      <Footer />
    </>
  );
};

export default Home;

