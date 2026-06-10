# TaskIA 🚀

TaskIA es una aplicación web Full Stack para la gestión de tareas, construida con tecnologías modernas como React, TypeScript, Node.js, Express, PostgreSQL, Prisma y Docker.

El objetivo del proyecto es practicar una arquitectura moderna de desarrollo web, integrando autenticación JWT, persistencia en base de datos, interfaz tipo Kanban y despliegue local con Docker.

---

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

### DevOps

- Docker
- Docker Compose
- Git
- GitHub

---

## Funcionalidades principales

- Registro de usuarios
- Inicio de sesión con JWT
- Protección de rutas privadas
- CRUD completo de tareas
- Tareas privadas por usuario
- Vista tipo Kanban
- Drag & Drop entre columnas
- Estados de tarea:
  - Pendiente
  - En progreso
  - Completada
- Prioridades:
  - Alta
  - Media
  - Baja
- Dashboard de estadísticas
- Buscador de tareas
- Filtros por estado
- Modal de detalle
- Validaciones visuales
- Notificaciones con SweetAlert2
- API REST protegida por token
- Dockerización del proyecto

---

## Arquitectura del proyecto

```txt
taskia/
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   │
│   └── src/
│       ├── controllers/
│       ├── middlewares/
│       ├── routes/
│       ├── services/
│       ├── index.ts
│       └── prisma.ts
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── types/
│       ├── App.tsx
│       └── main.tsx
│
├── docker-compose.yml
└── README.md

## Demo en producción

Frontend: https://taskia-l8nwx6euc-andres-barrera-s-projects.vercel.app/

Backend: https://taskia-api.onrender.com