"""
Esquemas Pydantic para validación y serialización de datos
"""

from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class TaskBase(BaseModel):
    """
    Esquema base para las tareas
    """
    title: str = Field(..., min_length=1, max_length=255, description="Título de la tarea")
    description: Optional[str] = Field(None, max_length=500, description="Descripción opcional")
    completed: bool = Field(False, description="Estado de completado")


class TaskCreate(TaskBase):
    """
    Esquema para crear una nueva tarea
    """
    pass


class TaskUpdate(BaseModel):
    """
    Esquema para actualizar una tarea existente
    Todos los campos son opcionales
    """
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=500)
    completed: Optional[bool] = None


class Task(TaskBase):
    """
    Esquema completo de la tarea (para respuestas)
    """
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True  # Para compatibilidad con SQLAlchemy


class TaskResponse(BaseModel):
    """
    Esquema para respuestas de operaciones
    """
    message: str
    task: Optional[Task] = None
