@echo off
echo Killing any existing Node.js processes...
taskkill /F /IM node.exe 2>nul

echo Starting Netlify development server...
netlify dev
