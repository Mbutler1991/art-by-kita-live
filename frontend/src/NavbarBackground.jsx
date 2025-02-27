import React, { useState, useEffect } from "react";

const NavbarBackground = () => {
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/gallery/api/random-header-painting/")
            .then(response => response.json())
            .then(data => {
                if (data.image) {
                    setImageUrl(data.image); // Assuming `image` is the field name in your Painting model
                }
            })
            .catch(error => console.error("Error fetching painting:", error));
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-16 overflow-hidden z-100">
            {imageUrl && (
                <img
                src={imageUrl}
                alt="Random Painting Header"
                className="w-full h-16 object-cover brightness-75"
                style={{ filter: "blur(10px)" }} // Add blur filter here
            />
            )}
        </div>
    );
};

export default NavbarBackground;
