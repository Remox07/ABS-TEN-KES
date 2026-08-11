# Script to create upload package for GitHub
$source = "d:\WEB_ABSENSI_TENAGA_KESEHATAN"
$destination = "d:\ABS-TEN-KES-UPLOAD.zip"

# Remove old zip if exists
if (Test-Path $destination) {
    Remove-Item $destination
}

# Create temp directory
$tempDir = "d:\TEMP_UPLOAD"
if (Test-Path $tempDir) {
    Remove-Item $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

# Copy all files except excluded folders
$exclude = @('.git', 'node_modules', '.env')

Get-ChildItem -Path $source | Where-Object { 
    $_.Name -notin $exclude 
} | ForEach-Object {
    Copy-Item $_.FullName -Destination $tempDir -Recurse -Force
}

# Create zip
Compress-Archive -Path "$tempDir\*" -DestinationPath $destination -Force

# Cleanup
Remove-Item $tempDir -Recurse -Force

Write-Host "✅ Upload package created: $destination" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Go to: https://github.com/Remox07/ABS-TEN-KES" -ForegroundColor Yellow
Write-Host "2. Click 'Add file' → 'Upload files'" -ForegroundColor Yellow
Write-Host "3. Drag and drop the zip file OR extract and drag all files" -ForegroundColor Yellow
Write-Host "4. Commit changes" -ForegroundColor Yellow
