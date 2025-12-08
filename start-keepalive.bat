@echo off
echo ========================================
echo   Homepage Keepalive Service
echo ========================================
echo.
echo Starting keepalive script...
echo.

REM Check if node is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if node-cron is installed
if not exist "node_modules\node-cron" (
    echo Installing required dependency: node-cron...
    npm install node-cron
    echo.
)

REM Set homepage URL (default to localhost:3000)
set HOMEPAGE_URL=http://localhost:3000

REM Start the keepalive script
node keepalive.js

pause
