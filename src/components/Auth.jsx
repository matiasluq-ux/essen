import React, { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

export default function Auth({ user, setUser }){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, u => setUser(u))
    return ()=> unsub()
  },[])

  async function login(e){
    e.preventDefault()
    try{
      const uc = await signInWithEmailAndPassword(auth, email, password)
      setUser(uc.user)
    }catch(err){ alert('Error login: '+err.message) }
  }

  async function logout(){
    await signOut(auth)
    setUser(null)
  }

  if(user){
    return (
      <div className="p-4 flex items-center justify-between bg-gray-100">
        <div>Logueado como <strong>{user.email}</strong></div>
        <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
      </div>
    )
  }

  return (
    <form onSubmit={login} className="p-4 space-y-2">
      <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="border p-2 w-full" required />
      <input type="password" placeholder="Contraseña" value={password} onChange={e=>setPassword(e.target.value)} className="border p-2 w-full" required />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
    </form>
  )
}
