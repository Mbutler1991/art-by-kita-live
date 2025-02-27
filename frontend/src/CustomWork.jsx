import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import { fetchPaintingById } from "./api";

const CustomWork = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    file: null,
    message: "",
    canvasSizes: [],
    honeypot: "" // Honeypot for spam protection
  });

  const canvasOptions = [
    "20x30cm",
    "30x40cm",
    "40x50cm",
    "50x70cm",
    "70x100cm",
    "100x150cm",
    "custom"
  ];

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

  const handleCanvasSizeChange = (size) => {
    setFormData((prev) => {
      const updatedSizes = prev.canvasSizes.includes(size)
        ? prev.canvasSizes.filter((s) => s !== size)
        : [...prev.canvasSizes, size];
      return { ...prev, canvasSizes: updatedSizes };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Stop form submission if honeypot is filled (bot detected)
    if (formData.honeypot) return;

    const submission = new FormData();
    submission.append("name", formData.name);
    submission.append("phone", formData.phone);
    submission.append("email", formData.email);
    submission.append("file", formData.file);
    submission.append("message", formData.message);
    submission.append("canvasSizes", formData.canvasSizes.join(", "));

    try {
      const response = await fetch("https://art-by-kita-81626722ece0.herokuapp.com/contact/api/custom-work-request/", {
        method: "POST",
        body: submission,
      });
      if (response.ok) {
        alert("Request submitted successfully!");
        setFormData({
          name: "",
          phone: "",
          email: "",
          file: null,
          message: "",
          canvasSizes: [],
          honeypot: ""
        });
      }
    } catch (error) {
      console.error("Error submitting request", error);
    }
  };

  return (
    <>
      <Navbar /> {/* Navbar component */}
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
          <h2 className="text-3xl font-bold text-center text-white mb-6">Commission a Custom Painting</h2>

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
            {/* Honeypot Field - Fully Hidden */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              autoComplete="off"
              style={{ display: "none" }}
            />

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
              <label className="text-white font-medium">Phone Number</label>
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
              <label className="text-white font-medium">Email Address</label>
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
              <label className="text-white font-medium">Upload a Reference Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="w-full mt-1 p-3 bg-white bg-opacity-30 text-white placeholder-white rounded-lg border border-white border-opacity-40 focus:ring-2 focus:ring-indigo-400 transition"
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

            <div>
              <label className="text-white font-medium">Choose Canvas Sizes</label>
              <div className="grid grid-cols-2 gap-2">
                {canvasOptions.map((size) => (
                  <label key={size} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.canvasSizes.includes(size)}
                      onChange={() => handleCanvasSizeChange(size)}
                    />
                    <span className="text-white">{size}</span>
                  </label>
                ))}
              </div>
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
              {loading ? "Sending..." : "Submit Request"}
            </button>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default CustomWork;