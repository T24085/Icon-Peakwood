@echo off
setlocal

cd /d "%~dp0"
set "PORT=4173"
set "LOCAL_URL=http://localhost:%PORT%/"
set "TAILSCALE_URL=Unavailable - Tailscale is not installed or connected"

where tailscale >nul 2>&1
if not errorlevel 1 (
    for /f "delims=" %%I in ('tailscale ip -4 2^>nul') do if not defined TAILSCALE_IP set "TAILSCALE_IP=%%I"
    if defined TAILSCALE_IP set "TAILSCALE_URL=http://%TAILSCALE_IP%:%PORT%/"
)

where npm >nul 2>&1
if errorlevel 1 (
    echo Node.js/npm was not found. Install Node.js, then run this file again.
    pause
    exit /b 1
)

if not exist "node_modules\vite\bin\vite.js" (
    echo Project dependencies are missing.
    echo Open a terminal in this folder and run: npm install
    pause
    exit /b 1
)

echo Starting the Icon Peakwood website...
netstat -ano | findstr ":%PORT%" | findstr "LISTENING" >nul
if errorlevel 1 (
    start "Icon Peakwood website server" cmd /k "cd /d ""%~dp0"" && npm run dev -- --host 0.0.0.0 --port %PORT% --strictPort"
) else (
    echo The website server is already running, so I will open the existing preview.
)

timeout /t 2 /nobreak >nul
start "" "%LOCAL_URL%"

echo.
echo Website opened at: %LOCAL_URL%
echo Phone link on the same Tailscale network: %TAILSCALE_URL%
echo.
echo Keep the server window open while you are viewing the website.
pause
