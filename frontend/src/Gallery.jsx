import React, { useEffect, useState } from "react";
import { fetchPaintings } from "./api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import Navbar from "./Navbar";
import Footer from "./Footer";

const Gallery = () => {
  const [paintings, setPaintings] = useState([]);
  const navigate = useNavigate();

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

  if (paintings.length === 0) {
    return <p className="text-center text-gray-500 pt-20">No paintings available</p>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto pt-20 px-4 py-10">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, ease: "easeOut" }} // Fade-in effect
        >
          {paintings.map((painting, index) => (
            <motion.div
              key={painting.id}
              className="relative group cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
              onClick={() => navigate(`/painting/${painting.id}`)}
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered effect
              whileHover={{ scale: 1.1 }} // Enlarge slightly on hover
            >
              {/* Painting Image */}
              <div className="w-full h-80 overflow-hidden rounded-lg shadow-lg">
                <img
                  src={painting.image}
                  alt={painting.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Overlay Title */}
              <motion.div 
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-center px-4 py-2 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <h2 className="text-lg font-semibold">{painting.title}</h2>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Gallery;
