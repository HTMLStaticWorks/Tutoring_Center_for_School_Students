import os
import re

footer_template = """    <!-- Footer -->
    <footer class="footer mt-5">
        <div class="container">
            <div class="row g-5 mb-5">
                <div class="col-lg-4">
                    <a class="navbar-brand text-white mb-4" href="index.html">
                        <i data-lucide="graduation-cap" class="text-accent"></i>
                        BrightPath
                    </a>
                    <p class="mb-4">Empowering students to achieve academic excellence through personalized tutoring and innovative learning methods.</p>
                    <div class="d-flex gap-3">
                        <a href="#" class="btn btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;"><i data-lucide="instagram" style="width: 20px;"></i></a>
                        <a href="#" class="btn btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;"><i data-lucide="facebook" style="width: 20px;"></i></a>
                        <a href="#" class="btn btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;"><i data-lucide="youtube" style="width: 20px;"></i></a>
                    </div>
                </div>
                <div class="col-lg-2 col-md-4">
                    <h5 class="footer-title">Quick Links</h5>
                    <a href="about.html" class="footer-link">About Us</a>
                    <a href="tutors.html" class="footer-link">Our Tutors</a>
                    <a href="batches.html" class="footer-link">Batch Timings</a>
                </div>
                <div class="col-lg-2 col-md-4">
                    <h5 class="footer-title">Programs</h5>
                    <a href="subjects.html#primary" class="footer-link">Primary School</a>
                    <a href="subjects.html#middle" class="footer-link">Middle School</a>
                    <a href="subjects.html#high" class="footer-link">High School</a>
                </div>
                <div class="col-lg-4 col-md-4">
                    <h5 class="footer-title">Contact Us</h5>
                    <div class="d-flex mb-3 text-light">
                        <i data-lucide="map-pin" class="me-3 text-accent" style="flex-shrink: 0;"></i>
                        <span>123 Education Boulevard,<br>Learning District, NY 10001</span>
                    </div>
                    <div class="d-flex mb-3 text-light">
                        <i data-lucide="phone" class="me-3 text-accent" style="flex-shrink: 0;"></i>
                        <span>+1 (555) 123-4567</span>
                    </div>
                    <div class="d-flex text-light">
                        <i data-lucide="mail" class="me-3 text-accent" style="flex-shrink: 0;"></i>
                        <span>hello@brightpath.edu</span>
                    </div>
                </div>
            </div>
            <div class="border-top border-secondary pt-4 mt-4 text-center">
                <p class="mb-0 text-muted">&copy; 2026 BrightPath Learning Center. All rights reserved.</p>
            </div>
        </div>
    </footer>"""

for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Using regex to replace everything from <footer to </footer>
            new_content = re.sub(r'(\s*<!-- Footer -->\s*)?<footer.*?</footer>', '\n' + footer_template, content, flags=re.DOTALL)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f'Updated {file}')
