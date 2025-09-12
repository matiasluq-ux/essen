import React, { useState } from "react"
import Carousel from "./components/Carousel.jsx"
import ShopProductList from "./components/ShopProductList.jsx"
import Cart from "./components/Cart.jsx"
import Login from "./pages/login.jsx"
import AdminPanel from "./pages/adminpanel.jsx"

const WHATSAPP_NUMBER = "5491159122734" // Maty's number

export default function App() {
  const [user, setUser] = useState(null)
  const [showAdmin, setShowAdmin] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="w-full bg-amber-100 shadow">
        {/* Leyenda */}
        <div className="text-center py-2 text-sm text-gray-700 bg-amber-200">
          Bienvenido a nuestra tienda Essen ✨ Calidad que acompaña tu cocina
        </div>

        {/* Menú principal */}
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <div className="text-2xl font-semibold text-amber-700">
            Essen - Tu Tienda
          </div>
          <nav className="space-x-6 text-gray-800 font-medium">
            <button
              onClick={() =>
                window.scrollTo({
                  top: document.body.scrollHeight / 3,
                  behavior: "smooth",
                })
              }
              className="hover:text-amber-600 transition"
            >
              Productos
            </button>
            <button
              onClick={() => setShowAdmin((s) => !s)}
              className="hover:text-amber-600 transition"
            >
              Admin
            </button>
          </nav>
        </div>
      </header>

      {/* Contenido público */}
      <main className="max-w-6xl mx-auto mt-6 px-4">
        <Carousel />

        <section className="max-w-4xl mx-auto mt-8 px-4">
          <h2 className="text-xl font-semibold">Nuestra Misión</h2>
          <p className="mt-2 text-gray-700">
            Ofrecer productos de cocina de alta calidad que faciliten la vida
            diaria, con atención cercana y propuestas para emprendedores.
            (Edita desde Admin)
          </p>
        </section>

        <ShopProductList />
        <Cart whatsappNumber={WHATSAPP_NUMBER} />
      </main>

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
  )
}
