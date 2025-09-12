// src/App.jsx
import React, { useState } from "react";
import Carousel from "./components/Carousel.jsx";
import ShopProductList from "./components/ShopProductList.jsx";
import Cart from "./components/Cart.jsx";
import Login from "./pages/login.jsx";
import AdminPanel from "./pages/adminpanel.jsx";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";

const WHATSAPP_NUMBER = "5491159122734"; // Maty's number

export default function App() {
  const [user, setUser] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar */}
      <Navbar onToggleAdmin={() => setShowAdmin((s) => !s)} />

      {/* Contenido público */}
      <main className="flex-grow max-w-6xl mx-auto mt-6 px-4">
        {/* Carrusel */}
        <Carousel />

        {/* Sección Misión */}
        <section id="sobre-nosotros" className="max-w-4xl mx-auto mt-12 px-4">
          <h2 className="text-2xl font-semibold text-amber-700">Nuestra Misión</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Ofrecer productos de cocina de alta calidad que faciliten la vida
            diaria, con atención cercana y propuestas para emprendedores.
            (Edita desde Admin)
          </p>
        </section>

        {/* Lista de productos */}
        <section id="productos" className="mt-12">
          <h2 className="text-2xl font-semibold text-amber-700 mb-6">
            Productos
          </h2>
          <ShopProductList />
        </section>

        {/* Carrito */}
        <Cart whatsappNumber={WHATSAPP_NUMBER} />

        {/* Sección Eventos */}
        <section id="eventos" className="max-w-4xl mx-auto mt-16 px-4">
          <h2 className="text-2xl font-semibold text-amber-700">Eventos</h2>
          <p className="mt-3 text-gray-700">
            Aquí podrás encontrar información sobre nuestras próximas reuniones,
            lanzamientos y capacitaciones. (Edita desde Admin)
          </p>
        </section>

        {/* Sección Sumate */}
        <section id="sumate" className="max-w-4xl mx-auto mt-16 px-4">
          <h2 className="text-2xl font-semibold text-amber-700">
            Sumate a mi equipo
          </h2>
          <p className="mt-3 text-gray-700">
            Animate a emprender con nosotros y formá parte de un equipo en
            crecimiento. Conocé los beneficios y oportunidades de sumarte a
            Essen. (Edita desde Admin)
          </p>
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

