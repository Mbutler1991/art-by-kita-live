import React, { useEffect, useState } from "react";
import { fetchPaintings } from "./api";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PaintingsList = () => {
    const [paintings, setPaintings] = useState([]);

    useEffect(() => {
        const getPaintings = async () => {
            const data = await fetchPaintings();
            console.log("Paintings received:", data); // Debugging log
            setPaintings(data);
        };
        getPaintings();
    }, []);

    return (
        <>
        
        <div>
            <h2>Gallery</h2>
            {paintings.length === 0 ? (
                <p>No paintings available</p>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
                    {paintings.map((painting, index) => (
                        <div key={index} style={{ border: "1px solid #ddd", padding: "10px", textAlign: "center" }}>
                            <img src={painting.image} alt={painting.title} style={{ width: "100%" }} />
                            <h3>{painting.title}</h3>
                            <p>{painting.description}</p>
                            <p><strong>€{painting.price}</strong></p>
                        </div>
                    ))}
                </div>
            )}
        </div>
        <Footer />
        </>
    );
};

export default PaintingsList;

