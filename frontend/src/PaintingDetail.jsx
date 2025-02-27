import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPaintingById } from "./api";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

const PaintingDetail = () => {
  const { id } = useParams();
  const [painting, setPainting] = useState(null);

  useEffect(() => {
    const getPainting = async () => {
      try {
        const data = await fetchPaintingById(id);
        setPainting(data);
      } catch (error) {
        console.error("Error fetching painting:", error);
      }
    };
    getPainting();
  }, [id]);

  const navigate = useNavigate();

  const handleCheckout = (painting) => {
    console.log("Navigating to checkout with:", painting);
    navigate("/checkout", { state: { painting } });
  };

  if (!painting) {
    return <p className="text-center text-gray-500 pt-20">Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto pt-20 px-4 py-10">
        <motion.div
          className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div
            className="overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={painting.image}
              alt={painting.title}
              className="w-full h-[500px] object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </motion.div>

          <motion.div
            className="p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-wide">
              {painting.title}
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed border-l-4 border-indigo-500 pl-4">
              {painting.description}
            </p>
            <p className="text-md text-gray-500 italic flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 12h16M4 8h16M4 16h16"
                ></path>
              </svg>
              <span>{painting.dimensions}</span>
            </p>
            <motion.p
              className="text-3xl font-bold text-indigo-600 mt-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              €{painting.price}
            </motion.p>

            {/* Buy Now Button */}
            <motion.button
              onClick={() => handleCheckout(painting)}
              className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300 ml-4"
            >
              Buy Now
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default PaintingDetail;
