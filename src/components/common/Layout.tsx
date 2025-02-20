import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import { useAuth } from "../../hooks/useAuth";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-gray-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {isAuthenticated && (
                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="text-gray-300 hover:text-white"
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
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              )}
              <h1 className="text-2xl font-bold tracking-wide">
                Book Management App
              </h1>
            </div>
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      {isAuthenticated && (
        <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      )}

      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>

      <footer className="bg-gray-800 text-white mt-auto">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} Book Management App. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
