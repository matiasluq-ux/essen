import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function ShopProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {products.map((p) => (
        <div
          key={p.id}
          className="border rounded-lg p-4 flex flex-col items-center shadow"
        >
          <img
            src={p.imageUrl}
            alt={p.title}
            className="w-32 h-32 object-cover mb-4 rounded"
          />
          <h3 className="font-bold text-lg">{p.title}</h3>
          <p className="text-gray-600">${p.price}</p>
          <button className="bg-blue-600 text-white px-3 py-1 rounded mt-3">
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
}
