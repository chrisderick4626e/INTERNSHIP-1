@echo off
title EMCO SALES - Color Recommendation System
echo.
echo  ====================================
echo   EMCO SALES - Starting Dev Server
echo  ====================================
echo.
cd /d "c:\Users\derick\Desktop\INTERNSHIP-1\emco-sales\frontend"
start "" http://localhost:5173
npx vite --open
