import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="fixed bg-black bg-opacity-60 top-0 left-0 w-full h-16 z-10">
        {/* Navbar Content */}
        <nav
          className="fixed top-0 left-0 w-full h-16 
  text-white border border-white/40 
  shadow-lg rounded-b-lg flex justify-center space-x-6 p-4"
        >
          <Link
            to="/"
            className="text-lg font-semibold hover:text-gray-300 transition"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-lg font-semibold hover:text-gray-300 transition"
          >
            About
          </Link>
          <Link
            to="/gallery"
            className="text-lg font-semibold hover:text-gray-300 transition"
          >
            Gallery
          </Link>
          <Link
            to="/contact"
            className="text-lg font-semibold hover:text-gray-300 transition"
          >
            Contact
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
