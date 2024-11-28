@echo off
start cmd /k "set PORT=3001 && npm start"
timeout /t 5
start cmd /k "netlify dev --port 8888"
