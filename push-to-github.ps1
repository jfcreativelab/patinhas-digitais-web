# Script para fazer push do codigo para o GitHub
Write-Host "Iniciando push para GitHub..." -ForegroundColor Cyan
Write-Host ""

# Verificar status
Write-Host "Verificando status do repositorio..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "Verificando commits locais..." -ForegroundColor Yellow
git log --oneline -3

Write-Host ""
Write-Host "Verificando remote..." -ForegroundColor Yellow
git remote -v

Write-Host ""
Write-Host "Tentando fazer pull primeiro para mesclar mudancas..." -ForegroundColor Yellow
Write-Host ""

# Tentar pull com merge
git pull origin main --allow-unrelated-histories
$pullExitCode = $LASTEXITCODE

if ($pullExitCode -eq 0) {
    Write-Host ""
    Write-Host "Pull realizado com sucesso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Fazendo push para o GitHub..." -ForegroundColor Yellow
    git push origin main
    $pushExitCode = $LASTEXITCODE
    
    if ($pushExitCode -eq 0) {
        Write-Host ""
        Write-Host "Push realizado com sucesso!" -ForegroundColor Green
        Write-Host "Acesse: https://github.com/jfcreativelab/patinhas-digitais-web" -ForegroundColor Cyan
    } else {
        Write-Host ""
        Write-Host "Erro no push. Tentando push forcado..." -ForegroundColor Yellow
        git push -f origin main
    }
} else {
    Write-Host ""
    Write-Host "Pull falhou. Tentando push forcado..." -ForegroundColor Yellow
    Write-Host ""
    git push -f origin main
    $forcePushExitCode = $LASTEXITCODE
    
    if ($forcePushExitCode -eq 0) {
        Write-Host ""
        Write-Host "Push forcado realizado com sucesso!" -ForegroundColor Green
        Write-Host "Acesse: https://github.com/jfcreativelab/patinhas-digitais-web" -ForegroundColor Cyan
    } else {
        Write-Host ""
        Write-Host "Erro no push. Pode ser necessario autenticacao." -ForegroundColor Red
        Write-Host "Execute manualmente: git push -f origin main" -ForegroundColor Yellow
    }
}

Write-Host ""
