@echo off
title Pixel Pro - Clean Uninstaller
echo ======================================================================
echo   Uninstalling Pixel Pro from Adobe Premiere Pro...
echo ======================================================================

set "EXT_DIR=%APPDATA%\Adobe\CEP\extensions\PixelPro"
if exist "%EXT_DIR%" (
    rmdir /S /Q "%EXT_DIR%"
    echo [OK] Removed extension folder: %EXT_DIR%
) else (
    echo [*] Extension folder already clean.
)

echo [SUCCESS] Pixel Pro extension removed successfully.
pause
