# Essen Web Starter - React + Vite + Tailwind + Firebase

## Qué hay en este paquete
- Landing simple con carrusel, sección misión, catálogo.
- Carrito que finaliza pedido por WhatsApp a 5491159122734.
- Admin protegido con Firebase Auth (email/password).
- Productos guardados en Firestore.

## Pasos rápidos para correr local
1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Crear un archivo .env copiando .env.example y pegar tus claves de Firebase (Project settings).
3. Levantar en modo desarrollo:
   ```bash
   npm run dev
   ```

## Firebase - configuración breve
1. Crear proyecto en Firebase Console.
2. Activar Authentication -> Sign-in method -> Email/Password.
3. Crear un usuario manual: Authentication -> Users -> Add user (tu email y contraseña).
4. Activar Firestore Database en modo production (o test para empezar).
5. Copiar las keys a .env

## Deploy a Render (Static Site)
1. Subir repo a GitHub.
2. En Render crear nuevo Static Site -> conectar repo.
3. Build command: `npm run build`.
4. Publish directory: `dist`.
5. Agregar variables de entorno en la sección ENV (las mismas que en .env)

## Notas
- El Admin crea/borra productos directamente en Firestore.
- El carrusel en esta versión básica usa localStorage; puedo extenderlo para guardarlo en Firestore también.
