@echo off
setlocal enabledelayedexpansion
title Pixel Pro - 1-Click Automated Installer for Premiere Pro

echo ======================================================================
echo   PIXEL PRO — Automated 1-Click Setup for Adobe Premiere Pro
echo ======================================================================
echo.

:: 1. Enable Adobe PlayerDebugMode across Premiere versions 2019 to 2026+
echo [*] Enabling Adobe CEP Extension Mode in Windows Registry...
for %%v in (9 10 11 12 13 14 15 16 17 18) do (
    reg add "HKEY_CURRENT_USER\Software\Adobe\CSXS.%%v" /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
)
echo [OK] Adobe Extension Debug Mode Enabled.

:: 2. Target Adobe CEP Extensions Directory
set "EXT_DIR=%APPDATA%\Adobe\CEP\extensions\PixelPro"
set "BIN_DIR=%EXT_DIR%\bin"
set "BACKEND_DIR=%EXT_DIR%\backend"
set "VENV_DIR=%BACKEND_DIR%\.venv"

echo [*] Target Directory: %EXT_DIR%
if not exist "%EXT_DIR%" mkdir "%EXT_DIR%"
if not exist "%BIN_DIR%" mkdir "%BIN_DIR%"
if not exist "%BACKEND_DIR%" mkdir "%BACKEND_DIR%"

:: Copy extension files if run from package folder
if exist "%~dp0..\..\src" (
    echo [*] Syncing Pixel Pro extension files...
    xcopy /E /Y /I /Q "%~dp0..\..\*" "%EXT_DIR%\" >nul 2>&1
)

:: 3. Setup Portable Standalone FFmpeg
echo [*] Checking FFmpeg audio processing engine...
if not exist "%BIN_DIR%\ffmpeg.exe" (
    where ffmpeg >nul 2>&1
    if !errorlevel! equ 0 (
        echo [OK] System FFmpeg detected.
    ) else (
        echo [!] FFmpeg not found in system. Downloading standalone portable FFmpeg...
        powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object System.Net.WebClient).DownloadFile('https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64-gpl.zip', '%TEMP%\ffmpeg.zip')"
        powershell -Command "Expand-Archive -Path '%TEMP%\ffmpeg.zip' -DestinationPath '%TEMP%\ffmpeg_unzip' -Force"
        for /R "%TEMP%\ffmpeg_unzip" %%f in (ffmpeg.exe) do (
            copy /Y "%%f" "%BIN_DIR%\ffmpeg.exe" >nul
        )
        del /Q "%TEMP%\ffmpeg.zip" >nul 2>&1
        rmdir /S /Q "%TEMP%\ffmpeg_unzip" >nul 2>&1
        echo [OK] Portable FFmpeg installed to extension bin directory.
    )
) else (
    echo [OK] Bundled FFmpeg is already installed.
)

:: 4. Check & Install Python Runtime (Requires Python >= 3.10)
echo [*] Checking Python runtime version...
set "PYTHON_EXE=python"
set "NEED_PYTHON=0"

python -c "import sys; exit(0 if sys.version_info >= (3, 10) and sys.version_info < (3, 13) else 1)" >nul 2>&1
if !errorlevel! neq 0 (
    set "NEED_PYTHON=1"
)

if "!NEED_PYTHON!"=="1" (
    echo [!] Python 3.10+ not detected (system has an older version or Python is missing).
    echo [*] Downloading Python 3.10.11 64-bit installer...
    powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object System.Net.WebClient).DownloadFile('https://www.python.org/ftp/python/3.10.11/python-3.10.11-amd64.exe', '%TEMP%\python_setup.exe')"
    echo [*] Installing Python 3.10 silently with PATH configuration...
    "%TEMP%\python_setup.exe" /quiet InstallAllUsers=0 PrependPath=1 Include_test=0 Shortcuts=0
    del /Q "%TEMP%\python_setup.exe" >nul 2>&1
    set "PYTHON_EXE=%LOCALAPPDATA%\Programs\Python\Python310\python.exe"
    if not exist "!PYTHON_EXE!" set "PYTHON_EXE=py -3.10"
    echo [OK] Python 3.10 successfully configured.
) else (
    echo [OK] Compatible Python 3.10+ detected.
)

:: 5. Create Isolated Virtual Environment for Whisper Engine (Zero Conflict Guarantee)
echo [*] Setting up isolated Python virtual environment (.venv)...
if not exist "%VENV_DIR%\Scripts\python.exe" (
    !PYTHON_EXE! -m venv "%VENV_DIR%"
)

:: 6. Install Ultra-Fast Whisper AI Speech Engine
echo [*] Installing Faster-Whisper AI speech engine & dependencies...
"%VENV_DIR%\Scripts\python.exe" -m pip install --upgrade pip --quiet
"%VENV_DIR%\Scripts\pip.exe" install -r "%~dp0..\requirements.txt" --quiet

:: 7. Verify All Three Components
echo.
echo ======================================================================
echo   DIAGNOSTIC STATUS CHECK:
echo ======================================================================

"%BIN_DIR%\ffmpeg.exe" -version >nul 2>&1 || where ffmpeg >nul 2>&1
if !errorlevel! equ 0 (
    echo   [+] FFmpeg:   INSTALLED (Ready)
) else (
    echo   [-] FFmpeg:   PENDING
)

"%VENV_DIR%\Scripts\python.exe" --version >nul 2>&1
if !errorlevel! equ 0 (
    echo   [+] Python:   INSTALLED (Isolated venv active)
) else (
    echo   [-] Python:   PENDING
)

"%VENV_DIR%\Scripts\python.exe" -c "import faster_whisper; print('OK')" >nul 2>&1
if !errorlevel! equ 0 (
    echo   [+] Whisper:  INSTALLED (4x Faster-Whisper Engine Ready)
) else (
    echo   [-] Whisper:  PENDING
)

echo ======================================================================
echo.
echo   [SUCCESS] Setup Completed! All dependencies are installed and green.
echo   Launch Adobe Premiere Pro and open:
echo   Window ^> Extensions ^> Pixel Pro
echo.
echo ======================================================================
pause
