import React, { useState, useEffect } from "react"
import { db } from "../firebase"
import { collection, getDocs } from "firebase/firestore"
import { motion, AnimatePresence } from "framer-motion"

export default function Carousel() {
  const [images, setImages] = useState([])
  const [idx, setIdx] = useState(0)

  // Cargar imágenes de Firestore
  useEffect(() => {
    const fetchImages = async () => {
      const snapshot = await getDocs(collection(db, "carousel"))
      const imgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setImages(imgs)
    }
    fetchImages()
  }, [])

  // Rotación automática
  useEffect(() => {
    if (images.length === 0) return
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), 4000)
    return () => clearInterval(t)
  }, [images.length])

  if (images.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">No hay imágenes en el carrusel</p>
      </div>
    )
  }

  return (
    <section className="relative overflow-hidden rounded-lg shadow-md h-64">
      <AnimatePresence initial={false}>
        <motion.img
          key={idx}
          src={images[idx].url}
          alt={`banner-${idx}`}
          className="w-full h-64 object-cover absolute"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
          className="bg-white/70 rounded p-2"
        >
          ‹
        </button>
        <button
          onClick={() => setIdx((i) => (i + 1) % images.length)}
          className="bg-white/70 rounded p-2"
        >
          ›
        </button>
      </div>
    </section>
  )
}


