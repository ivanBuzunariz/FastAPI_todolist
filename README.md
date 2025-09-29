# Todo List API - Setup y Instalación

## 📦 Instalación

### 1. Instalar dependencias:
```bash
pip install -r requirements.txt
```

### 2. Ejecutar la API:
```bash
uvicorn main:app --reload
```

### 3. Abrir el frontend:
- Abrir `cliente/index.html` en tu navegador
- O usar Live Server de VS Code

## 🗂️ Estructura del proyecto

```
Nueva carpeta/
├── main.py           # API principal de FastAPI
├── database.py       # Configuración de SQLAlchemy y SQLite
├── models.py         # Modelos de base de datos
├── schemas.py        # Esquemas Pydantic para validación
├── crud.py           # Operaciones CRUD
├── requirements.txt  # Dependencias de Python
├── todo.db          # Base de datos SQLite (se crea automáticamente)
├── cliente/         # Frontend HTML/CSS/JS
│   ├── index.html
│   ├── styles.css
│   └── app.js
└── README.md        # Este archivo
```

## 🚀 API Endpoints

### Endpoints principales:
- `GET /` - Información de la API
- `GET /docs` - Documentación interactiva (Swagger)
- `GET /tasks` - Obtener todas las tareas
- `POST /tasks` - Crear nueva tarea
- `GET /tasks/{id}` - Obtener tarea específica
- `PUT /tasks/{id}` - Actualizar tarea
- `DELETE /tasks/{id}` - Eliminar tarea

### Endpoints adicionales:
- `GET /tasks/status/{completed}` - Filtrar por estado
- `GET /stats` - Estadísticas de tareas

## 💾 Base de datos

- **Motor**: SQLite (archivo `todo.db`)
- **ORM**: SQLAlchemy
- **Migraciones**: Automáticas al iniciar la aplicación

## 📱 Frontend

- **Framework**: Vanilla JavaScript
- **Estilos**: CSS moderno y responsivo
- **Iconos**: Font Awesome
- **Funcionalidades**:
  - CRUD completo de tareas
  - Diseño responsivo
  - Validaciones en tiempo real
  - Notificaciones de éxito/error

## 🌐 URLs importantes

- API: http://localhost:8000
- Documentación: http://localhost:8000/docs
- Frontend: `cliente/index.html`

## 🔧 Desarrollo

### Comandos útiles:
```bash
# Iniciar en modo desarrollo
uvicorn main:app --reload

# Formatear código
black .

# Linting
flake8 .

# Tests
pytest
```

### Características técnicas:
- ✅ Persistencia real con SQLite
- ✅ IDs auto-incrementales
- ✅ Validación de datos con Pydantic
- ✅ Documentación automática
- ✅ CORS configurado
- ✅ Separación de responsabilidades
- ✅ Frontend moderno y responsivo