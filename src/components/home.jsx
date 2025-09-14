import React from "react";
import Carousel from "./Carousel";
import ProductCarousel from "./ProductCarousel";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Carousel />
      <h2 className="text-2xl font-bold mt-8 mb-4">Destacados</h2>
      <ProductCarousel />
    </div>
  );
}
