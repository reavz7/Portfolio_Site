document.addEventListener('DOMContentLoaded', () => { 
    // Get elements
    const navbarToggle = document.querySelector(".navbar-toggle");
    const navbarMenu = document.querySelector(".navbar-menu");
    const navbarLinks = document.querySelectorAll(".navbar-link");
    const header = document.querySelector("header");
    const sections = document.querySelectorAll(".section");
    
    // Toggle menu function
    function toggleMenu() { 
        navbarToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    }
    
    // Event listener for toggle button
    navbarToggle.addEventListener("click", toggleMenu);

    // Event listeners for navbar links
    navbarLinks.forEach((link) => {     
        link.addEventListener("click", function(e) { 
            // Prevent default anchor behavior
            e.preventDefault();
            
            // Close mobile menu
            navbarToggle.classList.remove("active");
            navbarMenu.classList.remove("active");
            
            // Remove active class from all links
            navbarLinks.forEach((link) => link.classList.remove("active"));
            
            // Add active class to clicked link
            this.classList.add("active");
            
            // Get the target section id from href attribute
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            
            // Scroll to the target section
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,    
                    behavior: "smooth"
                });
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
        const isClickInsideNavbar = navbarToggle.contains(event.target) ||
            navbarMenu.contains(event.target);
        
        if (!isClickInsideNavbar && navbarMenu.classList.contains("active")) { 
            toggleMenu();
        }
    });
    
    // Highlight active section on scroll
    function highlightActiveSection() {
        const scrollPosition = window.scrollY;
        const headerHeight = header.offsetHeight;
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - headerHeight - 20; // 20px offset for better UX
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navbarLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }
    
    // Listen for scroll events
    window.addEventListener("scroll", highlightActiveSection);
    
    // Call once on page load to set initial active state
    highlightActiveSection();

    
}); 