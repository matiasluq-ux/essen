import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Carousel() {
  const [images, setImages] = useState([]);
  const [idx, setIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const snapshot = await getDocs(collection(db, "carousel"));
        const imgs = snapshot.docs.map((doc) => {
          const data = doc.data() || {};
          return {
            id: doc.id,
            title: data.title || "",
            src:
              data.imageUrl ||
              data.url ||
              data.Url ||
              data.image ||
              data.img ||
              "",
            ...data,
          };
        });
        setImages(imgs.filter((x) => x.src));
        setLoading(false);
      } catch (err) {
        console.error("Error cargando imágenes:", err);
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(
      () => setIdx((i) => (i + 1) % images.length),
      4000
    );
    return () => clearInterval(timer);
  }, [images.length]);

  if (loading) {
    return (
      <div className="w-full h-64 sm:h-80 md:h-96 flex flex-col items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-500">Cargando imágenes...</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="w-full h-64 sm:h-80 md:h-96 flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">No hay imágenes en el carrusel</p>
      </div>
    );
  }

  return (
    <div className="w-full relative overflow-hidden bg-black">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${idx * 100}%)`,
        }}
      >
        {images.map((img, i) => (
          <div
            key={img.id}
            className="w-full flex-shrink-0 relative flex items-center justify-center"
            style={{ height: "50vh", minHeight: "300px" }}
          >
     
{/* Imagen principal sin bordes ni sombras */}
<img
  src={img.src}
  alt={img.title || `Imagen ${i + 1}`}
  className="w-full h-full object-cover"
  onError={(e) => {
    e.target.style.display = "none";
    e.target.nextSibling.style.display = "flex";
  }}
/>
            
            {/* Fallback en caso de error */}
            <div className="hidden absolute inset-0 items-center justify-center bg-white">
              <div className="text-center p-4">
                <p className="text-gray-700 font-medium">Imagen no disponible</p>
                <p className="text-sm text-gray-500 mt-1">{img.title}</p>
              </div>
            </div>

            {/* Título opcional */}
            {img.title && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-lg z-20 max-w-md text-center">
                <h3 className="text-lg font-semibold">{img.title}</h3>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Botones de navegación */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 text-xl rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 z-20"
          >
            ‹
          </button>
          <button
            onClick={() => setIdx((i) => (i + 1) % images.length)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 text-xl rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 z-20"
          >
            ›
          </button>
        </>
      )}

      {/* Indicadores */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === idx ? "bg-white scale-110" : "bg-gray-400/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

