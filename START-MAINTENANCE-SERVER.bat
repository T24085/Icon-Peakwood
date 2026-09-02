@echo off
setlocal EnableExtensions
cd /d "%~dp0"

set "PORT=4173"
set "PUBLIC_HOST=iconpeakwood.novatec.casa"
set "TUNNEL_CONFIG=%USERPROFILE%\.cloudflared\iconpeakwood.yml"
set "CLOUDFLARED=C:\Program Files (x86)\cloudflared\cloudflared.exe"

echo ========================================
echo Icon @ Peakwood - Maintenance Server
echo ========================================
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo ERROR: Node.js is required to run the website server.
  echo Install Node.js, then run this file again.
  pause
  exit /b 1
)

if not exist "node_modules\vite\bin\vite.js" (
  echo Installing website dependencies...
  call npm install
  if errorlevel 1 (
    echo ERROR: Dependencies could not be installed.
    pause
    exit /b 1
  )
)

if not exist "dist\client\index.html" (
  echo Creating the production website build...
  call npm run build
  if errorlevel 1 (
    echo ERROR: The website build failed.
    pause
    exit /b 1
  )
)

powershell.exe -NoProfile -Command "$listener = Get-NetTCPConnection -LocalPort %PORT% -State Listen -ErrorAction SilentlyContinue; if ($listener) { exit 0 } else { exit 1 }"
if errorlevel 1 (
  echo Starting the local website server on port %PORT%...
  start "Icon Peakwood Maintenance Server" /min cmd /c "npm run preview -- --host 0.0.0.0 --port %PORT%"
  timeout /t 2 /nobreak >nul
) else (
  echo The website server is already running on port %PORT%.
)

start "" "http://localhost:%PORT%/maintenance-portal"

if exist "%TUNNEL_CONFIG%" (
  if exist "%CLOUDFLARED%" (
    powershell.exe -NoProfile -Command "$tunnel = Get-CimInstance Win32_Process -ErrorAction SilentlyContinue | Where-Object { $_.Name -eq 'cloudflared.exe' -and $_.CommandLine -like '*iconpeakwood.yml*' }; if ($tunnel) { exit 0 } else { exit 1 }"
    if errorlevel 1 (
      echo Starting Cloudflare preview tunnel...
      start "Icon Peakwood Cloudflare Tunnel" /min cmd /c ""%CLOUDFLARED%" --config "%TUNNEL_CONFIG%" tunnel run iconpeakwood"
    ) else (
      echo The Icon Peakwood Cloudflare tunnel is already running.
    )
    echo Public preview: https://%PUBLIC_HOST%/
    echo Maintenance portal: https://%PUBLIC_HOST%/maintenance-portal
  ) else (
    echo Cloudflared was not found at:
    echo %CLOUDFLARED%
  )
) else (
  echo Local website started. Cloudflare tunnel config was not found:
  echo %TUNNEL_CONFIG%
)

echo.
echo Keep this window open while the maintenance site is in use.
pause
