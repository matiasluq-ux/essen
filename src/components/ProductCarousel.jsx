import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function ProductCarousel() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const productsData = snapshot.docs.map((doc) => {
          const data = doc.data() || {};
          return {
            id: doc.id,
            title: data.title || data.name || "",
            price: Number(data.price || 0),
            imageUrl: data.imageUrl || data.image || "",
            featured: data.featured || false // Campo para productos destacados
          };
        });
        
        // Filtrar productos destacados o tomar los primeros 6 si no hay destacados
        const featuredProducts = productsData.filter(p => p.featured);
        const productsToShow = featuredProducts.length > 0 
          ? featuredProducts 
          : productsData.slice(0, 6);
          
        setProducts(productsToShow);
        setLoading(false);
      } catch (err) {
        console.error("Error cargando productos:", err);
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === products.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    
    return () => clearInterval(timer);
  }, [products.length]);

  const nextProduct = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevProduct = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8 text-amber-700">
          Productos Destacados
        </h2>
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null; // No mostrar nada si no hay productos
  }

  return (
    <section className="max-w-6xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8 text-amber-700">
        Productos Destacados
      </h2>
      
      <div className="relative overflow-hidden rounded-xl bg-gray-50 p-6">
        <div className="flex transition-transform duration-500 ease-in-out"
             style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {products.map((product, index) => (
            <div key={product.id} className="w-full flex-shrink-0 px-4">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-56 overflow-hidden flex items-center justify-center">
                  <img
                    src={product.imageUrl || "https://via.placeholder.com/300x300?text=Imagen+no+disponible"}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain p-4"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x300?text=Imagen+no+disponible";
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 h-14">
                    {product.title}
                  </h3>
                  <p className="text-amber-600 font-bold text-xl mb-3">
                    ${product.price.toLocaleString('es-AR')}
                  </p>
                  <button
                    className="add-to-cart bg-amber-500 text-white py-2 px-4 rounded-lg hover:bg-amber-600 transition-colors duration-200 w-full"
                    data-product={product.id}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {products.length > 1 && (
          <>
            <button
              onClick={prevProduct}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 text-xl rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all duration-200 z-10"
            >
              ‹
            </button>
            <button
              onClick={nextProduct}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 text-xl rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all duration-200 z-10"
            >
              ›
            </button>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-amber-500 scale-110" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
