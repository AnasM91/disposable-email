@echo off
echo Killing any existing Node.js processes...
taskkill /F /IM node.exe 2>nul

echo Starting development servers...
npm run dev

echo.
echo Development servers should be running at:
echo Frontend: http://localhost:3000
echo API: http://localhost:8888/.netlify/functions/api
