document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('enter-site-btn');
  var overlay = document.getElementById('opening-overlay');
  var videoOverlay = document.getElementById('video-overlay');
  var video = document.getElementById('opening-video');
  if (btn) {
    btn.onclick = function() {
      overlay.classList.add('fade-out');
      overlay.addEventListener('transitionend', function handleOverlayFade() {
        overlay.style.display = 'none';
        overlay.removeEventListener('transitionend', handleOverlayFade);
        videoOverlay.style.display = 'flex';
        setTimeout(function() {
          videoOverlay.classList.add('fade-in');
          videoOverlay.style.opacity = 1;
          video.currentTime = 0;
          video.play().catch(function(error) {
            console.log('Video autoplay failed:', error);
            // Fallback: try to play again after a short delay
            setTimeout(function() {
              video.play().catch(function(e) {
                console.log('Video play failed after retry:', e);
              });
            }, 100);
          });
        }, 10);
      });
    };
  }
  if (video) {
    video.onended = function() {
      videoOverlay.classList.remove('fade-in');
      videoOverlay.classList.add('fade-out');
      videoOverlay.addEventListener('transitionend', function handleVideoFade() {
        videoOverlay.style.display = 'none';
        videoOverlay.classList.remove('fade-out');
        videoOverlay.style.opacity = 0;
        videoOverlay.removeEventListener('transitionend', handleVideoFade);
        // Show main content after video ends
        var mainContent = document.getElementById('main-content');
        if (mainContent) {
          mainContent.style.display = 'block';
          // Fade in the navbar
          var navbar = document.querySelector('.navbar');
          if (navbar) {
            setTimeout(function() {
              navbar.classList.add('navbar-fade-in');
            }, 50);
          }
          // Fade in the hero image
          var heroImg = document.querySelector('.hero-bg img');
          if (heroImg) {
            setTimeout(function() {
              heroImg.classList.add('hero-img-fade-in');
            }, 100);
          }
        }
      });
    };
  }
});

window.addEventListener('scroll', function() {
  var navbar = document.querySelector('.navbar');
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

const fadeEls = document.querySelectorAll('.fade-in-on-scroll');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    } else {
      entry.target.classList.remove('in-view');
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => fadeObserver.observe(el));


const navbarToggle = document.getElementById('navbar-toggle');
const navMenu = document.querySelector('.nav-menu');
const navbarOverlay = document.querySelector('.navbar-overlay');
if (navbarToggle && navMenu && navbarOverlay) {
  navbarToggle.addEventListener('click', function() {
    navbarToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    navbarOverlay.classList.toggle('active');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navbarToggle.classList.remove('active');
      navMenu.classList.remove('active');
      navbarOverlay.classList.remove('active');
    });
  });

  navbarOverlay.addEventListener('click', () => {
    navbarToggle.classList.remove('active');
    navMenu.classList.remove('active');
    navbarOverlay.classList.remove('active');
  });
} 