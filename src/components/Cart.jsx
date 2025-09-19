import React from "react";

export default function Cart({ whatsappNumber, cartItems, removeFromCart, updateQuantity }) {
  // Calcular el total
  const total = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || item.qty || 1)), 0);

  // Función para generar el mensaje de WhatsApp
  const generateWhatsAppMessage = () => {
    const message = cartItems.map(item => 
      `${item.title || item.name} - ${item.quantity || item.qty || 1} x $${item.price}`
    ).join('%0A');
    
    return `https://wa.me/${whatsappNumber}?text=Hola! Quiero realizar este pedido:%0A%0A${message}%0A%0ATotal: $${total}`;
  };

  // Función para manejar el checkout
  const checkout = () => {
    if (cartItems.length === 0) return alert("Carrito vacío");
    const lines = cartItems
      .map((i) => `- ${i.title || i.name} x${i.quantity || i.qty || 1} ($${(i.price * (i.quantity || i.qty || 1)).toLocaleString()})`)
      .join("\n");
    const total = cartItems.reduce((s, i) => s + i.price * (i.quantity || i.qty || 1), 0);
    const msg = `Hola! Quiero hacer un pedido:\n${lines}\nTotal: $${total}\nNombre:`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <footer className="container mx-auto px-4 mt-10 mb-20">
      <div className="bg-white rounded shadow p-4">
        <h4 className="font-semibold text-lg text-amber-700">Resumen del carrito</h4>
        {cartItems.length === 0 ? (
          <p className="mt-2 text-gray-600">Carrito vacío.</p>
        ) : (
          <div className="mt-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center space-x-3">
                  <img 
                    src={item.imageUrl || item.img || "https://via.placeholder.com/50x50?text=Imagen"} 
                    alt={item.title || item.name}
                    className="w-12 h-12 object-contain rounded"
                  />
                  <div>
                    <div className="font-medium">{item.title || item.name}</div>
                    <div className="text-sm text-gray-600">${Number(item.price).toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={item.quantity || item.qty || 1}
                    onChange={(e) => updateQuantity(item.id, +e.target.value)}
                    min={1}
                    className="w-16 border rounded p-1 text-center"
                  />
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-4 flex justify-between items-center">
              <div className="font-semibold text-lg">
                Total: ${total.toLocaleString()}
              </div>
              <div>
                <button 
                  onClick={checkout} 
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Finalizar por WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
