"""
FastAPI Todo List Application
API para gestión de tareas con base de datos SQLite
"""

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from typing import List
import os

import models
import schemas
import crud
from database import engine, get_db

# Crear las tablas en la base de datos
models.Base.metadata.create_all(bind=engine)

# Crear la aplicación FastAPI
app = FastAPI(
    title="Todo List API",
    description="API RESTful para gestión de tareas con SQLAlchemy y SQLite",
    version="2.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especifica los dominios permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)       

# Montar archivos estáticos
static_dir = os.path.join(os.path.dirname(__file__), "static")
app.mount("/static", StaticFiles(directory=static_dir), name="static")

@app.get("/")
async def read_index():
    """Servir la página principal del cliente"""
    return FileResponse(os.path.join(static_dir, "index.html"))

@app.get("/api")
async def api_root():
    return {"message": "Todo List API", "docs": "/docs"}


@app.get("/tasks", response_model=List[schemas.Task])
def get_tasks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Obtener todas las tareas
    """
    tasks = crud.get_tasks(db, skip=skip, limit=limit)
    return tasks


@app.get("/tasks/{task_id}", response_model=schemas.Task)
def get_task(task_id: int, db: Session = Depends(get_db)):
    """
    Obtener una tarea específica por ID
    """
    db_task = crud.get_task(db, task_id=task_id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task


@app.post("/tasks", response_model=schemas.Task)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    """
    Crear una nueva tarea
    """
    return crud.create_task(db=db, task=task)


@app.put("/tasks/{task_id}", response_model=schemas.Task)
def update_task(task_id: int, task: schemas.TaskUpdate, db: Session = Depends(get_db)):
    """
    Actualizar una tarea existente
    """
    db_task = crud.update_task(db, task_id=task_id, task_update=task)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task


@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    """
    Eliminar una tarea
    """
    db_task = crud.delete_task(db, task_id=task_id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully"}


@app.get("/tasks/status/{completed}", response_model=List[schemas.Task])
def get_tasks_by_status(completed: bool, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Obtener tareas por estado (completadas o pendientes)
    """
    tasks = crud.get_tasks_by_status(db, completed=completed, skip=skip, limit=limit)
    return tasks


@app.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    """
    Obtener estadísticas de las tareas
    """
    return crud.get_tasks_count(db)
