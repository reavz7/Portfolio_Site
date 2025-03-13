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

document.addEventListener("DOMContentLoaded", () => {
  // Carousel elements
  const track = document.querySelector(".carousel-track")
  const slides = Array.from(document.querySelectorAll(".carousel-slide"))
  const nextButton = document.querySelector(".next-button")
  const prevButton = document.querySelector(".prev-button")

  // Set initial state
  let currentIndex = 0
  let slideWidth = 0
  let slidesToShow = 1

  // Function to update the number of slides to show based on screen width
  function updateSlidesToShow() {
    if (window.innerWidth >= 1024) {
      slidesToShow = 3
    } else if (window.innerWidth >= 768) {  
      slidesToShow = 2
    } else {
      slidesToShow = 1
    }

    // Update slide width
    slideWidth = track.clientWidth / slidesToShow

    // Set width for each slide
    slides.forEach((slide) => {
      slide.style.width = `${slideWidth}px`
    })

    // Update track position
    updateTrackPosition()
  }

  // Function to update the track position
  function updateTrackPosition() {
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`

    // Update active slide appearance
    slides.forEach((slide, index) => {
      if (index >= currentIndex && index < currentIndex + slidesToShow) {
        slide.style.opacity = "1"
      } else {
        slide.style.opacity = "0.5"
      }
    })

    // Disable/enable buttons based on position
    prevButton.disabled = currentIndex === 0
    nextButton.disabled = currentIndex >= slides.length - slidesToShow

    // Visual indication of disabled buttons
    prevButton.style.opacity = prevButton.disabled ? "0.5" : "1"
    nextButton.style.opacity = nextButton.disabled ? "0.5" : "1"
  }

  // Event listeners for buttons
  nextButton.addEventListener("click", () => {
    if (currentIndex < slides.length - slidesToShow) {
      currentIndex++
      updateTrackPosition()
    }
  })

  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--
      updateTrackPosition()
    }
  })

  // Initialize carousel
  updateSlidesToShow()

  // Update on window resize    
  window.addEventListener("resize", () => {
    updateSlidesToShow()
  })

  // Touch events for mobile swiping
  let touchStartX = 0
  let touchEndX = 0

  track.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX
  })

  track.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX
    handleSwipe()
  })

  function handleSwipe() {
    const swipeThreshold = 50
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left - go to next slide
      if (currentIndex < slides.length - slidesToShow) {
        currentIndex++
        updateTrackPosition()
      }
    }

    if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right - go to previous slide
      if (currentIndex > 0) {
        currentIndex--
        updateTrackPosition()
      }
    }
    }
    
})


