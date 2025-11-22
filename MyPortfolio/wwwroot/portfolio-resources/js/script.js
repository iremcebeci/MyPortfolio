// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light' mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Typing animation
const typingTexts = [
    'Kodlama tutkusuyla dolu bir öğrenciyim',
    'Web geliştirme meraklısıyım',
    'Problem çözmeyi seviyorum',
    'Yeni teknolojiler öğreniyorum'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');

function typeText() {
    const currentText = typingTexts[textIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
    }

    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeText, typingSpeed);
}

// Start typing animation
setTimeout(typeText, 1000);

// Skill bars animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Load filters from localStorage and initialize
function loadFiltersFromStorage() {
    const data = JSON.parse(localStorage.getItem('portfolioData'));
    if (!data || !data.filters) return;

    // Load project filters
    if (data.filters.projects) {
        const projectFilterContainer = document.getElementById('projectsFilter');
        if (projectFilterContainer) {
            projectFilterContainer.innerHTML = '';
            data.filters.projects.forEach((filter, index) => {
                const button = document.createElement('button');
                button.className = 'filter-btn' + (index === 0 ? ' active' : '');
                button.setAttribute('data-filter', filter.value);
                button.textContent = filter.label;
                projectFilterContainer.appendChild(button);
            });
            setupProjectFilters();
        }
    }

    // Load blog filters
    if (data.filters.blog) {
        const blogFilterContainer = document.getElementById('blogFilter');
        if (blogFilterContainer) {
            blogFilterContainer.innerHTML = '';
            data.filters.blog.forEach((filter, index) => {
                const button = document.createElement('button');
                button.className = 'filter-btn' + (index === 0 ? ' active' : '');
                button.setAttribute('data-filter', filter.value);
                button.textContent = filter.label;
                blogFilterContainer.appendChild(button);
            });
            setupBlogFilters();
        }
    }
}

