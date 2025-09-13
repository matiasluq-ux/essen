import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function ShopProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snapshot) => {
      setProducts(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  if (products.length === 0) {
    return (
      <div className="container mt-8 text-center text-gray-600">
        No hay productos disponibles.
      </div>
    );
  }

  return (
    <section className="container mt-10">
      <h3 className="text-xl font-semibold mb-6 text-amber-700">
        Nuestros Productos
      </h3>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition transform duration-200"
          >
            <img
              src={
                p.img ||
                p.image ||
                "https://via.placeholder.com/400x300?text=Sin+imagen"
              }
              alt={p.title ?? p.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col">
              <h4 className="font-semibold text-lg mb-1">
                {p.title ?? p.name}
              </h4>
              <p className="text-amber-600 font-bold mb-3">
                ${Number(p.price || 0).toLocaleString()}
              </p>
              <button className="mt-auto bg-amber-500 text-white py-2 px-4 rounded-lg hover:bg-amber-600 transition">
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

