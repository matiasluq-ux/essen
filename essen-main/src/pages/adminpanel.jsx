import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function AdminPanel({ user, onLogout }) {
  // --- Productos ---
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    setProducts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const addProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    if (editingId) {
      const productRef = doc(db, "products", editingId);
      await updateDoc(productRef, newProduct);
      setEditingId(null);
    } else {
      await addDoc(collection(db, "products"), newProduct);
    }

    setNewProduct({ name: "", price: "", image: "", description: "" });
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  const editProduct = (product) => {
    setNewProduct(product);
    setEditingId(product.id);
  };

  // --- Carrusel ---
  const [carouselImages, setCarouselImages] = useState([]);
  const [newImage, setNewImage] = useState("");

  const fetchCarousel = async () => {
    const snapshot = await getDocs(collection(db, "carousel"));
    setCarouselImages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const addImage = async (e) => {
    e.preventDefault();
    if (!newImage) return;
    await addDoc(collection(db, "carousel"), { url: newImage });
    setNewImage("");
    fetchCarousel();
  };

  const deleteImage = async (id) => {
    await deleteDoc(doc(db, "carousel", id));
    fetchCarousel();
  };

  const handleLogout = async () => {
    await signOut(auth);
    onLogout();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Panel de Administración</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Cerrar sesión
        </button>
      </div>

      <p className="mb-4">Bienvenido, {user.email}</p>

      {/* --- Sección Productos --- */}
      <h2 className="text-xl font-bold mb-4">Productos</h2>
      <form onSubmit={addProduct} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Nombre del producto"
          className="border p-2 w-full"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Precio"
          className="border p-2 w-full"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="URL de imagen"
          className="border p-2 w-full"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
        />
        <textarea
          placeholder="Descripción"
          className="border p-2 w-full"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        ></textarea>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {editingId ? "Actualizar Producto" : "Agregar Producto"}
        </button>
      </form>

      <button
        onClick={fetchProducts}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Refrescar Productos
      </button>

      <ul className="space-y-4 mb-8">
        {products.map((product) => (
          <li
            key={product.id}
            className="border p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">{product.name}</h2>
              <p>${product.price}</p>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover mt-2"
                />
              )}
              <p>{product.description}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => editProduct(product)}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* --- Sección Carrusel --- */}
      <hr className="my-6" />
      <h2 className="text-xl font-bold mb-4">Carrusel</h2>

      <form onSubmit={addImage} className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="URL de la imagen"
          className="border p-2 flex-grow"
          value={newImage}
          onChange={(e) => setNewImage(e.target.value)}
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Agregar
        </button>
      </form>

      <button
        onClick={fetchCarousel}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Refrescar Imágenes
      </button>

      <ul className="space-y-2">
        {carouselImages.map((img) => (
          <li key={img.id} className="flex items-center justify-between border p-2">
            <img src={img.url} alt="carousel" className="w-32 h-20 object-cover" />
            <button
              onClick={() => deleteImage(img.id)}
              className="bg-red-600 text-white px-2 py-1 rounded"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

