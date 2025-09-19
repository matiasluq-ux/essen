import React, { useState } from "react";

export default function Navbar({ onToggleAdmin, onNavigate, currentView, onToggleCart, cartItemsCount }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (view) => {
    onNavigate(view);
    setIsMenuOpen(false); // Cerrar el menú móvil después de navegar
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
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
            {/* Icono del Carrito */}
            <button
              onClick={onToggleCart}
              className="relative p-2 text-gray-700 hover:text-amber-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </button>

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
                
                {/* Opción de carrito en menú móvil */}
                <button
                  onClick={() => {
                    onToggleCart();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center text-left text-gray-700 hover:text-amber-600 transition-colors pt-2 border-t border-gray-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Carrito
                  {cartItemsCount > 0 && (
                    <span className="ml-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cartItemsCount}
                    </span>
                  )}
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => handleNavigation("home")}
                  className="text-left text-gray-700 hover:text-amber-600 transition-colors w-full"
                >
                  Volver al Inicio
                </button>
                
                {/* Opción de carrito en menú móvil */}
                <button
                  onClick={() => {
                    onToggleCart();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center text-left text-gray-700 hover:text-amber-600 transition-colors pt-2 border-t border-gray-100 w-full mt-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Carrito
                  {cartItemsCount > 0 && (
                    <span className="ml-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cartItemsCount}
                    </span>
                  )}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
