import React from "react";
import { Link } from "react-router-dom";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="p-4 border-b">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <nav className="p-4">
        <ul className="space-y-4">
          <li>
            <Link
              to="/books"
              className="block text-gray-700 hover:text-blue-600 transition-colors"
              onClick={onClose}
            >
              Books
            </Link>
          </li>
          <li>
            <Link
              to="/add-book"
              className="block text-gray-700 hover:text-blue-600 transition-colors"
              onClick={onClose}
            >
              Add Book
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
