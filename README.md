# Todo List App - Aplicación Web Completa

Una aplicación web completa para gestión de tareas con FastAPI y frontend integrado.

## � Instalación Rápida (Windows)

### Para usuarios finales:
1. **Instalar dependencias** (solo la primera vez):
   ```
   Doble clic en: dependencias.bat
   ```

2. **Ejecutar la aplicación**:
   ```
   Doble clic en: start.bat
   ```

3. **Abrir en el navegador**:
   ```
   http://localhost:8000
   ```

### Para desarrolladores:
```bash
# Instalar dependencias
pip install -r requirements.txt

# Ejecutar la aplicación
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## 🗂️ Estructura del proyecto

```
FastAPI_todolist/
├── main.py                      # API principal de FastAPI
├── database.py                  # Configuración de SQLAlchemy y SQLite
├── models.py                    # Modelos de base de datos
├── schemas.py                   # Esquemas Pydantic para validación
├── crud.py                      # Operaciones CRUD
├── requirements.txt             # Dependencias de Python
├── todo.db                      # Base de datos SQLite (se crea automáticamente)
├── static/                      # Frontend integrado (archivos estáticos)
│   ├── index.html              # Interfaz principal
│   ├── styles.css              # Estilos CSS responsivos
│   └── app.js                  # Lógica del cliente
├── dependencias.bat             # Script instalación Windows
├── del_dependencias.bat         # Script desinstalación Windows
├── start.bat                    # Script inicio Windows
├── README_INSTRUCCIONES.txt     # Guía usuario final
└── README.md                    # Documentación técnica
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

## 📱 Frontend Integrado

- **Servido por**: FastAPI StaticFiles
- **Framework**: Vanilla JavaScript
- **Estilos**: CSS moderno y responsivo
- **Iconos**: Font Awesome
- **Funcionalidades**:
  - CRUD completo de tareas
  - Diseño responsivo
  - Validaciones en tiempo real
  - Notificaciones de éxito/error
  - Integración completa con la API

## 🌐 URLs importantes

- **Aplicación completa**: http://localhost:8000
- **API endpoints**: http://localhost:8000/tasks
- **Documentación Swagger**: http://localhost:8000/docs
- **Archivos estáticos**: http://localhost:8000/static/
- **Info API**: http://localhost:8000/api

## �️ Scripts de Gestión

### Windows (.bat):
- **`dependencias.bat`**: Instala todas las dependencias automáticamente
- **`start.bat`**: Ejecuta la aplicación completa
- **`del_dependencias.bat`**: Desinstala todas las dependencias

### Manual:
```bash
# Instalar dependencias
pip install -r requirements.txt

# Iniciar aplicación
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Herramientas de desarrollo
black .          # Formatear código
flake8 .         # Linting
pytest           # Tests
```

## 🔧 Características Técnicas

### Backend:
- ✅ **FastAPI** - Framework web moderno y rápido
- ✅ **SQLAlchemy** - ORM para base de datos
- ✅ **SQLite** - Base de datos integrada
- ✅ **Pydantic** - Validación de datos
- ✅ **CORS** - Configurado para desarrollo

### Frontend:
- ✅ **StaticFiles** - Servido por FastAPI
- ✅ **Vanilla JS** - Sin dependencias externas
- ✅ **CSS Responsivo** - Funciona en móviles
- ✅ **Font Awesome** - Iconos modernos

### Integración:
- ✅ **Una sola aplicación** - Frontend + Backend unidos
- ✅ **Una sola URL** - Todo en localhost:8000
- ✅ **Instalación simple** - Scripts automáticos
- ✅ **Documentación automática** - Swagger integrado

## 📄 Documentación

- **Usuario final**: Lee `README_INSTRUCCIONES.txt`
- **Desarrollador**: Este archivo (`README.md`)
- **API interactiva**: http://localhost:8000/docs

## 🚀 Producción

Para uso en producción, considera:
- Usar un servidor web como **Nginx**
- Base de datos más robusta como **PostgreSQL**
- Variables de entorno para configuración
- SSL/HTTPS para seguridad