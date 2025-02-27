import axios from "axios";

const API_URL = "http://127.0.0.1:8000/gallery/api"; // Adjust based on your Django API

export const fetchPaintings = async () => {
    try {
        const response = await axios.get(`${API_URL}/paintings/`);
        console.log("Fetched paintings:", response.data); // Debugging log
        return response.data;
    } catch (error) {
        console.error("Error fetching paintings:", error);
        return [];
    }
};

export const fetchPaintingById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/paintings/${id}/`);
        console.log("Fetched painting:", response.data); // Debugging log
        return response.data;
    } catch (error) {
        console.error("Error fetching painting:", error);
        return null; // Return null if there's an error
    }
};

export const fetchRandomPainting = async () => {
    try {
        const paintings = await fetchPaintings();
        if (paintings.length === 0) {
            throw new Error("No paintings available");
        }
        const randomIndex = Math.floor(Math.random() * paintings.length);
        return paintings[randomIndex]; // Return a random painting from the list
    } catch (error) {
        console.error("Error fetching random painting:", error);
        return null;
    }
};
