# Script de renommage XSSHILOX -> HackMatrixHILOX

Write-Host "🔄 Renommage de XSSHILOX en HackMatrixHILOX..." -ForegroundColor Yellow

$files = @(
    "README.md",
    "PROJET_FINALISE.md",
    "config.js",
    "server.js",
    "start.ps1",
    "package.json",
    "database\db.js",
    "database\schema.sql",
    "docs\INDEX.md",
    "docs\ARCHITECTURE.md",
    "docs\API.md",
    "docs\QUICKSTART.md",
    "docs\AEDI_DEFI_FAILLE.md",
    "docs\DEFI_AEDI_RESUME.md",
    "frontend\app\layout.tsx",
    "frontend\app\page.tsx",
    "frontend\app\game\page.tsx",
    "frontend\package.json"
)

$count = 0
foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw -Encoding UTF8
        $newContent = $content -replace 'XSSHILOX', 'HackMatrixHILOX'
        $newContent = $newContent -replace 'xsshilox', 'hackmatrixhilox'
        
        if ($content -ne $newContent) {
            Set-Content $file -Value $newContent -Encoding UTF8 -NoNewline
            Write-Host "✅ $file" -ForegroundColor Green
            $count++
        }
    }
}

Write-Host ""
Write-Host "✅ Renommage terminé! $count fichiers modifiés" -ForegroundColor Green
