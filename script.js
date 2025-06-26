// Scroll animation using Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
  const faders = document.querySelectorAll('.fade-in, .fade-in-photo, .image-container img, .product-card img');

  const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -100px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('visible');
        appearOnScroll.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // Party popper animation for slimming tea product
  const productSection = document.querySelector('#product');
  let partyPopperTriggered = false;

  if (productSection) {
    const partyPopperObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !partyPopperTriggered) {
          partyPopperTriggered = true;
          launchPartyPopper();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    partyPopperObserver.observe(productSection);
  }

  function launchPartyPopper() {
    // Confetti effect with colorful rounded rectangles from sides
    const confettiCount = 50;
    const confettiColors = ['#f94144', '#f3722c', '#f9844a', '#f9c74f', '#90be6d', '#43aa8b', '#577590'];
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const confettiPieces = [];

    function randomRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    function drawRoundedRect(ctx, x, y, width, height, radius) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fill();
    }

    class ConfettiPiece {
      constructor() {
        // Start from left or right side randomly
        this.fromLeft = Math.random() < 0.5;
        this.x = this.fromLeft ? randomRange(-50, 0) : randomRange(width, width + 50);
        this.y = randomRange(0, height);
        this.width = randomRange(6, 12);
        this.height = randomRange(12, 24);
        this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        this.speedX = this.fromLeft ? randomRange(1, 3) : randomRange(-3, -1);
        this.speedY = randomRange(1, 3);
        this.angle = randomRange(0, 2 * Math.PI);
        this.angularSpeed = randomRange(0.01, 0.05);
        this.radius = 3;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.angularSpeed;
        if (this.y > height || this.x < -50 || this.x > width + 50) {
          this.fromLeft = Math.random() < 0.5;
          this.x = this.fromLeft ? randomRange(-50, 0) : randomRange(width, width + 50);
          this.y = randomRange(0, height);
          this.speedX = this.fromLeft ? randomRange(1, 3) : randomRange(-3, -1);
          this.speedY = randomRange(1, 3);
          this.angle = randomRange(0, 2 * Math.PI);
          this.angularSpeed = randomRange(0.01, 0.05);
          this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
          this.width = randomRange(6, 12);
          this.height = randomRange(12, 24);
          this.radius = 3;
        }
      }

      draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        drawRoundedRect(ctx, -this.width / 2, -this.height / 2, this.width, this.height, this.radius);
        ctx.restore();
      }
    }

    for (let i = 0; i < confettiCount; i++) {
      confettiPieces.push(new ConfettiPiece());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      confettiPieces.forEach(p => {
        p.update();
        p.draw(ctx);
      });
      requestAnimationFrame(animate);
    }

    animate();

    // Fade out animation for confetti before removal
    setTimeout(() => {
      let opacity = 1;
      const fadeInterval = setInterval(() => {
        opacity -= 0.04; // faster fade out
        if (opacity <= 0) {
          clearInterval(fadeInterval);
          document.body.removeChild(canvas);
        } else {
          canvas.style.opacity = opacity;
        }
      }, 50);
    }, 4000); // start fade out earlier
  }
  
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');

  if (mobileMenuBtn && mobileNav) {
    console.log('Mobile menu button found, attaching event listener.');
    mobileMenuBtn.addEventListener('click', () => {
      console.log('Mobile menu button clicked.');
      mobileNav.classList.toggle('active');
    });
  }
});

// Enhanced hover effects for buttons and cards
const buttons = document.querySelectorAll('.btn, .service-card, .testimonial-card');
buttons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'scale(1.05)';
    button.style.transition = 'transform 0.3s ease';
  });
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'scale(1)';
  });
});

// Testimonial slider functionality
const testimonialGrid = document.querySelector('.testimonials-grid');
const prevBtn = document.querySelector('.testimonial-prev');
const nextBtn = document.querySelector('.testimonial-next');

if (testimonialGrid && prevBtn && nextBtn) {
  let currentIndex = 0;
  const testimonials = testimonialGrid.querySelectorAll('.testimonial-card');
  const totalTestimonials = testimonials.length;

  function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
      testimonial.style.display = i === index ? 'block' : 'none';
    });
  }

  showTestimonial(currentIndex);

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
    showTestimonial(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalTestimonials;
    showTestimonial(currentIndex);
  });

  // Auto slide every 5 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalTestimonials;
    showTestimonial(currentIndex);
  }, 5000);
}

// Auto typing effect for hero section
const autoTypingElement = document.getElementById('auto-typing');
const phrases = [
  'Transform Your Health with Personalized Diet Plans',
  'Achieve Your Wellness Goals with Expert Guidance',
  'Join Thousands Who Have Changed Their Lives'
];
let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
  const currentPhrase = phrases[currentPhraseIndex];
  if (isDeleting) {
    currentCharIndex--;
    autoTypingElement.textContent = currentPhrase.substring(0, currentCharIndex);
    if (currentCharIndex === 0) {
      isDeleting = false;
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, typingSpeed / 2);
    }
  } else {
    currentCharIndex++;
    autoTypingElement.textContent = currentPhrase.substring(0, currentCharIndex);
    if (currentCharIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(type, 2000);
    } else {
      setTimeout(type, typingSpeed);
    }
  }
}

// Banner slider auto-slide functionality
const slides = document.querySelectorAll('.banner-slider .slide');
let currentSlide = 0;
const slideInterval = 4000; // 4 seconds

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

document.addEventListener('DOMContentLoaded', () => {
  if (autoTypingElement) {
    type();
  }
  if (slides.length > 0) {
    setInterval(nextSlide, slideInterval);
  }

  const prevBtn = document.querySelector('.banner-prev');
  const nextBtn = document.querySelector('.banner-next');

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
    });

    nextBtn.addEventListener('click', () => {
      nextSlide();
    });
  }
});
