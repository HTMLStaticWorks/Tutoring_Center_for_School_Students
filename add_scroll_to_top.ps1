$htmlFiles = Get-ChildItem -Path "d:\August Websites\Tutoring Center for School Students" -Filter "*.html"
$buttonHtml = @"
    <!-- Scroll to Top Button -->
    <button id="scrollToTopBtn" class="scroll-to-top" aria-label="Scroll to top">
        <i data-lucide="arrow-up"></i>
    </button>
</body>
"@

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    if (-not $content.Contains('id="scrollToTopBtn"')) {
        $content = $content -replace '</body>', $buttonHtml
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Output "Updated $($file.Name)"
    } else {
        Write-Output "Skipped $($file.Name)"
    }
}
