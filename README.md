# ELEGANTE - Ecommerce de Ropa

Ecommerce moderno y elegante de ropa con sistema de autenticación funcional, carrito de compras y checkout protegido.

## Características

- Sistema de autenticación con backend FastAPI
- Navegación libre sin login (ver productos y agregar al carrito)
- Checkout protegido: requiere autenticación para finalizar compras
- Catálogo de productos con filtros por categoría
- Carrito de compras funcional con gestión de cantidades
- Diseño responsive y elegante
- Simulación completa de proceso de compra

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior) - [Descargar aquí](https://nodejs.org/)
- **Python 3.8+** (para el backend FastAPI)
- **npm** o **pnpm** (viene con Node.js)

## Instalación y configuración

### 1. Descargar el proyecto

#### Opción A: Usando shadcn CLI (Recomendado)
\`\`\`bash
npx v0@latest init nombre-proyecto
cd nombre-proyecto
\`\`\`

#### Opción B: Clonar desde GitHub
\`\`\`bash
git clone [URL_DEL_REPOSITORIO]
cd elegante-ecommerce
\`\`\`

#### Opción C: Descargar ZIP
- Haz clic en el botón de los tres puntos en v0
- Selecciona "Download ZIP"
- Extrae el archivo y navega a la carpeta

### 2. Instalar dependencias del frontend

\`\`\`bash
npm install
\`\`\`

### 3. Configurar y ejecutar el backend FastAPI

El proyecto incluye un backend FastAPI para autenticación. Sigue estos pasos:

#### a) Crear la estructura del backend

Crea una carpeta `backend` en la raíz del proyecto con los siguientes archivos:

**backend/database.py**
\`\`\`python
# database.py
users_db = [
    {"username": "carlos", "password": "1234"},
    {"username": "maria", "password": "abcd"},
    {"username": "juan", "password": "qwerty"},
]

def find_user(username: str, password: str):
    for user in users_db:
        if user["username"] == username and user["password"] == password:
            return user
    return None
\`\`\`

**backend/main.py**
\`\`\`python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from database import find_user
import random
import string
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Backend Randomness Clothing")

# Configurar CORS para permitir peticiones desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    username: str
    password: str

def generate_token(length=20):
    chars = string.ascii_letters + string.digits
    return ''.join(random.choice(chars) for _ in range(length))

@app.post("/auth/login")
def login(request: LoginRequest):
    user = find_user(request.username, request.password)
    if not user:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    
    token = generate_token()
    return {"token": token, "message": "Login exitoso"}

@app.get("/")
def root():
    return {"message": "API Randomness Clothing funcionando correctamente"}
\`\`\`

#### b) Instalar dependencias de Python

\`\`\`bash
cd backend
pip install fastapi uvicorn
\`\`\`

#### c) Ejecutar el backend

\`\`\`bash
uvicorn main:app --reload --port 8000
\`\`\`

El backend estará corriendo en `http://localhost:8000`

**Nota:** Deja esta terminal abierta para que el backend siga ejecutándose.

### 4. Configurar variables de entorno (Opcional)

El proyecto ya está configurado para usar `http://localhost:8000` por defecto. Si necesitas cambiar la URL del backend:

**Opción 1: Desde v0**
- Ve a la sección "Vars" en el panel lateral
- Agrega o modifica `NEXT_PUBLIC_API_URL`

**Opción 2: Archivo .env.local**
Crea un archivo `.env.local` en la raíz:
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:8000
\`\`\`

### 5. Ejecutar el frontend

En una nueva terminal (manteniendo el backend ejecutándose):

\`\`\`bash
npm run dev
\`\`\`

La aplicación estará disponible en `http://localhost:3000`

## Uso de la aplicación

### Usuarios de prueba

Puedes iniciar sesión con cualquiera de estos usuarios:

| Usuario | Contraseña |
|---------|------------|
| carlos  | 1234       |
| maria   | abcd       |
| juan    | qwerty     |

### Flujo de trabajo

1. **Sin autenticación:** 
   - Navega libremente por la tienda
   - Ve todos los productos
   - Agrega productos al carrito
   - Modifica cantidades en el carrito

2. **Checkout (requiere login):**
   - Al hacer clic en "Finalizar compra"
   - Si no estás autenticado, serás redirigido al login
   - Inicia sesión con uno de los usuarios de prueba

3. **Después del login:**
   - Tu token se guarda automáticamente
   - Puedes finalizar compras
   - Verás un modal de confirmación exitosa
   - El carrito se limpiará automáticamente

## Estructura del proyecto

\`\`\`
.
├── app/
│   ├── layout.tsx              # Layout con AuthProvider y Toaster
│   ├── page.tsx                # Homepage con catálogo y carrito
│   ├── login/
│   │   └── page.tsx            # Página de login
│   └── globals.css             # Estilos globales y design tokens
├── components/
│   ├── header.tsx              # Header con navegación y usuario
│   ├── hero.tsx                # Sección hero de la homepage
│   ├── product-grid.tsx        # Grid de productos con filtros
│   ├── product-card.tsx        # Tarjeta individual de producto
│   ├── shopping-cart.tsx       # Carrito lateral con checkout
│   ├── checkout-success.tsx    # Modal de compra exitosa
│   ├── login-form.tsx          # Formulario de login
│   ├── footer.tsx              # Footer con enlaces
│   └── ui/                     # Componentes shadcn/ui
├── lib/
│   ├── auth-context.tsx        # Contexto global de autenticación
│   ├── types.ts                # Tipos TypeScript
│   └── utils.ts                # Funciones de utilidad
└── backend/
    ├── main.py                 # API FastAPI
    └── database.py             # Base de datos simulada de usuarios
\`\`\`

## Personalización

### Cambiar colores del tema

Edita el archivo `app/globals.css` y modifica las variables en `@theme inline`:

\`\`\`css
@theme inline {
  --background: oklch(0.99 0.005 85);
  --foreground: oklch(0.15 0.01 280);
  --accent: oklch(0.72 0.08 25);
  /* ... más colores ... */
}
\`\`\`

### Agregar más productos

Edita `components/product-grid.tsx` y modifica el array de `PRODUCTS`:

\`\`\`tsx
const PRODUCTS: Product[] = [
  {
    id: 9,
    name: 'Nuevo Producto',
    price: 35000,
    image: '/placeholder.svg?height=400&width=300',
    category: 'Mujer' // o 'Hombre', 'Accesorios'
  },
  // ... más productos
]
\`\`\`

### Modificar usuarios del backend

Edita `backend/database.py` y agrega o modifica usuarios en el array `users_db`:

\`\`\`python
users_db = [
    {"username": "nuevo_usuario", "password": "nueva_pass"},
    # ... más usuarios
]
\`\`\`

## Scripts disponibles

\`\`\`bash
npm run dev      # Desarrollo en localhost:3000
npm run build    # Compilar para producción
npm run start    # Ejecutar en modo producción
npm run lint     # Verificar código
\`\`\`

## Despliegue

### Frontend (Vercel)

1. **Desde v0:**
   - Haz clic en el botón "Publish" en la parte superior
   - Conecta tu cuenta de GitHub si es necesario
   - El proyecto se desplegará automáticamente

2. **Manualmente desde Vercel:**
   - Sube el proyecto a GitHub
   - Ve a [vercel.com](https://vercel.com)
   - Click en "Import Project"
   - Selecciona tu repositorio
   - Configura `NEXT_PUBLIC_API_URL` con la URL de tu backend en producción
   - Click en "Deploy"

### Backend (Railway, Render, Heroku)

El backend FastAPI debe desplegarse por separado:

**Ejemplo con Railway:**
1. Ve a [railway.app](https://railway.app)
2. Click en "New Project" → "Deploy from GitHub"
3. Selecciona tu repositorio (carpeta backend)
4. Configura el comando de inicio: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Obtén la URL pública y actualiza `NEXT_PUBLIC_API_URL` en Vercel

## Compartir con otro compañero

### Instrucciones para el desarrollador que recibe el proyecto:

1. **Clonar el repositorio:**
   \`\`\`bash
   git clone [URL_DEL_REPOSITORIO]
   cd [NOMBRE_DEL_PROYECTO]
   \`\`\`

2. **Instalar dependencias del frontend:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configurar el backend:**
   \`\`\`bash
   cd backend
   pip install fastapi uvicorn
   uvicorn main:app --reload --port 8000
   \`\`\`

4. **En otra terminal, ejecutar el frontend:**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Abrir en el navegador:**
   `http://localhost:3000`

¡Listo! El proyecto estará funcionando con autenticación completa.

## Troubleshooting

### Error: "No se pudo conectar con el servidor"

**Solución:**
- Verifica que el backend FastAPI esté ejecutándose en el puerto 8000
- Revisa que `NEXT_PUBLIC_API_URL` apunte a `http://localhost:8000`
- Asegúrate de que CORS esté configurado en el backend

### Error: "Credenciales incorrectas"

**Solución:**
- Verifica que estés usando uno de los usuarios de prueba
- Revisa el archivo `backend/database.py` para confirmar usuarios disponibles

### El carrito se vacía al recargar

**Es normal:** El carrito usa estado local de React. Para persistirlo, considera usar `localStorage`.

### Error: "Module not found"

**Solución:**
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

## Tecnologías utilizadas

- **Next.js 16** - Framework React con App Router
- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Tailwind CSS v4** - Framework de estilos
- **shadcn/ui** - Componentes de UI accesibles
- **FastAPI** - Framework backend Python
- **Uvicorn** - Servidor ASGI para FastAPI

## Soporte

Si tienes problemas o preguntas, abre un ticket en [vercel.com/help](https://vercel.com/help)

## Licencia

MIT
