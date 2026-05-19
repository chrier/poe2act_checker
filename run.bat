@echo off
setlocal

cd /d "%~dp0"

where npm >nul 2>nul
if errorlevel 1 (
  echo npm command was not found.
  echo Please install Node.js for Windows first: https://nodejs.org/
  pause
  exit /b 1
)

if not exist "node_modules\.bin\vite.cmd" (
  echo Installing Windows dependencies...
  echo This is needed when the project was first installed from WSL/Linux.
  call npm install
  if errorlevel 1 (
    echo.
    echo npm install failed.
    pause
    exit /b 1
  )
)

echo Starting poe2act_checker...
echo Browser URL will be shown below.
call npx vite --host 0.0.0.0

pause
