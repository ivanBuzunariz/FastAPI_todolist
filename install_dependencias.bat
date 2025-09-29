@echo off
echo =====================================
echo  INSTALADOR DE DEPENDENCIAS TODO APP
echo =====================================
echo.

echo Verificando si Python esta instalado...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python no esta instalado en el sistema
    echo Por favor, instala Python desde: https://www.python.org/downloads/
    echo.
    pause
    exit /b 1
)

echo Python encontrado correctamente.
python --version
echo.

echo Actualizando pip...
python -m pip install --upgrade pip
echo.

echo Instalando dependencias del proyecto...
echo Esto puede tardar unos minutos...
echo.

python -m pip install -r requirements.txt

if %errorlevel% equ 0 (
    echo.
    echo =====================================
    echo  INSTALACION COMPLETADA CON EXITO
    echo =====================================
    echo.
    echo Todas las dependencias se han instalado correctamente.
    echo Ya puedes ejecutar la aplicacion con: start.bat
    echo.
) else (
    echo.
    echo =====================================
    echo  ERROR EN LA INSTALACION
    echo =====================================
    echo.
    echo Hubo un problema instalando las dependencias.
    echo Verifica tu conexion a internet e intentalo de nuevo.
    echo.
)

pause
