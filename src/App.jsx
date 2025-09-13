import React, { useState } from "react";
import Navbar from "./components/navbar.jsx";
import Carousel from "./components/Carousel.jsx";
import ShopProductList from "./components/ShopProductList.jsx";
import Cart from "./components/Cart.jsx";
import Login from "./pages/login.jsx";
import AdminPanel from "./pages/adminpanel.jsx";
import Footer from "./components/footer.jsx";

const WHATSAPP_NUMBER = "5491159122734";

export default function App() {
  const [user, setUser] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Navbar onToggleAdmin={() => setShowAdmin((s) => !s)} />

      <main className="flex-grow">
        {/* Inicio */}
        <section id="inicio" className="w-full">
          <Carousel />
        </section>

        {/* Sobre nosotros */}
        <section id="sobre-nosotros" className="container mt-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center">
            Nuestra Misión
          </h2>
          <p className="mt-4 text-gray-700 text-center max-w-3xl mx-auto">
            Ofrecer productos de cocina de alta calidad que faciliten la vida
            diaria, con atención cercana y propuestas para emprendedores.
            (Edita desde Admin)
          </p>
        </section>

        {/* Productos */}
        <section id="productos" className="container mt-12">
          <ShopProductList />
        </section>

        {/* Eventos */}
        <section id="eventos" className="container mt-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center">
            Eventos
          </h2>
          <p className="mt-4 text-gray-700 text-center">
            Muy pronto compartiremos talleres, capacitaciones y experiencias
            únicas para vos. ¡Estate atento!
          </p>
        </section>

        {/* Sumate */}
        <section id="sumate" className="container mt-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center">
            Sumate a mi equipo
          </h2>
          <p className="mt-4 text-gray-700 text-center max-w-3xl mx-auto">
            Unite a nuestro equipo Essen y descubrí una forma de emprender con
            propósito, respaldo y acompañamiento constante.
          </p>
        </section>

        {/* Carrito */}
        <section className="container mt-12">
          <Cart whatsappNumber={WHATSAPP_NUMBER} />
        </section>
      </main>

      <Footer />

      {/* Admin panel */}
      {showAdmin && (
        <div className="fixed inset-0 z-50 p-6 bg-black/50 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto bg-white rounded shadow">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold">Panel Admin</h3>
              <button
                onClick={() => setShowAdmin(false)}
                className="text-sm text

