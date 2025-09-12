// src/components/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-amber-200 text-gray-800 py-6 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Mi Tienda Essen. Todos los derechos reservados.</p>
        <p className="text-sm mt-2">Hecho con ❤️ en Argentina</p>
      </div>
    </footer>
  );
};

export default Footer;
