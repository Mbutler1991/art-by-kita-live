import React, { useEffect, useState } from "react";
import { fetchPaintings } from "./api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ArtGallerySlider = () => {
  const [paintings, setPaintings] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  useEffect(() => {
    if (paintings.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => getWrappedIndex(prevIndex + 1));
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [paintings]); // Re-run when paintings are loaded

  if (paintings.length === 0) {
    return <p className="text-center pt-10">No paintings available</p>;
  }

  const getWrappedIndex = (index) => {
    return (index + paintings.length) % paintings.length;
  };

  const nextPainting = () => {
    setCurrentIndex((prevIndex) => getWrappedIndex(prevIndex + 1));
  };

  const prevPainting = () => {
    setCurrentIndex((prevIndex) => getWrappedIndex(prevIndex - 1));
  };

  const goToDetails = (id) => {
    navigate(`/painting/${id}`);
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      
      {/* Main Image */}
      <div className="relative w-full h-full flex items-center justify-center">
        <button
          onClick={prevPainting}
          className="absolute left-4 z-10 bg-black/50 p-2 rounded-full"
        >
          <ChevronLeft size={40} color="white" />
        </button>

        <img
          key={paintings[currentIndex].id}
          src={paintings[currentIndex].image}
          alt={paintings[currentIndex].title}
          className="w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-0 animate-fadeIn"
        />

        <button
          onClick={nextPainting}
          className="absolute right-4 z-10 bg-black/50 p-2 rounded-full"
        >
          <ChevronRight size={40} color="white" />
        </button>
      </div>

      {/* Brass Plaque - Centered */}
      <div
        onClick={() => goToDetails(paintings[currentIndex].id)}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 
    bg-white/10 border border-white/20 
    shadow-lg p-4 rounded-lg z-20 flex flex-col items-center justify-center
    cursor-pointer transition-all duration-300 ease-in-out 
    min-h-[60px] w-[200px] hover:bg-white/30 hover:shadow-xl"
        style={{
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)", // Safari support
        }}
      >
        <h3 className="text-base font-semibold text-white drop-shadow-lg transition-all duration-300 ease-in-out hover:scale-105">
          {paintings[currentIndex].title}
        </h3>
      </div>
    </div>
  );
};

export default ArtGallerySlider;


