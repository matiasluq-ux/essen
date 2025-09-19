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
  
  // Cargar el carrito desde localStorage al inicializar
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('essen_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });
     
  // Guardar el carrito en localStorage cuando cambie
  useEffect(() => {
    try {
      localStorage.setItem('essen_cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      let newItems;
      
      if (existingItem) {
        newItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...prevItems, { ...product, quantity: 1 }];
      }
      
      // Mostrar notificación
      showNotification(`¡${product.title} agregado al carrito!`);
      return newItems;
    });
  };

  // Función para eliminar productos del carrito
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Función para actualizar la cantidad de un producto
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Función para mostrar notificaciones
  const showNotification = (message) => {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md z-50 transition-opacity duration-300';
    notification.textContent = message;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  // Calcular el total de items en el carrito
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
   
  return (     
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-80">
      {/* Franja promocional beige - Ahora en la parte superior */}
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
            {/* Carrusel de imágenes */}
            <section id="inicio" className="w-full">
              <Carousel />
            </section>

            {/* Otras secciones... */}
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
                (Acompañado de mates, stickers y muchos audios, claro 😉)
              </p>
            </section>

            {/* Carrusel de productos destacados */}
            <ProductCarousel addToCart={addToCart} />

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

            <section
              id="sumate"
              className="max-w-6xl mx-auto mt-12 px-4 sm:px-6 lg:px-8"
            >
              <h2 className="text-2xl sm:text-3xl font-semibold text-center">
                Sumate a mi equipo
              </h2>
              <p className="mt-4 text-gray-700 text-center max-w-3xl mx-auto">
                Quiero sumarme
                Nombre y Apellido *
                Teléfono *
                Tenes alguna meta que te motive a este nuevo camino de emprender??
                contanos un poco de vos... lo que quieras, de donde sos , que te gusta hacer, si estas trabajando actualmente...
                cuanto tiempo le podrias dedicar semanalmente? menos de 5 horas , mas de 5 horas..
                Por que te interesa emprender en essen? (ej ingreso extra, cambia de trabajo, desarrollo personal, quiero liderar mi equipo..etc)
              </p>
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

        {/* Carrito (siempre visible) */}
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

      {/* Modal del Carrito */}
      {showCart && (
        <div className="fixed inset-0 z-50 p-4 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white">
              <h3 className="font-semibold text-lg">Tu Carrito de Compras</h3>
              <button
                onClick={() => setShowCart(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h4 className="text-xl font-semibold mt-4">Tu carrito está vacío</h4>
                  <p className="text-gray-600 mt-2">Agrega algunos productos para continuar</p>
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
    </div>
  );
}
