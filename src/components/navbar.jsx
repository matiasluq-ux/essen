import React, { useState } from "react";
// si usás icons, asegurate de tener lucide-react o cambialo
import { Menu, X } from "lucide-react";

const Navbar = ({ onToggleAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="promo-bar">
        ¡Aprovechá las mejores promos de Essen!
      </div>
      <nav className="navbar container mx-auto">
        <h1 className="navbar-logo">Essen - Tu Tienda</h1>
        <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
          <li><a href="#inicio" onClick={toggleMenu}>Inicio</a></li>
          <li><a href="#productos" onClick={toggleMenu}>Productos</a></li>
          <li><a href="#sobre-nosotros" onClick={toggleMenu}>Sobre Nosotros</a></li>
          <li><a href="#eventos" onClick={toggleMenu}>Eventos</a></li>
          <li><a href="#sumate" onClick={toggleMenu}>Sumate a mi equipo</a></li>
          <li>
            <button
              onClick={() => { toggleMenu(); onToggleAdmin(); }}
              className="hover:text-amber-600 transition"
            >
              Admin
            </button>
          </li>
        </ul>
        <button
          className="hamburger md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>
    </>
  );
};

export default Navbar;

