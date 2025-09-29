@echo off
echo =====================================
echo  DESINSTALADOR DE DEPENDENCIAS TODO APP
echo =====================================
echo.

echo ATENCION: Este script eliminara todas las dependencias
echo instaladas para la aplicacion Todo List.
echo.
echo Esto incluye las siguientes librerias:
echo - fastapi
echo - uvicorn
echo - sqlalchemy
echo - pydantic
echo - python-dateutil
echo - python-dotenv
echo - httpx
echo - pytest
echo - black
echo - flake8
echo - mypy
echo - gunicorn
echo.

set /p confirmar="¿Estas segura de que quieres continuar? (S/N): "
if /i not "%confirmar%"=="S" (
    echo.
    echo Operacion cancelada.
    pause
    exit /b 0
)

echo.
echo Verificando si Python esta instalado...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python no esta instalado en el sistema
    echo.
    pause
    exit /b 1
)

echo Python encontrado correctamente.
echo.

echo Desinstalando dependencias...
echo Esto puede tardar unos minutos...
echo.

echo Desinstalando FastAPI y Uvicorn...
python -m pip uninstall -y fastapi uvicorn

echo Desinstalando SQLAlchemy...
python -m pip uninstall -y sqlalchemy

echo Desinstalando Pydantic...
python -m pip uninstall -y pydantic pydantic-settings

echo Desinstalando utilidades...
python -m pip uninstall -y python-dateutil python-dotenv httpx

echo Desinstalando herramientas de testing...
python -m pip uninstall -y pytest pytest-asyncio

echo Desinstalando herramientas de desarrollo...
python -m pip uninstall -y black flake8 mypy

echo Desinstalando servidor de produccion...
python -m pip uninstall -y gunicorn

echo.
echo Limpiando cache de pip...
python -m pip cache purge

echo.
echo =====================================
echo  DESINSTALACION COMPLETADA
echo =====================================
echo.
echo Todas las dependencias de Todo List App han sido eliminadas.
echo El sistema Python ha vuelto a su estado anterior.
echo.
echo Si quieres volver a usar la aplicacion, ejecuta: dependencias.bat
echo.

pause
