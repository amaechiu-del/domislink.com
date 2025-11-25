<#
Domislink Developer Environment Auto-Installer
Checks and installs: Winget, Git, Python 3.12, Pip
Author: Amaechi Ubadike
#>

Write-Host "🔎 Checking developer environment..." -ForegroundColor Cyan

# --- Ensure Administrator privileges ---
if (-not ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "⚠️  Restarting PowerShell as Administrator..." -ForegroundColor Yellow
    Start-Process "powershell" "-ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    exit
}

# --- Check & install Winget (App Installer) ---
function Install-Winget {
    $wingetPath = "$env:LOCALAPPDATA\Microsoft\WindowsApps\winget.exe"
    if (-not (Test-Path $wingetPath)) {
        Write-Host "⬇️  Installing Winget (App Installer)..." -ForegroundColor Yellow
        Start-Process "ms-windows-store://pdp/?productid=9NBLGGH4NNS1"
        Write-Host "⚠️  Please install *App Installer* from Microsoft Store manually, then re-run this script." -ForegroundColor Yellow
        pause
        exit
    } else { Write-Host "✅ Winget available." -ForegroundColor Green }
}

Install-Winget

# --- Check Git ---
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "⬇️  Installing Git..." -ForegroundColor Yellow
    winget install --id Git.Git -e --source winget
} else {
    Write-Host "✅ Git detected: $(git --version)" -ForegroundColor Green
}

# --- Check Python ---
if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Host "⬇️  Installing Python 3.12..." -ForegroundColor Yellow
    winget install --id Python.Python.3.12 -e --source winget
} else {
    Write-Host "✅ Python detected: $(python --version)" -ForegroundColor Green
}

# --- Verify pip ---
try {
    $pipver = pip --version
    Write-Host "✅ Pip detected: $pipver" -ForegroundColor Green
} catch {
    Write-Host "⬇️  Installing Pip..." -ForegroundColor Yellow
    python -m ensurepip --upgrade
}

Write-Host "`n🎯 Environment check complete!" -ForegroundColor Cyan
Write-Host "Git, Python 3.12, Pip, and Winget ready for Domislink automation." -ForegroundColor Green
