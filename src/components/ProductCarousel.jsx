import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function ProductCarousel() {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [productsPerSlide, setProductsPerSlide] = useState(4); // Por defecto 4 productos

  useEffect(() => {
    // Determinar cuántos productos mostrar por slide según el tamaño de pantalla
    const updateProductsPerSlide = () => {
      if (window.innerWidth >= 1400) {
        setProductsPerSlide(4);
      } else if (window.innerWidth >= 1024) {
        setProductsPerSlide(3);
      } else if (window.innerWidth >= 768) {
        setProductsPerSlide(2);
      } else {
        setProductsPerSlide(1);
      }
    };

    updateProductsPerSlide();
    window.addEventListener('resize', updateProductsPerSlide);

    return () => window.removeEventListener('resize', updateProductsPerSlide);
  }, []);

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
            featured: data.featured || false
          };
        });
        
        // Filtrar productos destacados o tomar los primeros 8 si no hay destacados
        const featuredProducts = productsData.filter(p => p.featured);
        const productsToShow = featuredProducts.length > 0 
          ? featuredProducts 
          : productsData.slice(0, 8);
          
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
    if (products.length <= productsPerSlide) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === Math.ceil(products.length / productsPerSlide) - 1 ? 0 : prevSlide + 1
      );
    }, 5000);
    
    return () => clearInterval(timer);
  }, [products.length, productsPerSlide]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => 
      prevSlide === Math.ceil(products.length / productsPerSlide) - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => 
      prevSlide === 0 ? Math.ceil(products.length / productsPerSlide) - 1 : prevSlide - 1
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
    return null;
  }

  // Calcular el número total de slides
  const totalSlides = Math.ceil(products.length / productsPerSlide);
  
  // Obtener los productos para el slide actual
  const startIndex = currentSlide * productsPerSlide;
  const endIndex = startIndex + productsPerSlide;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <section className="max-w-6xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8 text-amber-700">
        Productos Destacados
      </h2>
      
      <div className="product-carousel-container">
        <div 
          className="product-carousel-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => {
            const slideProducts = products.slice(
              slideIndex * productsPerSlide,
              slideIndex * productsPerSlide + productsPerSlide
            );
            
            return (
              <div key={slideIndex} className="product-carousel-slide">
                {slideProducts.map((product) => (
                  <div key={product.id} className="product-carousel-item">
                    <div className="product-carousel-image-container">
                      <img
                        src={product.imageUrl || "https://via.placeholder.com/300x300?text=Imagen+no+disponible"}
                        alt={product.title}
                        className="product-carousel-image"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/300x300?text=Imagen+no+disponible";
                        }}
                      />
                    </div>
                    <div className="product-carousel-content">
                      <h3 className="product-carousel-title">
                        {product.title}
                      </h3>
                      <p className="product-carousel-price">
                        ${product.price.toLocaleString('es-AR')}
                      </p>
                      <button
                        className="product-carousel-button add-to-cart"
                        data-product={product.id}
                      >
                        Agregar al carrito
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        
        {products.length > productsPerSlide && (
          <>
            <button
              onClick={prevSlide}
              className="product-carousel-nav prev"
            >
              ‹
            </button>
            <button
              onClick={nextSlide}
              className="product-carousel-nav next"
            >
              ›
            </button>
            
            <div className="product-carousel-indicators">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`product-carousel-indicator ${
                    index === currentSlide ? "active" : ""
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
