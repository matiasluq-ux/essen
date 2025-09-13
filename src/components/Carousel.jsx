import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Carousel() {
  const [images, setImages] = useState([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const snapshot = await getDocs(collection(db, "carousel"));
        const imgs = snapshot.docs.map((doc) => {
          const data = doc.data() || {};
          return {
            id: doc.id,
            title: data.title || "",
            // soporte para varios nombres de campo: imageUrl, url, Url, image, img
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
        setImages(imgs.filter((x) => x.src)); // sólo keep los que tengan src
      } catch (err) {
        console.error("Error cargando imágenes:", err);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => setIdx((i) => (i + 1) % images.length), 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className="container w-full h-48 sm:h-64 md:h-80 flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">No hay imágenes en el carrusel</p>
      </div>
    );
  }

  return (
    <section className="container relative w-full overflow-hidden rounded-lg shadow-lg">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${idx * 100}%)`,
          width: `${images.length * 100}%`,
        }}
      >
        {images.map((img, i) => (
          <div key={img.id} className="w-full flex-shrink-0 h-48 sm:h-64 md:h-80 lg:h-[500px] flex items-center justify-center bg-gray-100">
            {/* object-contain para evitar recortes; si preferís llenar siempre usa object-cover */}
            <img src={img.src} alt={img.title || `slide-${i}`} className="w-full h-[500px] object-cover rounded-lg" />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-between px-4">
        <button onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)} className="bg-white/70 hover:bg-white text-xl rounded-full p-2 shadow">‹</button>
        <button onClick={() => setIdx((i) => (i + 1) % images.length)} className="bg-white/70 hover:bg-white text-xl rounded-full p-2 shadow">›</button>
      </div>

      <div className="absolute bottom-3 w-full flex justify-center space-x-2">
        {images.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`w-3 h-3 rounded-full ${i === idx ? "bg-white" : "bg-gray-400/70"}`} />
        ))}
      </div>
    </section>
  );
}


