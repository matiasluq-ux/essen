import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar.jsx";
import Carousel from "./components/Carousel.jsx";
import ProductCarousel from "./components/ProductCarousel.jsx";
import ShopProductList from "./components/ShopProductList.jsx";
import Cart from "./components/Cart.jsx";
import Login from "./pages/login.jsx";
import AdminPanel from "./pages/adminpanel.jsx";
import Footer from "./components/footer.jsx";

const WHATSAPP_NUMBER = "5491159122734";

export default function App() {
  const [user, setUser] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [currentView, setCurrentView] = useState("home");
  const [showCart, setShowCart] = useState(false);

  // Cargar carrito desde localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("essen_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  // Guardar carrito en localStorage
  useEffect(() => {
    try {
      localStorage.setItem("essen_cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cartItems]);

  // Funciones carrito
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      let newItems;

      if (existingItem) {
        newItems = prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...prevItems, { ...product, quantity: 1 }];
      }

      showNotification(`¡${product.title} agregado al carrito!`);
      return newItems;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Notificación visual
  const showNotification = (message) => {
    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md z-50 transition-opacity duration-300";
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = "0";
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Estado para formulario "Sumate"
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    motivacion: "",
    sobreVos: "",
    tiempo: "",
    interes: "",
  });

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const mensaje = `
📋 Nueva postulación en Essen

👤 Nombre y Apellido: ${form.nombre}
📞 Teléfono: ${form.telefono}

🎯 Motivación: ${form.motivacion}
📝 Sobre vos: ${form.sobreVos}
⏳ Tiempo disponible: ${form.tiempo}
✨ Interés en emprender: ${form.interes}
    `;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      mensaje
    )}`;
    window.open(url, "_blank");

    setForm({
      nombre: "",
      telefono: "",
      motivacion: "",
      sobreVos: "",
      tiempo: "",
      interes: "",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-80">
      {/* Franja promocional */}
      <div className="w-full promo-beige">
        <div className="container mx-auto px-4">
          <p className="promo-beige-text text-sm md:text-base text-center py-2">
            👉 ¡Aprovechá las mejores promos de Essen!
          </p>
        </div>
      </div>

      <Navbar
        onToggleAdmin={() => setShowAdmin((s) => !s)}
        onNavigate={setCurrentView}
        currentView={currentView}
        onToggleCart={() => setShowCart(!showCart)}
        cartItemsCount={cartItemsCount}
      />

      <main className="flex-grow">
        {currentView === "home" ? (
          <>
            {/* Carrusel */}
            <section id="inicio" className="w-full">
              <Carousel />
            </section>

            {/* Misión */}
            <section
              id="sobre-nosotros"
              className="max-w-6xl mx-auto mt-10 px-4 sm:px-6 lg:px-8"
            >
              <h2 className="text-2xl sm:text-3xl font-semibold text-center">
                Nuestra Misión
              </h2>
              <p className="mt-4 text-gray-700 text-center max-w-3xl mx-auto">
                💚 Emprendedora & Líder Essen  
                Apasionada por ayudarte a transformar tu alimentación 🥦🍲  
                📚 Estudiante de Health Coach  
                👩‍👧 Mamá x3, y junto a Mati, mi pareja, trabajamos 100% enfocados en brindarte la mejor atención 🤝  
                <br />
                ✨ Más de 1500 clientes felices en todo el país  
                ✨ Y un equipo de más de 50 personas creciendo a la par  
                <br />
                🚀 ¿Te gustaría emprender sin riesgos y sin inversión?  
                💬 Escribinos, te estamos esperando para acompañarte en este camino.  
                <br />
                😅 Advertencia: sumarse puede causar felicidad, ingresos extra y ataques de entusiasmo repentinos.  
              </p>
            </section>

            {/* Productos destacados */}
            <ProductCarousel addToCart={addToCart} />

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

            {/* Sumate */}
            <section
              id="sumate"
              className="max-w-3xl mx-auto mt-12 px-4 sm:px-6 lg:px-8"
            >
              <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
                Sumate a mi equipo
              </h2>
              <form
                onSubmit={handleFormSubmit}
                className="bg-white shadow-lg rounded-lg p-6 space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre y Apellido *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleFormChange}
                    required
                    className="w-full border rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleFormChange}
                    required
                    className="w-full border rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    ¿Tenés alguna meta que te motive? *
                  </label>
                  <textarea
                    name="motivacion"
                    value={form.motivacion}
                    onChange={handleFormChange}
                    required
                    rows="2"
                    className="w-full border rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Contanos un poco de vos *
                  </label>
                  <textarea
                    name="sobreVos"
                    value={form.sobreVos}
                    onChange={handleFormChange}
                    required
                    rows="2"
                    className="w-full border rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    ¿Cuánto tiempo le podrías dedicar semanalmente? *
                  </label>
                  <select
                    name="tiempo"
                    value={form.tiempo}
                    onChange={handleFormChange}
                    required
                    className="w-full border rounded-lg p-2"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Menos de 5 horas">Menos de 5 horas</option>
                    <option value="Más de 5 horas">Más de 5 horas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    ¿Por qué te interesa emprender en Essen? *
                  </label>
                  <textarea
                    name="interes"
                    value={form.interes}
                    onChange={handleFormChange}
                    required
                    rows="2"
                    className="w-full border rounded-lg p-2"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition"
                >
                  Enviar por WhatsApp
                </button>
              </form>
            </section>
          </>
        ) : (
          <section
            id="productos"
            className="max-w-6xl mx-auto mt-12 px-4 sm:px-6 lg:px-8"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8">
              Nuestros Productos
            </h2>
            <ShopProductList addToCart={addToCart} />
          </section>
        )}

        {/* Carrito fijo */}
        <section className="max-w-6xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
          <Cart
            whatsappNumber={WHATSAPP_NUMBER}
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
        </section>
      </main>

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

      {/* Modal Carrito */}
      {showCart && (
        <div className="fixed inset-0 z-50 p-4 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white">
              <h3 className="font-semibold text-lg">Tu Carrito de Compras</h3>
              <button
                onClick={() => setShowCart(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              {cartItems.length > 0 ? (
                <Cart
                  whatsappNumber={WHATSAPP_NUMBER}
                  cartItems={cartItems}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                />
              ) : (
                <div className="text-center py-8">
                  <h4 className="text-xl font-semibold mt-4">
                    Tu carrito está vacío
                  </h4>
                  <p className="text-gray-600 mt-2">
                    Agregá algunos productos para continuar
                  </p>
                  <button
                    onClick={() => {
                      setShowCart(false);
                      setCurrentView("products");
                    }}
                    className="mt-4 bg-amber-500 text-white px-6 py-2 rounded-md hover:bg-amber-600 transition-colors"
                  >
                    Ver Productos
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
            {/* Modal Carrito */}
      {showCart && (
        <div className="fixed inset-0 z-50 p-4 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          {/* ...contenido del modal... */}
        </div>
      )}

      {/* Botón flotante de WhatsApp */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          "¡Hola! Quiero más información sobre los productos Essen 🚀"
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 animate-bounce"
      >
        {/* Icono de WhatsApp */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-7 h-7"
        >
          <path d="M12.04 2c-5.52 0-10 4.45-10 9.94 ...etc" />
        </svg>
      </a>
    </div>
  );
}

    </div>
  );
}

