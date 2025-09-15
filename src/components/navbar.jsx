import React, { useState } from "react";

export default function Navbar({ onToggleAdmin, onNavigate, currentView }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (view) => {
    onNavigate(view);
    setIsMenuOpen(false); // Cerrar el menú móvil después de navegar
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="cursor-pointer flex items-center"
            onClick={() => handleNavigation("home")}
          >
            <span className="text-xl font-bold text-amber-600">Essen</span>
          </div>

          {/* Menú de navegación para desktop */}
          <div className="hidden md:flex space-x-8">
            {currentView === "home" ? (
              <>
                <a 
                  href="#inicio" 
                  className="text-gray-700 hover:text-amber-600 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Inicio
                </a>
                <a 
                  href="#sobre-nosotros" 
                  className="text-gray-700 hover:text-amber-600 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('sobre-nosotros')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Sobre Nosotros
                </a>
                <a 
                  href="#eventos" 
                  className="text-gray-700 hover:text-amber-600 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('eventos')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Eventos
                </a>
                <a 
                  href="#sumate" 
                  className="text-gray-700 hover:text-amber-600 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('sumate')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Sumate
                </a>
                <button 
                  onClick={() => handleNavigation("products")}
                  className="text-gray-700 hover:text-amber-600 transition-colors"
                >
                  Productos
                </button>
              </>
            ) : (
              <button 
                onClick={() => handleNavigation("home")}
                className="text-gray-700 hover:text-amber-600 transition-colors"
              >
                Volver al Inicio
              </button>
            )}
          </div>

          {/* Botones de carrito y administración */}
          <div className="flex items-center space-x-4">
            <CartIcon />
            <button
              onClick={onToggleAdmin}
              className="bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors"
            >
              Admin
            </button>
          </div>

          {/* Botón de menú hamburguesa para móvil */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden bg-white py-2 px-4 shadow-lg rounded-b-md">
            {currentView === "home" ? (
              <div className="flex flex-col space-y-3">
                <a 
                  href="#inicio" 
                  className="text-gray-700 hover:text-amber-600 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                >
                  Inicio
                </a>
                <a 
                  href="#sobre-nosotros" 
                  className="text-gray-700 hover:text-amber-600 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('sobre-nosotros')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                >
                  Sobre Nosotros
                </a>
                <a 
                  href="#eventos" 
                  className="text-gray-700 hover:text-amber-600 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('eventos')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                >
                  Eventos
                </a>
                <a 
                  href="#sumate" 
                  className="text-gray-700 hover:text-amber-600 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('sumate')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                >
                  Sumate
                </a>
                <button 
                  onClick={() => handleNavigation("products")}
                  className="text-left text-gray-700 hover:text-amber-600 transition-colors"
                >
                  Productos
                </button>
              </div>
            ) : (
              <button 
                onClick={() => handleNavigation("home")}
                className="text-left text-gray-700 hover:text-amber-600 transition-colors w-full"
              >
                Volver al Inicio
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

