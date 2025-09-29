"""
Configuración de la base de datos SQLAlchemy
"""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# URL de la base de datos SQLite
SQLALCHEMY_DATABASE_URL = "sqlite:///./todo.db"

# Crear el engine de SQLAlchemy
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False}  # Solo necesario para SQLite
)

# Crear SessionLocal para las sesiones de base de datos
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base declarativa para los modelos
Base = declarative_base()

# Dependency para obtener la sesión de base de datos
def get_db():
    """
    Dependency que proporciona una sesión de base de datos
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
