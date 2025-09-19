import { useState } from "react"

export default function FormularioEmprender() {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    motivacion: "",
    sobreVos: "",
    tiempo: "",
    interes: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Formulario enviado:", form)
    alert("¡Gracias por tu interés en emprender con Essen! Pronto nos pondremos en contacto contigo.")
    setForm({
      nombre: "",
      telefono: "",
      motivacion: "",
      sobreVos: "",
      tiempo: "",
      interes: "",
    })
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-amber-700 mb-4">
        Sumate a nuestro equipo ✨
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre y Apellido */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Nombre y Apellido *
          </label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Teléfono *
          </label>
          <input
            type="tel"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* Motivación */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            ¿Tenés alguna meta que te motive a este nuevo camino de emprender? *
          </label>
          <textarea
            name="motivacion"
            value={form.motivacion}
            onChange={handleChange}
            required
            rows={3}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-amber-400"
          ></textarea>
        </div>

        {/* Sobre vos */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Contanos un poco de vos (de dónde sos, qué te gusta hacer, si estás trabajando actualmente...) *
          </label>
          <textarea
            name="sobreVos"
            value={form.sobreVos}
            onChange={handleChange}
            required
            rows={3}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-amber-400"
          ></textarea>
        </div>

        {/* Tiempo disponible */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            ¿Cuánto tiempo le podrías dedicar semanalmente? *
          </label>
          <select
            name="tiempo"
            value={form.tiempo}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-amber-400"
          >
            <option value="">Seleccionar...</option>
            <option value="menos5">Menos de 5 horas</option>
            <option value="mas5">Más de 5 horas</option>
          </select>
        </div>

        {/* Interés en emprender */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            ¿Por qué te interesa emprender en Essen? *
          </label>
          <textarea
            name="interes"
            value={form.interes}
            onChange={handleChange}
            required
            rows={2}
            placeholder="Ej: ingreso extra, cambiar de trabajo, desarrollo personal, liderar mi equipo..."
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-amber-400"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition"
        >
          Enviar
        </button>
      </form>
    </div>
  )
}
