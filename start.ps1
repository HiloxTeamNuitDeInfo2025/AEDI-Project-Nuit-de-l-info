# HackMatrixHILOX - Startup Script
# Démarre automatiquement le backend et le frontend

Write-Host ""
Write-Host "????????????????????????????????????????" -ForegroundColor Red
Write-Host "    ?? HackMatrixHILOX - Red Team Edition ??    " -ForegroundColor Red
Write-Host "????????????????????????????????????????" -ForegroundColor Red
Write-Host ""
Write-Host "?? Vérification des dépendances..." -ForegroundColor Yellow
Write-Host ""

# Vérifier Node.js
try {
    $nodeVersion = node --version
    Write-Host "? Node.js: $nodeVersion" -ForegroundColor Green
}
catch {
    Write-Host "? Node.js non trouvé! Installez Node.js 18+" -ForegroundColor Red
    exit 1
}

# Installer les dépendances backend si nécessaire
if (-Not (Test-Path "node_modules")) {
    Write-Host "?? Installation des dépendances backend..." -ForegroundColor Yellow
    npm install
}

# Installer les dépendances frontend si nécessaire
if (-Not (Test-Path "frontend/node_modules")) {
    Write-Host "?? Installation des dépendances frontend..." -ForegroundColor Yellow
    Set-Location frontend
    npm install
    Set-Location ..
}

Write-Host ""
Write-Host "????????????????????????????????????????" -ForegroundColor Red
Write-Host "?? Démarrage des serveurs..." -ForegroundColor Green
Write-Host "????????????????????????????????????????" -ForegroundColor Red
Write-Host ""
Write-Host "?? Backend:  http://localhost:3000" -ForegroundColor Cyan
Write-Host "?? Frontend: http://localhost:3001" -ForegroundColor Cyan
Write-Host ""
Write-Host "?? Appuyez sur Ctrl+C pour arrêter les serveurs" -ForegroundColor Yellow
Write-Host ""

# Démarrer le backend en arrière-plan
$backendJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    npm start
}

# Attendre 3 secondes pour que le backend démarre
Start-Sleep -Seconds 3

# Démarrer le frontend en arrière-plan
$frontendJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD\frontend
    npm run dev
}

Write-Host "? Backend démarré (Job ID: $($backendJob.Id))" -ForegroundColor Green
Write-Host "? Frontend démarré (Job ID: $($frontendJob.Id))" -ForegroundColor Green
Write-Host ""
Write-Host "????????????????????????????????????????" -ForegroundColor Red
Write-Host ""

# Afficher les logs en temps réel
try {
    while ($true) {
        $backendOutput = Receive-Job -Job $backendJob -Keep
        $frontendOutput = Receive-Job -Job $frontendJob -Keep
        
        if ($backendOutput) {
            Write-Host "[BACKEND] " -ForegroundColor Magenta -NoNewline
            Write-Host $backendOutput[-1]
        }
        
        if ($frontendOutput) {
            Write-Host "[FRONTEND] " -ForegroundColor Cyan -NoNewline
            Write-Host $frontendOutput[-1]
        }
        
        Start-Sleep -Milliseconds 500
    }
}
finally {
    # Cleanup on exit
    Write-Host ""
    Write-Host "?? Arrêt des serveurs..." -ForegroundColor Yellow
    Stop-Job -Job $backendJob, $frontendJob
    Remove-Job -Job $backendJob, $frontendJob
    Write-Host "? Serveurs arrêtés" -ForegroundColor Green
}
