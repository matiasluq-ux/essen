// src/App.jsx
import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Carousel from "./components/Carousel.jsx";
import ShopProductList from "./components/ShopProductList.jsx";
import Cart from "./components/Cart.jsx";
import Login from "./pages/login.jsx";
import AdminPanel from "./pages/adminpanel.jsx";
import Footer from "./components/Footer.jsx";

const WHATSAPP_NUMBER = "5491159122734"; // Maty's number

export default function App() {
  const [user, setUser] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar */}
      <Navbar onToggleAdmin={() => setShowAdmin((s) => !s)} />

      {/* Contenido público */}
      <main className="flex-grow">
        {/* Hero / Carousel */}
        <section id="inicio" className="w-full">
          <Carousel />
        </section>

        {/* Nuestra misión */}
        <section
          id="sobre-nosotros"
          className="max-w-6xl mx-auto mt-10 px-4 sm:px-6 lg:px-8"
        >
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
        <section
          id="productos"
          className="max-w-6xl mx-auto mt-12 px-4 sm:px-6 lg:px-8"
        >
          <ShopProductList />
        </section>

        {/* Eventos */}
        <section
          id="eventos"
          className="max-w-6xl mx-auto mt-12 px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-center">
            Eventos
          </h2>
          <p className="mt-4 text-gray-700 text-center">
            Muy pronto compartiremos talleres, capacitaciones y experiencias
            únicas para vos. ¡Estate atento!
          </p>
        </section>

        {/* Sumate a mi equipo */}
        <section
          id="sumate"
          className="max-w-6xl mx-auto mt-12 px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-center">
            Sumate a mi equipo
          </h2>
          <p className="mt-4 text-gray-700 text-center max-w-3xl mx-auto">
            Unite a nuestro equipo Essen y descubrí una forma de emprender con
            propósito, respaldo y acompañamiento constante.
          </p>
        </section>

        {/* Carrito */}
        <section className="max-w-6xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
          <Cart whatsappNumber={WHATSAPP_NUMBER} />
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Panel Admin */}
      {showAdmin && (
        <div className="fixed inset-0 z-50 p-6 bg-black/50 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto bg-white rounded shadow">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold">Panel Admin</h3>
              <button
                onClick={() => setShowAdmin(false)}
                className="text-sm text-gray-600"
              >
                Cerrar
              </button>
            </div>
            <div className="p-4">
              {user ? (
                <AdminPanel user={user} onLogout={() => setUser(null)} />
              ) : (
                <Login onLogin={(u) => setUser(u)} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

    </div>
  );
}

