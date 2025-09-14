import React, { useEffect, useState } from "react";

export default function ProductCarousel() {
  const [products, setProducts] = useState([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("ew_products_v1") || "[]");
    // 👉 filtramos los que tengan el campo `featured: true` en Firestore
    const destacados = data.filter((p) => p.featured);
    setProducts(destacados);
  }, []);

  useEffect(() => {
    if (products.length === 0) return;
    const timer = setInterval(
      () => setIdx((i) => (i + 1) % products.length),
      4000
    );
    return () => clearInterval(timer);
  }, [products.length]);

  if (products.length === 0) return null;

  return (
    <section className="relative w-full max-w-4xl mx-auto mt-10 overflow-hidden rounded-xl shadow-lg">
      <h3 className="text-2xl md:text-3xl font-semibold text-center text-amber-700 mb-4">
        Productos Destacados
      </h3>

      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${idx * 100}%)`,
          width: `${products.length * 100}%`,
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            className="w-full flex-shrink-0 h-80 bg-white flex flex-col items-center justify-center p-4"
          >
            <img
              src={
                p.imageUrl ||
                "https://via.placeholder.com/300x200?text=Sin+imagen"
              }
              alt={p.title}
              className="h-40 object-contain mb-2"
            />
            <h4 className="font-semibold text-lg text-center line-clamp-2">
              {p.title}
            </h4>
            <p className="text-amber-600 font-bold mb-3">
              ${Number(p.price || 0).toLocaleString("es-AR")}
            </p>
            <button
              className="add-to-cart bg-amber-500 text-white py-2 px-4 rounded-lg hover:bg-amber-600 transition"
              data-product={p.id}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>

      {/* Flechas */}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <button
          onClick={() =>
            setIdx((i) => (i - 1 + products.length) % products.length)
          }
          className="bg-white/70 hover:bg-white text-xl rounded-full p-2 shadow"
        >
          ‹
        </button>
        <button
          onClick={() => setIdx((i) => (i + 1) % products.length)}
          className="bg-white/70 hover:bg-white text-xl rounded-full p-2 shadow"
        >
          ›
        </button>
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-3 w-full flex justify-center space-x-2">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`w-3 h-3 rounded-full ${
              i === idx ? "bg-amber-500" : "bg-gray-400/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

