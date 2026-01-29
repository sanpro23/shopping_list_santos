# 🛒 Shopping List - Lista de Compras

Proyecto de lista de compras con múltiples implementaciones: vanilla JavaScript, React, y Full Stack (React + Node.js + MongoDB).

## 📁 Estructura del Proyecto

```
shopping-list/
├── vanilla/              # Versión HTML/CSS/JS puro
│   ├── index.html
│   ├── ShoppingList.js
│   └── styles.css
├── react/                # Versión React
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── ShoppingList.jsx
│   │   └── ShoppingList.css
│   └── package.json
└── fullstack/            # Versión Full Stack
    ├── backend/
    │   ├── server.js
    │   ├── package.json
    │   └── .env
    └── frontend/         # (usar la versión React)
```

## 🚀 Opción 1: Vanilla JavaScript

### Uso
1. Abre `index.html` directamente en tu navegador
2. No requiere instalación ni servidor

### Características
- ✅ Sin dependencias
- ✅ Funciona offline
- ✅ Ideal para aprender fundamentos

## ⚛️ Opción 2: React (RECOMENDADO)

### Instalación

```bash
# Crear proyecto React
npx create-react-app shopping-list-react
cd shopping-list-react

# Copiar los archivos:
# - ShoppingList.jsx → src/
# - ShoppingList.css → src/
# - App.js → src/ (reemplazar)
# - App.css → src/ (reemplazar)

# Iniciar
npm start
```

### Características
- ✅ Hooks (useState, useEffect)
- ✅ LocalStorage para persistencia
- ✅ Animaciones CSS
- ✅ Estadísticas en tiempo real
- ✅ Responsive design

## 🌐 Opción 3: Full Stack (MongoDB + API REST)

### Backend Setup

```bash
# 1. Instalar MongoDB
# Opción A: MongoDB local
# - Descarga desde https://www.mongodb.com/try/download/community
# - Instala y ejecuta: mongod

# Opción B: MongoDB Atlas (nube, gratis)
# - Regístrate en https://www.mongodb.com/cloud/atlas
# - Crea un cluster gratuito
# - Obtén tu connection string

# 2. Configurar backend
cd backend
npm install

# 3. Crear archivo .env (copia de .env.example)
cp .env.example .env
# Edita .env con tu MONGODB_URI

# 4. Iniciar servidor
npm run dev
# Servidor corriendo en http://localhost:5000
```

### Frontend Setup (React con API)

Modifica el componente React para usar la API:

```javascript
// En ShoppingList.jsx, reemplaza localStorage por llamadas API

// Ejemplo de fetch para obtener items:
useEffect(() => {
  fetch('http://localhost:5000/api/items')
    .then(res => res.json())
    .then(data => setItems(data.data))
    .catch(err => console.error('Error:', err));
}, []);

// Ejemplo de fetch para agregar item:
const handleAddItem = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch('http://localhost:5000/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        item: itemName, 
        cantidad: quantity 
      })
    });
    
    const data = await response.json();
    if (data.success) {
      setItems([...items, data.data]);
      setItemName('');
      setQuantity(1);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## 🧪 Testing con Postman

### Endpoints disponibles:

```
GET    /api/items              - Obtener todos los items
GET    /api/items/:id          - Obtener un item por ID
POST   /api/items              - Crear nuevo item
PUT    /api/items/:id          - Actualizar item
PATCH  /api/items/:id/toggle   - Cambiar estado comprado
DELETE /api/items/:id          - Eliminar item
DELETE /api/items/completed/all - Eliminar todos los comprados
```

### Ejemplos de requests:

**POST /api/items**
```json
{
  "item": "Leche",
  "cantidad": 2
}
```

**PUT /api/items/:id**
```json
{
  "item": "Leche desnatada",
  "cantidad": 3,
  "comprado": true
}
```

## 📝 Funcionalidades

### Todas las versiones incluyen:
- ✅ Agregar items con cantidad
- ✅ Eliminar items
- ✅ Marcar como comprado
- ✅ Actualizar cantidad
- ✅ Validaciones
- ✅ UI moderna y responsive

### Versión React añade:
- ✅ Persistencia con localStorage
- ✅ Estadísticas (total, comprados, pendientes)
- ✅ Eliminar items comprados
- ✅ Limpiar toda la lista
- ✅ Animaciones

### Versión Full Stack añade:
- ✅ Base de datos real (MongoDB)
- ✅ API REST
- ✅ Sincronización multi-dispositivo
- ✅ Validaciones en backend
- ✅ Timestamps

## 🎯 Próximos pasos sugeridos

1. **Autenticación**: Agregar login con JWT
2. **Listas múltiples**: Permitir crear varias listas
3. **Compartir**: Compartir listas con otros usuarios
4. **Categorías**: Organizar items por categorías
5. **PWA**: Convertir en Progressive Web App
6. **Dark Mode**: Agregar tema oscuro
7. **Drag & Drop**: Reordenar items
8. **Testing**: Agregar tests con Jest

## 📚 Recursos de aprendizaje

- **React**: https://react.dev/
- **MongoDB**: https://www.mongodb.com/docs/
- **Express**: https://expressjs.com/
- **Mongoose**: https://mongoosejs.com/

## 🤝 Contribuir

¡Este proyecto es ideal para tu portfolio! Siéntete libre de:
- Agregar nuevas funcionalidades
- Mejorar el diseño
- Optimizar el código
- Agregar tests

---

**¿Preguntas?** Abre un issue o contáctame.

¡Feliz coding! 🚀
