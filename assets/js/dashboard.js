/**
 * BrightPath Learning Center
 * Dashboard Specific JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Sidebar Toggle Logic (Mobile)
    const sidebar = document.getElementById('sidebar');
    const openSidebarBtn = document.getElementById('openSidebar');
    const closeSidebarBtn = document.getElementById('closeSidebar');

    if (openSidebarBtn && sidebar) {
        openSidebarBtn.addEventListener('click', () => {
            sidebar.classList.add('show');
        });
    }

    if (closeSidebarBtn && sidebar) {
        closeSidebarBtn.addEventListener('click', () => {
            sidebar.classList.remove('show');
        });
    }

    // Theme Toggle Logic
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateDashboardThemeIcon(currentTheme);

        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            theme = theme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            updateDashboardThemeIcon(theme);
            
            // Re-render chart if it exists to match theme
            if (window.progressChartInstance) {
                updateChartTheme(theme);
            }
        });
    }

    function updateDashboardThemeIcon(theme) {
        if (!themeToggle) return;
        if (theme === 'dark') {
            themeToggle.innerHTML = '<i data-lucide="moon"></i>';
        } else {
            themeToggle.innerHTML = '<i data-lucide="sun"></i>';
        }
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // RTL Toggle Logic
    const currentDir = localStorage.getItem('dir') || 'ltr';
    setRTL(currentDir === 'rtl');

    const rtlToggles = document.querySelectorAll('.rtl-toggle');
    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
            setRTL(!isRTL);
        });
    });

    function setRTL(isRTL) {
        const dir = isRTL ? 'rtl' : 'ltr';
        document.documentElement.setAttribute('dir', dir);
        localStorage.setItem('dir', dir);
        
        // Update Bootstrap CSS
        const bootstrapLink = document.querySelector('link[href*="bootstrap.min.css"], link[href*="bootstrap.rtl.min.css"]');
        if (bootstrapLink) {
            if (isRTL) {
                bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css';
            } else {
                bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
            }
        }
    }

    // Section Switching Logic (SPA)
    const sidebarLinks = document.querySelectorAll('.sidebar-link[data-section]');
    const dashboardSections = document.querySelectorAll('.dashboard-section');

    if (sidebarLinks.length > 0 && dashboardSections.length > 0) {
        sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links
                document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
                
                // Hide all sections
                dashboardSections.forEach(section => section.classList.add('d-none'));
                
                // Show target section
                const targetId = link.getAttribute('data-section');
                const targetSection = document.getElementById('section-' + targetId);
                if (targetSection) {
                    targetSection.classList.remove('d-none');
                }

                // Close sidebar on mobile after clicking
                if (window.innerWidth < 992 && sidebar) {
                    sidebar.classList.remove('show');
                }
            });
        });
    }

    // Initialize Chart.js
    initChart();
});

function initChart() {
    const ctx = document.getElementById('progressChart');
    if (!ctx) return;

    const theme = localStorage.getItem('theme') || 'light';
    const textColor = theme === 'dark' ? '#F8FAFC' : '#111827';
    const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

    window.progressChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
            datasets: [
                {
                    label: 'Math Score',
                    data: [75, 82, 80, 88, 85, 92],
                    borderColor: '#1E3A8A', // Primary
                    backgroundColor: 'rgba(30, 58, 138, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Science Score',
                    data: [70, 75, 82, 85, 89, 94],
                    borderColor: '#16A34A', // Success
                    backgroundColor: 'transparent',
                    borderWidth: 3,
                    borderDash: [5, 5],
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        padding: 20
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 50,
                    max: 100,
                    grid: { color: gridColor },
                    ticks: { color: textColor }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: textColor }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            }
        }
    });
}

function updateChartTheme(theme) {
    const textColor = theme === 'dark' ? '#F8FAFC' : '#111827';
    const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    
    if (window.progressChartInstance) {
        window.progressChartInstance.options.plugins.legend.labels.color = textColor;
        window.progressChartInstance.options.scales.y.grid.color = gridColor;
        window.progressChartInstance.options.scales.y.ticks.color = textColor;
        window.progressChartInstance.options.scales.x.ticks.color = textColor;
        window.progressChartInstance.update();
    }
}
