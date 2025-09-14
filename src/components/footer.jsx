// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-amber-100 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo o nombre */}
        <h2 className="text-lg font-semibold text-amber-700">
        //  Essen - Tu Tienda
        </h2>

        {/* Links */}
        <ul className="flex flex-wrap justify-center gap-6 text-gray-700 font-medium">
          <li><a href="#inicio" className="hover:text-amber-600">Inicio</a></li>
          <li><a href="#productos" className="hover:text-amber-600">Productos</a></li>
          <li><a href="#sobre-nosotros" className="hover:text-amber-600">Sobre Nosotros</a></li>
          <li><a href="#eventos" className="hover:text-amber-600">Eventos</a></li>
          <li><a href="#sumate" className="hover:text-amber-600">Sumate a mi equipo</a></li>
        </ul>

        {/* Copyright */}
        <p className="text-sm text-gray-600 text-center md:text-right">
          © {new Date().getFullYear()} Essen Tienda - Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}

