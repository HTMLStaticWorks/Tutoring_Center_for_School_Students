import os
import glob

directory = r'd:/August Websites/Tutoring Center for School Students'
html_files = glob.glob(os.path.join(directory, '*.html'))

button_html = """
    <!-- Scroll to Top Button -->
    <button id="scrollToTopBtn" class="scroll-to-top" aria-label="Scroll to top">
        <i data-lucide="arrow-up"></i>
    </button>
"""

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'id="scrollToTopBtn"' not in content:
        content = content.replace('</body>', button_html + '</body>')
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {os.path.basename(file_path)}")
    else:
        print(f"Skipped {os.path.basename(file_path)}")
