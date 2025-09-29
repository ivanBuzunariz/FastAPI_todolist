"""
Operaciones CRUD (Create, Read, Update, Delete) para las tareas
"""

from sqlalchemy.orm import Session
from typing import List, Optional
import models
import schemas


def get_tasks(db: Session, skip: int = 0, limit: int = 100) -> List[models.Task]:
    """
    Obtener todas las tareas con paginación
    """
    return db.query(models.Task).order_by(models.Task.id.desc()).offset(skip).limit(limit).all()


def get_task(db: Session, task_id: int) -> Optional[models.Task]:
    """
    Obtener una tarea específica por ID
    """
    return db.query(models.Task).filter(models.Task.id == task_id).first()


def create_task(db: Session, task: schemas.TaskCreate) -> models.Task:
    """
    Crear una nueva tarea
    """
    db_task = models.Task(
        title=task.title,
        description=task.description,
        completed=task.completed
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


def update_task(db: Session, task_id: int, task_update: schemas.TaskUpdate) -> Optional[models.Task]:
    """
    Actualizar una tarea existente
    """
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        return None
    
    # Solo actualizar los campos que no son None
    update_data = task_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_task, key, value)
    
    db.commit()
    db.refresh(db_task)
    return db_task


def delete_task(db: Session, task_id: int) -> Optional[models.Task]:
    """
    Eliminar una tarea
    """
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        return None
    
    db.delete(db_task)
    db.commit()
    return db_task


def get_tasks_by_status(db: Session, completed: bool, skip: int = 0, limit: int = 100) -> List[models.Task]:
    """
    Obtener tareas filtradas por estado (completadas o pendientes)
    """
    return (
        db.query(models.Task)
        .filter(models.Task.completed == completed)
        .order_by(models.Task.id.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_tasks_count(db: Session) -> dict:
    """
    Obtener estadísticas de tareas
    """
    total = db.query(models.Task).count()
    completed = db.query(models.Task).filter(models.Task.completed == True).count()
    pending = total - completed
    
    return {
        "total": total,
        "completed": completed,
        "pending": pending
    }
