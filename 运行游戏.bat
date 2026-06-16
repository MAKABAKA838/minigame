@echo off
echo 正在启动游戏服务器，请勿关闭此窗口...
echo 游戏将在您的默认浏览器中自动打开！

:: 检查是否安装了 Python (大部分电脑自带)
python -c "import sys; exit(0)" >nul 2>&1
if %errorlevel% equ 0 (
    start http://localhost:8000
    python -m http.server 8000
    exit
)

:: 如果没有 Python，检查是否有 Node.js
node -v >nul 2>&1
if %errorlevel% equ 0 (
    start http://localhost:8080
    npx http-server -p 8080
    exit
)

echo [错误] 您的电脑需要安装 Python 或 Node.js 才能在本地脱机运行 Web 游戏。
pause
