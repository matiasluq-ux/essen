import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function ShopProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snapshot) => {
      const docs = snapshot.docs.map((d) => {
        const data = d.data() || {};
        return {
          id: d.id,
          title: data.title || data.name || data.nombre || "",
          price: Number(data.price ?? data.precio ?? 0),
          imageUrl:
            data.imageUrl ||
            data.image ||
            data.img ||
            data.Url ||
            data.url ||
            "",
          ...data,
        };
      });

      setProducts(docs);
      setLoading(false);
      // importante: guardar copia en localStorage para que el Cart pueda leer
      localStorage.setItem("ew_products_v1", JSON.stringify(docs));
    });

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 mt-8 text-center text-gray-600">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
        <p className="mt-4">Cargando productos...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 mt-8 text-center text-gray-600">
        No hay productos disponibles.
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 mt-10">
      <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-amber-700 text-center">
        Nuestros Productos
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
          >
            <div className="relative pt-[70%] overflow-hidden">
              <img
                src={p.imageUrl || "https://via.placeholder.com/400x300?text=Sin+imagen"}
                alt={p.title || p.name}
                className="absolute top-0 left-0 w-full h-full object-contain p-4"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x300?text=Imagen+no+disponible";
                }}
              />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h4 className="font-semibold text-base md:text-lg mb-2 line-clamp-2 h-12 overflow-hidden">
                {p.title || p.name}
              </h4>
              <p className="text-amber-600 font-bold text-lg md:text-xl mb-3 mt-auto">
                ${Number(p.price || 0).toLocaleString('es-AR')}
              </p>
              <button
                className="add-to-cart bg-amber-500 text-white py-2 px-4 rounded-lg hover:bg-amber-600 transition-colors duration-200 w-full text-sm md:text-base"
                data-product={p.id}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

