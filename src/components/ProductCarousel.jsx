import React, { useEffect, useState } from "react";

export default function ProductCarousel() {
  const [products, setProducts] = useState([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("ew_products_v1") || "[]");
    // 👉 filtramos solo los destacados (si en Firestore tenés un campo `featured: true`)
    const destacados = data.filter((p) => p.featured);
    setProducts(destacados);
  }, []);

  // Rotación automática cada 4s
  useEffect(() => {
    if (products.length === 0) return;
    const timer = setInterval(
      () => setIdx((i) => (i + 1) % products.length),
      4000
    );
    return () => clearInterval(timer);
  }, [products.length]);

  if (products.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">No hay productos destacados</p>
      </div>
    );
  }

  return (
    <section className="relative w-full overflow-hidden rounded-lg shadow-lg">
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
            className="w-full flex-shrink-0 h-64 flex flex-col items-center justify-center bg-white"
          >
            <img
              src={
                p.img ||
                p.image ||
                "https://via.placeholder.com/300x200?text=Sin+imagen"
              }
              alt={p.title}
              className="h-40 object-contain mb-2"
            />
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-amber-600 font-bold mb-2">
              ${Number(p.price || 0).toLocaleString()}
            </p>
            <button
              className="add-to-cart bg-amber-500 text-white py-1 px-3 rounded-lg hover:bg-amber-600 transition"
              data-product={p.id}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>

      {/* Botones */}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <button
          onClick={() => setIdx((i) => (i - 1 + products.length) % products.length)}
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

