# TaskIA 🚀

TaskIA es una aplicación web full stack para la gestión de tareas, construida con tecnologías modernas como React, TypeScript, Node.js, Express, PostgreSQL y Prisma.

## Tecnologías utilizadas

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- SweetAlert2
- dnd-kit

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT
- bcryptjs

## Funcionalidades

- Registro de usuarios
- Inicio de sesión con JWT
- Protección de rutas
- CRUD de tareas
- Tareas privadas por usuario
- Estados tipo Kanban:
  - Pendiente
  - En progreso
  - Completada
- Prioridades:
  - Alta
  - Media
  - Baja
- Drag & Drop para mover tareas entre columnas
- Dashboard de estadísticas
- Búsqueda de tareas
- Filtros por estado
- Modal de detalle
- Validaciones visuales
- Notificaciones con SweetAlert2

## Estructura del proyecto

```txt
taskia/
├── backend/
│   ├── prisma/
│   └── src/
│       ├── controllers/
│       ├── middlewares/
│       ├── routes/
│       ├── services/
│       ├── index.ts
│       └── prisma.ts
│
└── frontend/
    └── src/
        ├── components/
        ├── pages/
        ├── services/
        ├── types/
        └── App.tsx