import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function ShopProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const loadedProducts = snapshot.docs.map((doc, idx) => ({
        // 👇 Aseguramos que cada producto tenga un id numérico consistente para el carrito
        id: idx + 1,
        docId: doc.id, // mantenemos el id real de Firebase por si lo necesitás
        ...doc.data(),
      }));
      setProducts(loadedProducts);

      // 🔑 Guardamos también en localStorage para que el carrito pueda leerlos
      localStorage.setItem("ew_products_v1", JSON.stringify(loadedProducts));
    };
    fetchProducts();
  }, []);

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Nuestros Productos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="border rounded-lg p-4 shadow hover:shadow-md bg-white"
          >
            <img
              src={p.imageUrl}
              alt={p.title}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="mt-2 font-medium">{p.title}</h3>
            <p className="text-amber-600 font-bold">${p.price}</p>
            <button
              className="mt-2 w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700 add-to-cart"
              data-product={p.id} // 👈 esto es lo que engancha el Cart.jsx
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
