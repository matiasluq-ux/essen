// src/components/Navbar.jsx
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = ({ onToggleAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-amber-100 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl md:text-2xl font-bold text-amber-700">
          Essen - Tu Tienda
        </h1>

        {/* Menú Desktop */}
        <ul className="hidden md:flex space-x-6 text-gray-800 font-medium">
          <li><a href="#inicio" className="hover:text-amber-600">Inicio</a></li>
          <li><a href="#productos" className="hover:text-amber-600">Productos</a></li>
          <li><a href="#sobre-nosotros" className="hover:text-amber-600">Sobre Nosotros</a></li>
          <li><a href="#eventos" className="hover:text-amber-600">Eventos</a></li>
          <li><a href="#sumate" className="hover:text-amber-600">Sumate a mi equipo</a></li>
          <li>
            <button
              onClick={onToggleAdmin}
              className="hover:text-amber-600 transition"
            >
              Admin
            </button>
          </li>
        </ul>

        {/* Botón hamburguesa móvil */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div className="md:hidden bg-amber-50 shadow-lg">
          <ul className="flex flex-col space-y-4 p-4 text-gray-700 font-medium">
            <li><a href="#inicio" onClick={toggleMenu}>Inicio</a></li>
            <li><a href="#productos" onClick={toggleMenu}>Productos</a></li>
            <li><a href="#sobre-nosotros" onClick={toggleMenu}>Sobre Nosotros</a></li>
            <li><a href="#eventos" onClick={toggleMenu}>Eventos</a></li>
            <li><a href="#sumate" onClick={toggleMenu}>Sumate a mi equipo</a></li>
            <li>
              <button onClick={() => {toggleMenu(); onToggleAdmin();}}>
                Admin
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
