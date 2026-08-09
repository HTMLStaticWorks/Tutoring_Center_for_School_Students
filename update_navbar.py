import os
import re

top_block_pattern = r'<div class="d-flex align-items-center order-lg-3 gap-3">.*?<button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse"\s*data-bs-target="#navbarNav">\s*<i data-lucide="menu"></i>\s*</button>\s*</div>'
top_block_replacement = """<div class="d-flex align-items-center order-xl-3 gap-3">
                <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNav">
                    <i data-lucide="menu"></i>
                </button>
            </div>"""

collapse_start_pattern = r'<div class="collapse navbar-collapse order-lg-2" id="navbarNav">\s*<ul class="navbar-nav mx-auto">'
collapse_start_replacement = """<div class="collapse navbar-collapse order-xl-2" id="navbarNav">
                <ul class="navbar-nav mx-auto text-center">"""

mobile_buttons_pattern = r'<li class="nav-item d-md-none mt-3">\s*<a href="login.html".*?</li>\s*</ul>\s*</div>'
mobile_buttons_replacement = """</ul>
                <div class="d-flex flex-column flex-xl-row align-items-center gap-3 mt-3 mt-xl-0 ms-xl-4 pb-3 pb-xl-0">
                    <div class="d-flex justify-content-center gap-3 w-100 w-xl-auto">
                        <button class="theme-toggle rtl-toggle" aria-label="Toggle RTL">
                            <i data-lucide="arrow-right-left"></i>
                        </button>
                        <button id="themeToggle" class="theme-toggle" aria-label="Toggle Dark Mode">
                            <i data-lucide="sun"></i>
                        </button>
                    </div>
                    <a href="login.html" class="btn btn-primary-custom w-100 w-xl-auto rounded-pill px-3">Login</a>
                    <a href="admissions.html" class="btn btn-accent w-100 w-xl-auto rounded-pill px-4 text-nowrap">Free Assessment</a>
                </div>
            </div>"""

for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            new_content = content
            
            # 1. Update navbar-expand-lg to navbar-expand-xl
            new_content = new_content.replace('navbar-expand-lg', 'navbar-expand-xl')
            
            # 2. Top block
            new_content = re.sub(top_block_pattern, top_block_replacement, new_content, flags=re.DOTALL)
            
            # 3. Collapse start
            new_content = re.sub(collapse_start_pattern, collapse_start_replacement, new_content, flags=re.DOTALL)
            
            # 4. Mobile buttons
            new_content = re.sub(mobile_buttons_pattern, mobile_buttons_replacement, new_content, flags=re.DOTALL)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f'Updated {file}')
