$topBlockPattern = '(?s)<div class="d-flex align-items-center order-lg-3 gap-3">.*?<button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse"\s*data-bs-target="#navbarNav">\s*<i data-lucide="menu"></i>\s*</button>\s*</div>'
$topBlockReplacement = '<div class="d-flex align-items-center order-xl-3 gap-3">
                <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNav">
                    <i data-lucide="menu"></i>
                </button>
            </div>'

$collapseStartPattern = '(?s)<div class="collapse navbar-collapse order-lg-2" id="navbarNav">\s*<ul class="navbar-nav mx-auto">'
$collapseStartReplacement = '<div class="collapse navbar-collapse order-xl-2" id="navbarNav">
                <ul class="navbar-nav mx-auto text-center">'

$mobileButtonsPattern = '(?s)<li class="nav-item d-md-none mt-3">\s*<a href="login\.html".*?</li>\s*</ul>\s*</div>'
$mobileButtonsReplacement = '</ul>
                <div class="d-flex flex-column flex-xl-row align-items-center gap-3 mt-3 mt-xl-0 ms-xl-4 pb-3 pb-xl-0">
                    <div class="d-flex justify-content-center gap-3 w-100 w-xl-auto">
                        <button class="theme-toggle rtl-toggle" aria-label="Toggle RTL">
                            <i data-lucide="arrow-right-left"></i>
                        </button>
                        <button id="themeToggle" class="theme-toggle" aria-label="Toggle Dark Mode">
                            <i data-lucide="sun"></i>
                        </button>
                    </div>
                    <a href="login.html" class="btn btn-primary-custom w-100 w-xl-auto rounded-pill px-3 mb-2 mb-xl-0">Login</a>
                    <a href="admissions.html" class="btn btn-accent w-100 w-xl-auto rounded-pill px-4 text-nowrap">Free Assessment</a>
                </div>
            </div>'

$files = Get-ChildItem -Path . -Filter *.html

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    $newContent = $content

    $newContent = $newContent -replace 'navbar-expand-lg', 'navbar-expand-xl'
    $newContent = [regex]::Replace($newContent, $topBlockPattern, $topBlockReplacement)
    $newContent = [regex]::Replace($newContent, $collapseStartPattern, $collapseStartReplacement)
    $newContent = [regex]::Replace($newContent, $mobileButtonsPattern, $mobileButtonsReplacement)

    if ($newContent -cne $content) {
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
        Write-Host "Updated $($file.Name)"
    }
}
