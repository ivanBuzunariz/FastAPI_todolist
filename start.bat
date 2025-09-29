@echo off
:: FastAPI Todo List - Script de Inicialización para CMD (Símbolo del Sistema)
:: Este script instala las dependencias, inicia el servidor y abre el frontend

title FastAPI Todo List - Inicializando...

:: Configurar codificación para caracteres especiales
chcp 65001 > nul

:: Banner de inicio
echo.
echo 🚀 FastAPI Todo List - Inicializando...
echo ======================================
echo.

:: Función para imprimir mensajes de estado
set "ESC="

:: Verificar si Python está instalado
echo [INFO] Verificando instalación de Python...
python --version > nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python no está instalado o no está en el PATH.
    echo Por favor instálalo desde https://python.org
    echo.
    pause
    exit /b 1
)

:: Mostrar versión de Python
for /f "tokens=*" %%i in ('python --version 2^>^&1') do set "python_version=%%i"
echo [ÉXITO] Python encontrado: %python_version%

:: Verificar si pip está instalado
echo [INFO] Verificando instalación de pip...
pip --version > nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] pip no está instalado.
    echo Por favor reinstala Python con pip incluido.
    echo.
    pause
    exit /b 1
)

:: Crear entorno virtual si no existe
if not exist "venv" (
    echo [INFO] Creando entorno virtual...
    python -m venv venv
    if %errorlevel% neq 0 (
        echo [ERROR] Error al crear el entorno virtual
        echo.
        pause
        exit /b 1
    )
    echo [ÉXITO] Entorno virtual creado
)

:: Activar entorno virtual
echo [INFO] Activando entorno virtual...
if exist "venv\Scripts\activate.bat" (
    call venv\Scripts\activate.bat
    echo [ÉXITO] Entorno virtual activado
) else (
    echo [ERROR] No se pudo encontrar el script de activación del entorno virtual
    echo.
    pause
    exit /b 1
)

:: Actualizar pip
echo [INFO] Actualizando pip...
python -m pip install --upgrade pip --quiet
if %errorlevel% neq 0 (
    echo [ADVERTENCIA] No se pudo actualizar pip, continuando...
)

:: Instalar dependencias
echo [INFO] Instalando dependencias de Python...
pip install -r requirements.txt --quiet
if %errorlevel% neq 0 (
    echo [ERROR] Error al instalar las dependencias
    echo.
    pause
    exit /b 1
)
echo [ÉXITO] Dependencias instaladas correctamente

:: Verificar instalación de uvicorn
echo [INFO] Verificando instalación de uvicorn...
uvicorn --help > nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] uvicorn no se instaló correctamente
    echo.
    pause
    exit /b 1
)

echo [ÉXITO] ✅ Instalación completada
echo.

:: Mostrar información del servidor
echo [INFO] 🌐 Iniciando servidor FastAPI...
echo [INFO] 📍 API disponible en: http://localhost:8000
echo [INFO] 📚 Documentación en: http://localhost:8000/docs
echo.

:: Crear script temporal para abrir el navegador después de un delay
echo @echo off > temp_open_browser.bat
echo timeout /t 3 /nobreak ^> nul >> temp_open_browser.bat
echo echo [INFO] 🌐 Abriendo frontend en el navegador... >> temp_open_browser.bat
echo start "" "file://%cd%\cliente\index.html" >> temp_open_browser.bat
echo del "%%~f0" >> temp_open_browser.bat

:: Iniciar el script de navegador en segundo plano
start /min temp_open_browser.bat

:: Mostrar información de estado
echo [ÉXITO] 🎉 Servidor iniciado correctamente
echo [INFO] ✨ ¡Todo listo! La aplicación está funcionando.
echo.
echo [INFO] 📋 Información útil:
echo    • Frontend: file://%cd%\cliente\index.html
echo    • API: http://localhost:8000
echo    • Docs: http://localhost:8000/docs
echo    • Para detener: Presiona Ctrl+C
echo.
echo [INFO] 📊 Iniciando servidor... Presiona Ctrl+C para detener.
echo.

:: Configurar manejo de Ctrl+C
setlocal EnableDelayedExpansion

:: Iniciar el servidor FastAPI
echo Iniciando servidor uvicorn...
uvicorn main:app --reload --host 0.0.0.0 --port 8000

:: Si llegamos aquí, el servidor se detuvo
echo.
echo [INFO] 🛑 Servidor detenido
echo [INFO] ¡Hasta luego! 👋
echo.
pause