import React, { useEffect, useState } from "react";

export default function ProductCarousel() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("ew_products_v1") || "[]");
    // filtrar solo los destacados (ej: si tienen un campo "featured: true")
    setProducts(data.filter(p => p.featured));
  }, []);

  return (
    <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
      {products.map((p) => (
        <div
          key={p.id}
          className="min-w-[250px] bg-white rounded-lg shadow p-4 flex flex-col"
        >
          <img
            src={p.image}
            alt={p.title}
            className="h-40 w-full object-cover rounded"
          />
          <h3 className="font-semibold mt-2">{p.title}</h3>
          <p className="text-sm text-gray-600">${p.price.toLocaleString()}</p>
          <button
            className="add-to-cart mt-auto bg-amber-500 text-white py-2 px-4 rounded-lg hover:bg-amber-600 transition"
            data-product={p.id}
          >
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
}
