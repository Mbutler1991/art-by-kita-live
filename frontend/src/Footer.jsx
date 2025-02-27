import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
    <footer className="w-full bg-black bg-opacity-60 text-white border border-white/40 shadow-lg rounded-t-lg p-4 text-center mt-8">
      <p className="text-lg font-semibold">
        &copy; {currentYear} Art by Kita. All rights reserved.
      </p>
      <p className="text-sm mt-2">
        Website by{" "}
        <a
          href="https://www.incywincywebservices.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300 hover:underline"
        >
          Incy Wincy Web Services
        </a>
      </p>
    </footer>
    </>
  );
};

export default Footer;
