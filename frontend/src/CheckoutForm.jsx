import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

const CheckoutForm = () => {
  const location = useLocation();
  const painting = location.state?.painting;

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    address: "",
    phone_number: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    setBackgroundImage("/path-to-your-background-image.jpg");
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log("Painting received in checkout:", painting);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!painting) {
      console.error("No painting data available.");
      return;
    }
    try {
      console.log(formData);
      const response = await fetch("http://localhost:8000/orders/api/create-order/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, painting_id: painting.id }),
      });

      if (!response.ok) throw new Error("Failed to create order");

      const { checkout_url } = await response.json();
      window.location.href = checkout_url;
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <motion.div
          className="relative bg-white bg-opacity-20 backdrop-blur-lg p-8 mt-20 rounded-lg shadow-xl max-w-lg w-full border border-white border-opacity-30"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold text-center text-white mb-6">Checkout</h2>

          {error && <p className="text-red-400 text-center">{error}</p>}
          {success && <p className="text-green-400 text-center">🎉 Order Placed Successfully! 🎉</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-white font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 bg-white bg-opacity-30 text-white placeholder-white rounded-lg border border-white border-opacity-40 focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="text-white font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 bg-white bg-opacity-30 text-white placeholder-white rounded-lg border border-white border-opacity-40 focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="Your Email"
              />
            </div>

            <div>
              <label className="text-white font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 bg-white bg-opacity-30 text-white placeholder-white rounded-lg border border-white border-opacity-40 focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="Your Address"
              />
            </div>

            <div>
              <label className="text-white font-medium">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 bg-white bg-opacity-30 text-white placeholder-white rounded-lg border border-white border-opacity-40 focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="Your Phone Number"
              />
            </div>

            <button
              type="submit"
              className={`w-full p-3 mt-4 text-white font-semibold rounded-lg transition-all transform ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-500 hover:bg-indigo-600 hover:scale-105 active:scale-95"
              }`}
              disabled={loading}
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </form>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutForm;
