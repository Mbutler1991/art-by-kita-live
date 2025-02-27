import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { fetchRandomPainting } from "./api";

const About = () => {
  const [painting, setPainting] = useState(null);

  useEffect(() => {
    const getPainting = async () => {
      try {
        const randomPainting = await fetchRandomPainting();
        setPainting(randomPainting);
      } catch (error) {
        console.error("Error fetching painting:", error);
      }
    };
    getPainting();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center px-6 mt-10 md:px-12 bg-gray-100">
        <motion.div
          className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">About Me</h2>
              <p className="text-gray-600 mb-4">
                Originally from Belfast and now based in County Clare, I specialize in creating stunning landscapes and dreamscapes using acrylic on pressed canvas. My paintings include both realistic portraits of actual areas and Irish-style myth paintings, often featuring hidden fairies and enchanted scenes.
              </p>
              <p className="text-gray-600 mb-4">
                With a deep passion for capturing natures beauty and surreal visions, each painting is crafted with care and imagination, bringing your ideas to life. Whether you want a custom painting based on photos or a unique dreamscape, I can make it happen.
              </p>
              <p className="text-gray-600">
                As a Neurodivergent artist with Autism and ADHD, my creative process is shaped by a unique perspective. I infuse each painting with emotion, depth, and a connection to nature, whether it's a serene landscape or a vibrant fantasy piece.
              </p>
            </motion.div>
            {painting && (
              <motion.div
                className="hidden md:block"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <img
                  src={painting.image}
                  alt="Landscape painting by County Clare artist - Art by Kita"
                  className="rounded-lg shadow-md w-full"
                />
              </motion.div>
            )}
          </div>
        </motion.div>
        
        <motion.div
          className="max-w-4xl w-full bg-white p-8 mt-10 rounded-lg shadow-lg text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Get a Custom Landscape or Dreamscape Painting
          </h3>
          <p className="text-gray-600 mb-4">
            If you're looking for a custom painting of a favorite place, or have an idea for a dreamscape filled with mythical elements like hidden fairies, feel free to get in touch. I can bring your vision to life in an acrylic painting, whether it's a realistic landscape or a fantasy-inspired creation.
          </p>
          <motion.a
            href="/contact"
            className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Me for Custom Paintings
          </motion.a>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default About;
