import React, { useEffect, useState } from 'react'

const CART_KEY = 'ew_cart_v1'

export default function Cart(){
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem(CART_KEY)) || [])
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER // 👉 ahora toma el número del .env

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    function handler(e){
      if(!e.target.classList.contains('add-to-cart')) return
      const id = +e.target.dataset.product
      const products = JSON.parse(localStorage.getItem('ew_products_v1') || '[]')
      const p = products.find(x=> x.id === id)
      if(!p) return
      setCart(c => {
        const ex = c.find(x => x.id === p.id)
        if(ex) return c.map(x => x.id === p.id ? {...x, qty: x.qty+1} : x)
        return [...c, {...p, qty:1}]
      })
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  function changeQty(id, q){ 
    setCart(c => c.map(x => x.id === id ? {...x, qty: Math.max(1,q)} : x)) 
  }

  function removeItem(id){ 
    setCart(c => c.filter(x => x.id !== id)) 
  }

  function checkout(){
    if(cart.length === 0) return alert('Carrito vacío')
    const lines = cart.map(i => `- ${i.title} x${i.qty} ($${(i.price*i.qty).toLocaleString()})`).join('\n')
    const total = cart.reduce((s,i) => s + i.price*i.qty, 0)
    const msg = `Hola! Quiero hacer un pedido:\n${lines}\nTotal: $${total}\nNombre:`
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
  }

  return (
    <footer className="max-w-6xl mx-auto px-4 mt-10 mb-20">
      <div className="bg-white rounded shadow p-4">
        <h4 className="font-semibold">Resumen del carrito</h4>
        {cart.length === 0 ? (
          <p className="mt-2">Carrito vacío.</p>
        ) : (
          <div className="mt-2">
            {cart.map(i => (
              <div key={i.id} className="flex items-center justify-between py-2">
                <div>
                  <div className="font-medium">{i.title}</div>
                  <div className="text-sm text-gray-600">${i.price.toLocaleString()}</div>
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={i.qty} 
                    onChange={(e) => changeQty(i.id, +e.target.value)} 
                    min={1} 
                    className="w-16 border rounded p-1" 
                  />
                  <button 
                    onClick={() => removeItem(i.id)} 
                    className="text-sm text-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-3 flex justify-between items-center">
              <div className="font-semibold">
                Total: ${cart.reduce((s,i) => s + i.price*i.qty,0).toLocaleString()}
              </div>
              <div>
                <button 
                  onClick={checkout} 
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Finalizar por WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  )
}
