@echo off
echo =====================================
echo      INICIANDO TODO LIST APP
echo =====================================
echo.

echo Verificando si Python esta instalado...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python no esta instalado.
    echo Ejecuta primero: dependencias.bat
    echo.
    pause
    exit /b 1
)

echo Iniciando la aplicacion...
echo.
echo La aplicacion estara disponible en:
echo http://localhost:8000
echo.
echo Para detener la aplicacion, presiona Ctrl+C
echo.

python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

echo.
echo La aplicacion se ha cerrado.
pause
