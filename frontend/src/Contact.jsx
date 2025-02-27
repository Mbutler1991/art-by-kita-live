import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { fetchPaintingById } from "./api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    honeypot: "",
    recaptchaToken: "",
  });

  const [backgroundImage, setBackgroundImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const getPainting = async () => {
      try {
        const painting = await fetchPaintingById(8);
        if (painting?.image) {
          setBackgroundImage(painting.image);
        } else {
          console.error("Painting not found or missing image field.");
        }
      } catch (error) {
        console.error("Error fetching painting for background:", error);
      }
    };

    getPainting();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
  
    if (formData.honeypot) {
      console.warn("Bot detected via honeypot field!");
      return;
    }
  
    if (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") {
      console.warn("Bypassing reCAPTCHA for local testing.");
      formData.recaptchaToken = "dummy_token";
    } else {
      if (!window.grecaptcha || !window.grecaptcha.execute) {
        console.error("reCAPTCHA not loaded properly.");
        setError("reCAPTCHA failed to load. Please try again.");
        return;
      }
      formData.recaptchaToken = await window.grecaptcha.execute("YOUR_SITE_KEY", { action: "contact_form" });
    }
  
    try {
      // 1️⃣ Fetch the CSRF token first
      const csrfToken = await getCSRFToken();
  
      // 2️⃣ Then, send the POST request with the CSRF token
      const response = await fetch("http://127.0.0.1:8000/contact/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,  // ✅ Include fetched CSRF token
        },
        credentials: "include", // ✅ Required for cookies
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
  
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "", honeypot: "", recaptchaToken: "" });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  // ✅ Function to fetch the CSRF token from Django API
  async function getCSRFToken() {
    try {
      const response = await fetch("http://127.0.0.1:8000/contact/api/csrf/", {
        method: "GET",
        credentials: "include",  // ✅ Ensures CSRF cookie is set
      });
  
      const data = await response.json();
      return data.csrfToken;  // ✅ Return CSRF token from API response
    } catch (error) {
      console.error("Failed to fetch CSRF token:", error);
      return "";
    }
  }
  

  return (
    <>
      <Navbar />
      <div
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <motion.div
          className="relative bg-white bg-opacity-20 backdrop-blur-lg p-8 mt-20 rounded-lg shadow-xl max-w-lg w-full border border-white border-opacity-30"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold text-center text-white mb-6">Contact Us</h2>

          {error && <p className="text-red-400 text-center">{error}</p>}

          <AnimatePresence>
            {success && (
              <motion.div
                className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                🎉 Thank You! Your Message Has Been Submitted! 🎉
              </motion.div>
            )}
          </AnimatePresence>

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

            <div>
              <label className="text-white font-medium">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 bg-white bg-opacity-30 text-white placeholder-white rounded-lg border border-white border-opacity-40 h-28 focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="Your Message"
              ></textarea>
            </div>

            <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} style={{ display: "none" }} />

            <button
              type="submit"
              className={`w-full p-3 mt-4 text-white font-semibold rounded-lg transition-all transform ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-500 hover:bg-indigo-600 hover:scale-105 active:scale-95"
              }`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;

