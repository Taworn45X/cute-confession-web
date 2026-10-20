# ========================================================
# 🚀 Azure Static Web Apps - One-Click Deploy Script
# ========================================================

Write-Host "=====================================================" -ForegroundColor Magenta
Write-Host "💖 กำลังเตรียมการ Deploy เว็บขอเป็นแฟน ขึ้น Azure..." -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Magenta

# ตรวจสอบว่าอยู่ในโฟลเดอร์โปรเจกต์หรือไม่
$currentDir = Get-Location
Write-Host "📁 โฟลเดอร์ปัจจุบัน: $currentDir" -ForegroundColor Yellow

Write-Host "`nกำลังเริ่มกระบวนการ Deploy ด้วย Azure SWA CLI..." -ForegroundColor Green
Write-Host "👉 ระบบจะเปิดหน้าเว็บเบราว์เซอร์ให้คุณ Login ด้วยบัญชี Azure อัตโนมัติ (ปลอดภัย 100%)" -ForegroundColor Cyan

# รัน Azure Static Web Apps Deploy
npx @azure/static-web-apps-cli deploy . --env production

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n🎉 สำเร็จแล้ว! คุณจะได้ URL เว็บ (.azurestaticapps.net) นำไปส่งให้แฟนได้เลย!" -ForegroundColor Green
} else {
    Write-Host "`n⚠️ หากยังไม่ได้ Login หรือต้องการใช้ Deployment Token สามารถดูวิธีเพิ่มเติมใน README.md ได้ครับ" -ForegroundColor Yellow
}