// Projects filter
function setupProjectFilters() {
    const filterButtons = document.querySelectorAll('#projectsFilter .filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Blog filter
function setupBlogFilters() {
    const blogFilterButtons = document.querySelectorAll('#blogFilter .filter-btn');
    const allBlogCards = document.querySelectorAll('.blog-card');

    blogFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all blog filter buttons
            blogFilterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            allBlogCards.forEach(card => {
                const cardCategory = card.getAttribute('data-blog-category');
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animate on scroll
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Add animation to elements
const animatedElements = document.querySelectorAll('.project-card, .skill-category, .stat-item');
animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'all 0.6s ease';
    animateOnScroll.observe(element);
});

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Form verilerini email olarak göndermek için mailto kullanıyoruz
    const mailtoLink = `mailto:your.email@example.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `İsim: ${formData.name}\n` +
        `Email: ${formData.email}\n\n` +
        `Mesaj:\n${formData.message}`
    )}`;

    // Email istemcisini aç
    window.location.href = mailtoLink;

    // Bilgilendirme mesajı
    setTimeout(() => {
        alert('✅ Mesajınız hazırlandı! Email istemciniz açılacak.\n\nEğer açılmazsa, lütfen dogrudan your.email@example.com adresine mail gönderin.');
        contactForm.reset();
    }, 100);

    // NOT: Gerçek bir backend servisi kullanmak için:
    // EmailJS, Formspree veya kendi backend API'nizi kullanabilirsiniz
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.image-container');

    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Counter animation for stats
const counters = document.querySelectorAll('.stat-item h4');
const speed = 200;

const countUp = (counter) => {
    const target = +counter.innerText.replace('+', '');
    const count = +counter.getAttribute('data-count') || 0;
    const increment = target / speed;

    if (count < target) {
        counter.setAttribute('data-count', Math.ceil(count + increment));
        counter.innerText = Math.ceil(count + increment) + '+';
        setTimeout(() => countUp(counter), 1);
    } else {
        counter.innerText = target + '+';
    }
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            counters.forEach(counter => {
                counter.setAttribute('data-count', '0');
                countUp(counter);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('.about');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// Add hover effect for project cards - will be set after dynamic load
function setupProjectCardHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Lazy loading for images
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Add custom cursor effect
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Console message for developers
console.log('%c👋 Merhaba Geliştirici!', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cBu portfolyo sitesi vanilla JavaScript ile geliştirilmiştir.', 'font-size: 14px; color: #8b5cf6;');
console.log('%cKaynak kodu için: https://github.com/yourprofile', 'font-size: 12px; color: #ec4899;');

// Console message for developers
const loadMoreBlogsBtn = document.getElementById('loadMoreBlogs');
if (loadMoreBlogsBtn) {
    loadMoreBlogsBtn.addEventListener('click', () => {
        // Here you would load more blog posts
        alert('Daha fazla blog yazısı yükleniyor...');
    });
}

// Projects load more functionality
const loadMoreProjectsBtn = document.getElementById('loadMoreProjects');
if (loadMoreProjectsBtn) {
    loadMoreProjectsBtn.addEventListener('click', () => {
        // Here you would load more projects
        alert('Daha fazla proje yükleniyor...');
    });
}

// Animate timeline items on scroll
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px'
});

timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transition = 'all 0.6s ease';

    if (index % 2 === 0) {
        item.style.transform = 'translateX(-50px)';
    } else {
        item.style.transform = 'translateX(50px)';
    }

    timelineObserver.observe(item);
});

// Blog cards animation
const blogCards = document.querySelectorAll('.blog-card');
blogCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.6s ease';
    card.style.transitionDelay = `${index * 0.1}s`;
    animateOnScroll.observe(card);
});

// CV Download Function
function downloadCV() {
    // Burada kendi CV dosyanızın yolunu belirtin
    // Örnek: '/path/to/your-cv.pdf'

    // Şimdilik bir demo CV oluşturacak
    alert('📄 CV indirme işlemi başlatıldı!\n\nKendi CV dosyanızı eklemek için:\n1. CV dosyanızı (PDF formatında) proje klasörüne ekleyin\n2. script.js dosyasındaki downloadCV() fonksiyonunda dosya yolunu güncelleyin');

    // CV dosyası eklendiğinde aşağıdaki kodu kullanın:
    /*
    const link = document.createElement('a');
    link.href = 'CV-AdSoyad.pdf'; // CV dosyanızın yolu
    link.download = 'CV-AdSoyad.pdf'; // İndirilecek dosya adı
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    */
}

// ===== LOAD DATA FROM ADMIN PANEL =====
function loadPortfolioData() {
    const data = JSON.parse(localStorage.getItem('portfolioData'));
    if (!data) return; // If no data, use static HTML

    // Load Personal Info
    if (data.personal) {
        const heroTitle = document.querySelector('.hero-title .gradient-text');
        const heroSubtitle = document.querySelector('.typing-text');
        if (heroTitle) heroTitle.textContent = data.personal.fullName || 'Yazılım Geliştirici';
        if (heroSubtitle) heroSubtitle.textContent = data.personal.heroDescription || 'Kodlama tutkusuyla dolu bir öğrenciyim';
    }

    // Load About
    if (data.about) {
        const aboutTitle = document.querySelector('.about-text h3');
        const aboutParagraphs = document.querySelectorAll('.about-text p');
        if (aboutTitle) aboutTitle.textContent = data.about.title;
        if (aboutParagraphs[0]) aboutParagraphs[0].textContent = data.about.text1;
        if (aboutParagraphs[1]) aboutParagraphs[1].textContent = data.about.text2;

        // Update stats
        const statItems = document.querySelectorAll('.stat-item h4');
        if (statItems[0]) statItems[0].textContent = data.about.stats.projects + '+';
        if (statItems[1]) statItems[1].textContent = data.about.stats.tech + '+';
        if (statItems[2]) statItems[2].textContent = data.about.stats.years + '+';
    }

    // Load Education
    if (data.education && data.education.length > 0) {
        const educationTimeline = document.querySelector('.education .timeline');
        if (educationTimeline) {
            educationTimeline.innerHTML = '';
            data.education.forEach(edu => {
                const eduItem = `
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-date">${edu.date}</div>
                        <div class="timeline-content">
                            <h3>${edu.title}</h3>
                            <h4>${edu.school}</h4>
                            <p>${edu.description}</p>
                            ${edu.tags && edu.tags.length > 0 ? `
                                <div class="timeline-tags">
                                    ${edu.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `;
                educationTimeline.innerHTML += eduItem;
            });
        }
    }

    // Load Experience
    if (data.experience && data.experience.length > 0) {
        const experienceTimeline = document.querySelector('.experience .timeline');
        if (experienceTimeline) {
            experienceTimeline.innerHTML = '';
            data.experience.forEach(exp => {
                const expItem = `
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-date">${exp.date}</div>
                        <div class="timeline-content">
                            <h3>${exp.title}</h3>
                            <h4>${exp.company}</h4>
                            <p>${exp.description}</p>
                            ${exp.responsibilities && exp.responsibilities.length > 0 ? `
                                <ul class="experience-list">
                                    ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                                </ul>
                            ` : ''}
                            ${exp.tags && exp.tags.length > 0 ? `
                                <div class="timeline-tags">
                                    ${exp.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `;
                experienceTimeline.innerHTML += expItem;
            });
        }
    }

    // Load Skills
    if (data.skills && data.skills.length > 0) {
        const skillsCategories = document.querySelector('.skills-categories');
        if (skillsCategories) {
            skillsCategories.innerHTML = '';
            data.skills.forEach(skillCategory => {
                const categoryDiv = `
                    <div class="skill-category">
                        <div class="category-header">
                            <i class="${skillCategory.icon || 'fas fa-code'}"></i>
                            <h3>${skillCategory.category}</h3>
                        </div>
                        <div class="skill-items">
                            ${skillCategory.items.map(item => `
                                <div class="skill-item">
                                    <div class="skill-info">
                                        <span>${item.name}</span>
                                        <span>${item.level}%</span>
                                    </div>
                                    <div class="skill-bar">
                                        <div class="skill-progress" style="width: ${item.level}%"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
                skillsCategories.innerHTML += categoryDiv;
            });
        }
    }

    // Load Projects
    if (data.projects && data.projects.length > 0) {
        const projectsGrid = document.querySelector('.projects-grid');
        if (projectsGrid) {
            projectsGrid.innerHTML = '';
            data.projects.forEach((project, index) => {
                // Build links HTML conditionally
                let linksHTML = `<a href="project-detail.html?id=${index + 1}" target="_blank" class="project-link" title="Detayları Gör"><i class="fas fa-external-link-alt"></i></a>`;

                if (project.githubUrl && project.githubUrl !== '#' && project.githubUrl.trim() !== '') {
                    linksHTML += `<a href="${project.githubUrl}" target="_blank" class="project-link" title="GitHub'da Gör"><i class="fab fa-github"></i></a>`;
                }

                if (project.liveUrl && project.liveUrl !== '#' && project.liveUrl.trim() !== '') {
                    linksHTML += `<a href="${project.liveUrl}" target="_blank" class="project-link" title="Canlı Demo"><i class="fas fa-globe"></i></a>`;
                }

                const projectCard = `
                    <div class="project-card" data-category="${project.category}">
                        <div class="project-image">
                            <img src="${project.image}" alt="${project.title}">
                            <div class="project-overlay">
                                <div class="project-links">
                                    ${linksHTML}
                                </div>
                            </div>
                        </div>
                        <div class="project-content">
                            <h3>${project.title}</h3>
                            <p>${project.description}</p>
                            <div class="project-tags">
                                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                `;
                projectsGrid.innerHTML += projectCard;
            });
        }
    }

    // Load Blog
    if (data.blog && data.blog.length > 0) {
        const blogGrid = document.querySelector('.blog-grid');
        if (blogGrid) {
            blogGrid.innerHTML = '';
            data.blog.forEach((blog, index) => {
                const blogCard = `
                    <article class="blog-card" data-blog-category="${blog.category}">
                        <div class="blog-image">
                            <img src="${blog.image}" alt="${blog.title}">
                            <div class="blog-category">${getCategoryName(blog.category)}</div>
                        </div>
                        <div class="blog-content">
                            <div class="blog-meta">
                                <span><i class="fas fa-calendar"></i> ${blog.date}</span>
                                <span><i class="fas fa-clock"></i> ${blog.readTime} okuma</span>
                            </div>
                            <h3>${blog.title}</h3>
                            <p>${blog.description}</p>
                            <a href="blog-detail.html?id=${index + 1}" target="_blank" class="blog-read-more">Devamını Oku <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </article>
                `;
                blogGrid.innerHTML += blogCard;
            });
        }
    }

    // Load Contact
    if (data.contact) {
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach(item => {
            const heading = item.querySelector('h4');
            if (heading && heading.textContent === 'Email') {
                item.querySelector('p').textContent = data.contact.email;
            }
            if (heading && heading.textContent === 'Konum') {
                item.querySelector('p').textContent = data.contact.location;
            }
        });
    }

    // Load Social Media - Dynamic with force refresh
    if (data.socialMedia && Array.isArray(data.socialMedia) && data.socialMedia.length > 0) {
        console.log('Loading social media from admin:', data.socialMedia);
        const heroSocialContainer = document.querySelector('.hero-content .social-links');
        const footerSocialContainer = document.querySelector('.footer-links .social-links');

        // Hero section social links
        if (heroSocialContainer) {
            heroSocialContainer.innerHTML = ''; // Clear first
            data.socialMedia.forEach(social => {
                const link = document.createElement('a');
                link.href = social.url;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.className = 'social-link';
                link.innerHTML = `<i class="${social.icon}"></i>`;
                link.title = social.name;
                heroSocialContainer.appendChild(link);
            });
            console.log('Hero social links updated');
        }

        // Footer section social links
        if (footerSocialContainer) {
            footerSocialContainer.innerHTML = ''; // Clear first
            data.socialMedia.forEach(social => {
                const link = document.createElement('a');
                link.href = social.url;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.className = 'social-link';
                link.innerHTML = `<i class="${social.icon}"></i>`;
                link.title = social.name;
                footerSocialContainer.appendChild(link);
            });
            console.log('Footer social links updated');
        }
    } else {
        console.warn('No social media data found or empty array');
    }

    // Re-observe skill bars for animation after loading
    const skillsSection = document.querySelector('.skills');
    if (skillsSection && typeof skillsObserver !== 'undefined') {
        skillsObserver.observe(skillsSection);
    }

    // Re-setup project filter listeners after loading
    setupProjectFilters();
    setupBlogFilters();

    // Setup hover effects for dynamically loaded project cards
    setupProjectCardHoverEffects();

    console.log('Portfolio data loaded successfully');
}

function getCategoryName(category) {
    const categories = {
        'web-dev': 'Web Development',
        'react': 'React',
        'css': 'CSS',
        'career': 'Career',
        'tutorial': 'Tutorial',
        'python': 'Python'
    };
    return categories[category] || category;
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadFiltersFromStorage(); // Load filters first
    loadPortfolioData(); // Then load all other data
    setupProjectCardHoverEffects(); // Setup hover effects for initially loaded cards
});
