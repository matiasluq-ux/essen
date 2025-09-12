// src/components/Admin.jsx
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

export default function Admin() {
  const [product, setProduct] = useState({ name: "", price: "", image: "" });
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // 🔹 Traer productos en tiempo real
  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  // 🔹 Guardar producto nuevo o editar existente
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.name || !product.price) return;

    try {
      if (editingId) {
        // Editar producto
        const ref = doc(db, "products", editingId);
        await updateDoc(ref, {
          ...product,
          price: parseFloat(product.price),
        });
        setEditingId(null);
      } else {
        // Agregar producto nuevo
        await addDoc(collection(db, "products"), {
          ...product,
          price: parseFloat(product.price),
          createdAt: new Date(),
        });
      }
      setProduct({ name: "", price: "", image: "" });
    } catch (err) {
      console.error("Error al guardar:", err);
      alert("Error al guardar el producto");
    }
  };

  // 🔹 Cargar datos de un producto para edición
  const handleEdit = (p) => {
    setProduct({ name: p.name, price: p.price, image: p.image });
    setEditingId(p.id);
  };

  // 🔹 Eliminar producto
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este producto?")) return;
    try {
      await deleteDoc(doc(db, "products", id));
    } catch (err) {
      console.error("Error al eliminar:", err);
      alert("Error al eliminar producto");
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          className="border p-2 w-full"
          placeholder="Nombre"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          placeholder="Precio"
          value={product.price}
          type="number"
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          placeholder="URL de imagen"
          value={product.image}
          onChange={(e) => setProduct({ ...product, image: e.target.value })}
        />
        <button className="bg-amber-600 text-white px-4 py-2 rounded w-full">
          {editingId ? "Actualizar Producto" : "Agregar Producto"}
        </button>
      </form>

      {/* Lista de productos */}
      <div>
        <h3 className="font-semibold mb-2">Productos cargados</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="border p-4 rounded shadow bg-white flex flex-col"
            >
              {p.image && (
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-32 object-cover mb-2"
                />
              )}
              <h4 className="font-semibold">{p.name}</h4>
              <p className="text-amber-600">${p.price}</p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
