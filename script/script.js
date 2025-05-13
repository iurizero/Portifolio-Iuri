// Configurações
const CONFIG = {
    scrollThreshold: 50,
    animationSpeed: {
        fast: 150,
        medium: 300,
        slow: 500
    }
};

// Gerenciador de Navegação
class NavigationManager {
    constructor() {
        this.header = document.getElementById("mainHeader");
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.navList = document.querySelector('nav ul');
        this.navLinks = document.querySelectorAll('nav ul li');
        this.lastScroll = 0;
        
        this.init();
    }

    init() {
        this.setupScrollListener();
        this.setupMobileMenu();
        this.setupSmoothScroll();
    }

    setupScrollListener() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > CONFIG.scrollThreshold) {
            this.header.classList.add("scrolled");
        } else {
            this.header.classList.remove("scrolled");
        }
        
        if (currentScroll <= 0) {
            this.header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > this.lastScroll && !this.header.classList.contains('scroll-down')) {
            this.header.classList.remove('scroll-up');
            this.header.classList.add('scroll-down');
        } else if (currentScroll < this.lastScroll && this.header.classList.contains('scroll-down')) {
            this.header.classList.remove('scroll-down');
            this.header.classList.add('scroll-up');
        }
        
        this.lastScroll = currentScroll;
    }

    setupMobileMenu() {
        if (!this.mobileMenu) return;

        this.mobileMenu.addEventListener('click', () => {
            this.mobileMenu.classList.toggle('active');
            this.navList.classList.toggle('active');
            document.body.style.overflow = this.navList.classList.contains('active') ? 'hidden' : '';
        });

        // Fechar menu ao clicar em um link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.mobileMenu.classList.remove('active');
                this.navList.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Fechar menu ao redimensionar a janela
        window.addEventListener('resize', () => {
            if (window.innerWidth > 800) {
                this.mobileMenu.classList.remove('active');
                this.navList.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Gerenciador de Animações
class AnimationManager {
    constructor() {
        this.observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHeroAnimations();
        this.setupHoverEffects();
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        document.querySelectorAll('.about-box, .projects-box, .education-item, .certifications-item, .freelance-item')
            .forEach(el => observer.observe(el));
    }

    setupHeroAnimations() {
        const heroContent = document.querySelector('.hero-content');
        const heroTitle = document.querySelector('.hero-content h1');
        const heroSubtitle = document.querySelector('.hero-content h3');
        const heroImage = document.querySelector('.hero-image');

        // Fade in hero content
        setTimeout(() => heroContent.classList.add('visible'), 100);

        // Typing effect - Aumentando a velocidade da animação
        this.typeWriter(heroTitle, heroTitle.textContent, 120); // Reduzindo de 100 para 50
        setTimeout(() => {
            this.typeWriter(heroSubtitle, heroSubtitle.textContent, 75); // Reduzindo de medium para 30
        }, heroTitle.textContent.length * 50); // Ajustando o delay baseado na nova velocidade

        // Parallax effect
        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 20;
            const yPos = (clientY / window.innerHeight - 0.5) * 20;
            
            heroImage.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
    }

    typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    setupHoverEffects() {
        // Project images hover effect
        document.querySelectorAll('.project-image').forEach(image => {
            image.addEventListener('mouseenter', () => {
                image.style.transform = 'scale(1.05)';
                image.style.transition = 'transform 0.3s ease';
            });
            
            image.addEventListener('mouseleave', () => {
                image.style.transform = 'scale(1)';
            });
        });

        // Removendo o efeito hover dos ícones de skills
        // document.querySelectorAll('.skills-icons img').forEach(icon => {
        //     icon.addEventListener('mouseenter', () => {
        //         icon.style.filter = 'brightness(0) invert(1) drop-shadow(0 0 10px var(--color004))';
        //     });
            
        //     icon.addEventListener('mouseleave', () => {
        //         icon.style.filter = 'brightness(0) invert(1)';
        //     });
        // });
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar gerenciadores
    const navigation = new NavigationManager();
    const animations = new AnimationManager();

    // Configurar partículas
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#ff3333', '#00ff88', '#0066ff']
            },
            shape: {
                type: ['circle', 'triangle', 'edge'],
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ff3333',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
});