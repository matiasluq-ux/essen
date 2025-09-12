import React, { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function ProductForm({ onProductAdded }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price || !image) {
      alert("Todos los campos son obligatorios");
      return;
    }

    setLoading(true);
    try {
      // Subir imagen
      const storageRef = ref(storage, `products/${Date.now()}-${image.name}`);
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);

      // Guardar producto en Firestore
      await addDoc(collection(db, "products"), {
        title,
        price: Number(price),
        imageUrl,
      });

      setTitle("");
      setPrice("");
      setImage(null);
      onProductAdded();
    } catch (err) {
      console.error(err);
      alert("Error al agregar producto");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded mb-6">
      <h2 className="font-bold mb-2">Agregar producto</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="mb-2"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
