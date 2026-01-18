// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const birthdayText = document.getElementById('birthday-text');
    const confettiBtn = document.getElementById('confetti-btn');
    const messageBtn = document.getElementById('message-btn');
    const memoriesModal = document.getElementById('memories-modal');
    const messageModal = document.getElementById('message-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const closeMessageModalBtn = document.getElementById('close-message-modal');
    const floatingContainer = document.querySelector('.floating-container');
    const confettiContainer = document.getElementById('confetti-container');
    const galleryContainer = document.querySelector('.gallery-container');
    
    // Carousel Elements
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    // Carousel Variables
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;
    let isAnimating = false;
    const slideDuration = 5000; // 5 seconds per slide
    
    // Initialize the page
    initPage();
    
    function initPage() {
        // Animate loading text letters
        animateLoadingText();
        
        // Simulate loading time
        setTimeout(() => {
            // Hide loading screen
            loadingScreen.style.opacity = '0';
            
            // Show main content after a delay
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                mainContent.classList.remove('hidden');
                
                // Animate birthday text
                animateBirthdayText();
                
                // Create floating elements
                createFloatingElements();
                
                // Initialize carousel
                initCarousel();
                
                // Load memory photos for modal
                loadMemoryPhotos();
                
                // Add interactivity to memory timeline items
                addTimelineInteractivity();
                
                // Add staggered animation delays to gallery items
                addGalleryAnimationDelays();
                
                // Play background music if available
                playBackgroundMusic();
            }, 500);
        }, 3000); // 3 seconds loading time
    }
    
    // Animate loading text letters
    function animateLoadingText() {
        const letters = document.querySelectorAll('.letter');
        letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.style.animation = `fadeInLetter 0.5s forwards`;
            }, index * 100);
        });
    }
    
    // Animate the birthday text
    function animateBirthdayText() {
        const originalText = "Happy 18th Birthday!";
        
        birthdayText.innerHTML = originalText
            .split('')
            .map(letter => `<span class="letter-animate">${letter === ' ' ? '&nbsp;' : letter}</span>`)
            .join('');
        
        const letters = document.querySelectorAll('.letter-animate');
        letters.forEach((letter, index) => {
            letter.style.display = 'inline-block';
            letter.style.opacity = '0';
            letter.style.transform = 'translateY(20px) rotate(-10deg)';
            
            setTimeout(() => {
                letter.style.transition = 'opacity 0.5s, transform 0.5s';
                letter.style.opacity = '1';
                letter.style.transform = 'translateY(0) rotate(0deg)';
                
                setTimeout(() => {
                    letter.style.transform = 'translateY(-8px)';
                    setTimeout(() => {
                        letter.style.transform = 'translateY(0)';
                    }, 200);
                }, 600 + index * 50);
            }, index * 100);
        });
    }
    
    // Create floating elements in the background
    function createFloatingElements() {
        for (let i = 0; i < 25; i++) {
            createFloatingElement();
        }
        
        setInterval(createFloatingElement, 1500);
    }
    
    function createFloatingElement() {
        const element = document.createElement('div');
        element.classList.add('floating-element');
        
        const elements = [
            '<i class="fas fa-star"></i>',
            '<i class="fas fa-heart"></i>',
            '<i class="fas fa-birthday-cake"></i>',
            '<i class="fas fa-gift"></i>',
            '<i class="fas fa-crown"></i>'
        ];
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        element.innerHTML = randomElement;
        
        const left = Math.random() * 100;
        element.style.left = `${left}vw`;
        
        const size = Math.random() * 25 + 15;
        element.style.fontSize = `${size}px`;
        
        const colors = ['#8a56ac', '#6b8cbc', '#ffd166', '#ffb347', '#a978d4'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        element.style.color = color;
        
        const duration = Math.random() * 15 + 15;
        const delay = Math.random() * 5;
        
        element.style.animation = `floatElement ${duration}s linear ${delay}s infinite`;
        
        floatingContainer.appendChild(element);
        
        setTimeout(() => {
            if (element.parentNode) {
                element.remove();
            }
        }, (duration + delay) * 1000);
    }
    
    // Initialize image carousel
    function initCarousel() {
        // Set initial active slide
        updateCarousel();
        
        // Start auto sliding
        startAutoSlide();
    }
    
    // Start automatic sliding
    function startAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, slideDuration);
    }
    
    // Stop automatic sliding
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Go to next slide
    function nextSlide() {
        if (isAnimating) return;
        
        isAnimating = true;
        stopAutoSlide();
        
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Calculate next slide
        currentSlide = (currentSlide + 1) % totalSlides;
        
        // Add active class to new slide
        slides[currentSlide].classList.add('active');
        
        // Update indicators
        updateIndicators();
        
        // Restart auto sliding after transition
        setTimeout(() => {
            isAnimating = false;
            startAutoSlide();
        }, 500);
    }
    
    // Go to previous slide
    function prevSlide() {
        if (isAnimating) return;
        
        isAnimating = true;
        stopAutoSlide();
        
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Calculate previous slide
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        
        // Add active class to new slide
        slides[currentSlide].classList.add('active');
        
        // Update indicators
        updateIndicators();
        
        // Restart auto sliding after transition
        setTimeout(() => {
            isAnimating = false;
            startAutoSlide();
        }, 500);
    }
    
    // Update indicators
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        if (isAnimating || index === currentSlide) return;
        
        isAnimating = true;
        stopAutoSlide();
        
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Set new slide
        currentSlide = index;
        
        // Add active class to new slide
        slides[currentSlide].classList.add('active');
        
        // Update indicators
        updateIndicators();
        
        // Restart auto sliding after transition
        setTimeout(() => {
            isAnimating = false;
            startAutoSlide();
        }, 500);
    }
    
    // Update carousel display (initial setup)
    function updateCarousel() {
        // Hide all slides first
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show current slide
        slides[currentSlide].classList.add('active');
        
        // Update indicators
        updateIndicators();
    }
    
    // Load memory photos into gallery modal
    function loadMemoryPhotos() {
        const memoryPhotos = [
            {
                url: "IMG_20231216_174245.jpg",
                caption: "One of the best tree",
                date: "2023"
            },
            {
                url: "IMG_20250405_062420.jpg",
                caption: "Even a broken branch filled with lots of memory",
                date: "2024"
            },
            {
                url: "IMG-20230902-WA0027.jpg",
                caption: "When we went for a walk",
                date: "2023"
            },
            {
                url: "IMG_20240421_064308.jpg",
                caption: "One of the flower from this tree",
                date: "2024"
            },
            {
                url: "IMG_20231216_072542.jpg",
                caption: "Your school back gate",
                date: "2023"
            },
            {
                url: "84026.jpg",
                caption: "Princess moment",
                date: "2023"
            },
            {
                url: "IMG_20240421_064015.jpg",
                caption: "One of the girl is dancing here",
                date: "2024"
            },
            {
                url: "IMG_20250331_222156.jpg",
                caption: "One of the beautiful memories",
                date: "2024"
            },
            {
                url: "IMG_20250520_203051.jpg",
                caption: "One of the beautiful moments",
                date: "2024"
            },
            {
                url: "Screenshot 2026-01-16 230548.png",
                caption: "Beautiful Smile",
                date: "2024"
            },
            {
                url: "IMG_20250605_212650.jpg",
                caption: "Only word can define beautiful",
                date: "2024"
            },
            {
                url: "IMG_20250331_222156.jpg",
                caption: "One of the beautiful thought",
                date: "2024"
            }
        ];
        
        galleryContainer.innerHTML = '';
        
        memoryPhotos.forEach((photo, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            // Add date only if it exists
            const dateElement = photo.date ? `<div class="photo-date">${photo.date}</div>` : '';
            
            galleryItem.innerHTML = `
                <div class="photo-frame">
                    <img src="${photo.url}" alt="Krishnaveni Memory ${index + 1}" loading="lazy">
                    <div class="photo-caption">${photo.caption}</div>
                    ${dateElement}
                </div>
            `;
            
            galleryContainer.appendChild(galleryItem);
        });
    }
    
    // Add staggered animation delays to gallery items
    function addGalleryAnimationDelays() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            item.style.animationDelay = `${(index + 1) * 0.1}s`;
        });
    }
    
    // Add interactivity to memory timeline items
    function addTimelineInteractivity() {
        document.querySelectorAll('.timeline-item').forEach(item => {
            item.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                const img = this.querySelector('img');
                const caption = this.querySelector('h3').textContent;
                const description = this.querySelector('p').textContent;
                
                // Create fullscreen modal for the clicked image
                const modalView = document.createElement('div');
                modalView.className = 'image-modal';
                
                const modalContent = document.createElement('div');
                modalContent.className = 'image-modal-content';
                
                // Close button
                const closeBtn = document.createElement('button');
                closeBtn.className = 'image-modal-close';
                closeBtn.innerHTML = '<i class="fas fa-times"></i>';
                closeBtn.setAttribute('aria-label', 'Close image');
                
                const modalImg = document.createElement('img');
                modalImg.src = img.src;
                modalImg.alt = img.alt;
                
                const modalCaption = document.createElement('div');
                modalCaption.className = 'image-modal-caption';
                modalCaption.innerHTML = `
                    <h3>${caption}</h3>
                    <p>${description}</p>
                    <p style="font-size: 0.9rem; opacity: 0.7; margin-top: 0.5rem;">Click anywhere or press ESC to close</p>
                `;
                
                modalContent.appendChild(closeBtn);
                modalContent.appendChild(modalImg);
                modalContent.appendChild(modalCaption);
                modalView.appendChild(modalContent);
                document.body.appendChild(modalView);
                
                // Prevent body scrolling when modal is open
                document.body.style.overflow = 'hidden';
                
                // Close modal functions
                const closeModal = function() {
                    if (document.body.contains(modalView)) {
                        document.body.removeChild(modalView);
                        document.body.style.overflow = 'auto';
                        document.removeEventListener('keydown', closeOnEsc);
                    }
                };
                
                closeBtn.addEventListener('click', closeModal);
                modalView.addEventListener('click', function(e) {
                    if (e.target === modalView) {
                        closeModal();
                    }
                });
                
                // Also close on ESC key
                const closeOnEsc = function(e) {
                    if (e.key === 'Escape') {
                        closeModal();
                    }
                };
                document.addEventListener('keydown', closeOnEsc);
            });
        });
    }
    
    // Play background music if available
    function playBackgroundMusic() {
        const bgMusic = document.getElementById('bg-music');
        if (bgMusic) {
            // Only play if user interacts with page first
            document.addEventListener('click', function playMusicOnce() {
                bgMusic.play().catch(e => {
                    console.log("Autoplay prevented:", e);
                });
                document.removeEventListener('click', playMusicOnce);
            }, { once: true });
        }
    }
    
    // Event Listeners for modals
    messageBtn.addEventListener('click', function() {
        messageModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });
    
    closeModalBtn.addEventListener('click', function() {
        memoriesModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });
    
    closeMessageModalBtn.addEventListener('click', function() {
        messageModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });
    
    memoriesModal.addEventListener('click', function(e) {
        if (e.target === memoriesModal) {
            memoriesModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
    
    messageModal.addEventListener('click', function(e) {
        if (e.target === messageModal) {
            messageModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Carousel controls with hover pause
    prevBtn.addEventListener('click', function() {
        prevSlide();
    });
    
    nextBtn.addEventListener('click', function() {
        nextSlide();
    });
    
    // Pause auto-slide on hover
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', function() {
        stopAutoSlide();
    });
    
    carouselContainer.addEventListener('mouseleave', function() {
        if (!isAnimating) {
            startAutoSlide();
        }
    });
    
    // Carousel indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Confetti button
    confettiBtn.addEventListener('click', createConfetti);
    
    // Create confetti effect
    function createConfetti() {
        confettiContainer.innerHTML = '';
        
        for (let i = 0; i < 200; i++) {
            setTimeout(() => {
                createConfettiPiece();
            }, i * 5);
        }
        
        // Add sound effect for celebration
        playCelebrationSound();
    }
    
    function createConfettiPiece() {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        const left = Math.random() * 100;
        confetti.style.left = `${left}vw`;
        
        const size = Math.random() * 15 + 8;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        
        const colors = ['#8a56ac', '#6b8cbc', '#ffd166', '#ffb347', '#a978d4', '#8dabdd'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.backgroundColor = color;
        
        const shapes = ['circle', 'square', 'triangle'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        if (shape === 'circle') {
            confetti.style.borderRadius = '50%';
        } else if (shape === 'triangle') {
            confetti.style.width = '0';
            confetti.style.height = '0';
            confetti.style.borderLeft = `${size/2}px solid transparent`;
            confetti.style.borderRight = `${size/2}px solid transparent`;
            confetti.style.borderBottom = `${size}px solid ${color}`;
            confetti.style.backgroundColor = 'transparent';
        }
        
        confettiContainer.appendChild(confetti);
        
        const animationDuration = Math.random() * 3 + 2;
        const horizontalMovement = (Math.random() - 0.5) * 200;
        
        confetti.animate([
            { 
                transform: 'translateY(0) rotate(0deg)', 
                opacity: 1 
            },
            { 
                transform: `translateY(${window.innerHeight}px) translateX(${horizontalMovement}px) rotate(${Math.random() * 720}deg)`, 
                opacity: 0 
            }
        ], {
            duration: animationDuration * 1000,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
        });
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.remove();
            }
        }, animationDuration * 1000);
    }
    
    // Play celebration sound
    function playCelebrationSound() {
        // Create a simple celebration sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            console.log("Web Audio API not supported");
        }
    }
    
    // Add click effect to gallery images in modal
    document.addEventListener('click', function(e) {
        // Check if clicked on photo-frame or its child
        const photoFrame = e.target.closest('.photo-frame');
        if (photoFrame) {
            const img = photoFrame.querySelector('img');
            if (img) {
                const captionElement = photoFrame.querySelector('.photo-caption');
                const captionText = captionElement ? captionElement.textContent : 'Beautiful Memory';
                
                const modalView = document.createElement('div');
                modalView.className = 'image-modal';
                
                const modalContent = document.createElement('div');
                modalContent.className = 'image-modal-content';
                
                // Close button
                const closeBtn = document.createElement('button');
                closeBtn.className = 'image-modal-close';
                closeBtn.innerHTML = '<i class="fas fa-times"></i>';
                closeBtn.setAttribute('aria-label', 'Close image');
                
                const modalImg = document.createElement('img');
                modalImg.src = img.src;
                modalImg.alt = img.alt;
                
                const modalCaption = document.createElement('div');
                modalCaption.className = 'image-modal-caption';
                modalCaption.innerHTML = `
                    <h3>${captionText}</h3>
                    <p style="font-size: 0.9rem; opacity: 0.7; margin-top: 0.5rem;">Click anywhere or press ESC to close</p>
                `;
                
                modalContent.appendChild(closeBtn);
                modalContent.appendChild(modalImg);
                modalContent.appendChild(modalCaption);
                modalView.appendChild(modalContent);
                document.body.appendChild(modalView);
                
                // Prevent body scrolling when modal is open
                document.body.style.overflow = 'hidden';
                
                // Close modal functions
                const closeModal = function() {
                    if (document.body.contains(modalView)) {
                        document.body.removeChild(modalView);
                        document.body.style.overflow = 'auto';
                        document.removeEventListener('keydown', closeOnEsc);
                    }
                };
                
                closeBtn.addEventListener('click', closeModal);
                modalView.addEventListener('click', function(e) {
                    if (e.target === modalView) {
                        closeModal();
                    }
                });
                
                // Also close on ESC key
                const closeOnEsc = function(e) {
                    if (e.key === 'Escape') {
                        closeModal();
                    }
                };
                document.addEventListener('keydown', closeOnEsc);
            }
        }
    });
    
    // Add some interactivity to the wish cards
    document.querySelectorAll('.wish-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 40px rgba(138, 86, 172, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // Add keyboard navigation for carousel
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'Escape') {
            // Close any open modals with ESC
            if (!memoriesModal.classList.contains('hidden')) {
                memoriesModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
            if (!messageModal.classList.contains('hidden')) {
                messageModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
            
            // Close image modal if open
            const imageModal = document.querySelector('.image-modal');
            if (imageModal) {
                imageModal.remove();
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    // Add touch swipe support for carousel on mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carouselContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
        }
    }
    
    // Add parallax effect to floating elements on scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach((element, index) => {
            const speed = 0.5 + (index % 3) * 0.2;
            element.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
        });
    });
    
    // Add birthday countdown timer (if applicable)
    function addBirthdayCountdown() {
        // You can implement a countdown timer here if needed
        // For example, countdown to next birthday or special event
    }
    
    // Add animation to the number 18
    const numberElement = document.querySelector('.number');
    if (numberElement) {
        numberElement.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(5deg)';
        });
        
        numberElement.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
});