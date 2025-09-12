import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Carousel() {
  const [images, setImages] = useState([]);
  const [idx, setIdx] = useState(0);

  // Cargar imágenes desde Firestore
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const snapshot = await getDocs(collection(db, "carousel"));
        const imgs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setImages(imgs);
      } catch (err) {
        console.error("Error cargando imágenes:", err);
      }
    };
    fetchImages();
  }, []);

  // Rotación automática
  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(
      () => setIdx((i) => (i + 1) % images.length),
      4000
    );
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">No hay imágenes en el carrusel</p>
      </div>
    );
  }

  return (
    <section className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-lg shadow-lg">
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${idx * 100}%)`, width: `${images.length * 100}%` }}
      >
        {images.map((img, i) => (
          <img
            key={img.id}
            src={img.url}
            alt={`slide-${i}`}
            className="w-full h-64 object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Botones de navegación */}
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
          className="bg-white/70 hover:bg-white text-xl rounded-full p-2 shadow"
        >
          ‹
        </button>
        <button
          onClick={() => setIdx((i) => (i + 1) % images.length)}
          className="bg-white/70 hover:bg-white text-xl rounded-full p-2 shadow"
        >
          ›
        </button>
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-3 w-full flex justify-center space-x-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`w-3 h-3 rounded-full ${
              i === idx ? "bg-white" : "bg-gray-400/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
