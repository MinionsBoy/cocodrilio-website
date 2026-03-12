// script.js - JavaScript functionality for COCODRILIO website

function initializeContent() {
    // Set page title from config
    if (config.site && config.site.title) {
        document.title = config.site.title;
    }

    // Set meta description from config
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && config.site && config.site.description) {
        metaDesc.setAttribute('content', config.site.description);
    }

    // Set image sources from config
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        const srcKey = img.getAttribute('data-src');
        if (config.images && config.images[srcKey]) {
            img.src = config.images[srcKey];
        }
    });

    // Set content from config
    const contentElements = document.querySelectorAll('[data-content]');
    contentElements.forEach(el => {
        const contentKey = el.getAttribute('data-content');
        if (config.site && config.site[contentKey]) {
            el.textContent = config.site[contentKey];
        }
    });

    // Set established year
    const estElements = document.querySelectorAll('[data-content="established"]');
    estElements.forEach(el => {
        if (config.site && config.site.established) {
            el.textContent = config.site.established;
        }
    });

    // Set hero description
    const descElements = document.querySelectorAll('[data-content="description"]');
    descElements.forEach(el => {
        if (config.site && config.site.description) {
            el.textContent = config.site.description;
        }
    });

    // Set social media links
    if (config.site && config.site.socials) {
        const socialLinks = document.querySelectorAll('[data-social]');
        socialLinks.forEach(link => {
            const platform = link.getAttribute('data-social');
            if (config.site.socials[platform]) {
                link.href = config.site.socials[platform];
            }
        });
    }

    // Set contact form action
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        // Initialize EmailJS (replace with your public key)
        emailjs.init("wCxS1jjJM0fvtYAEa");
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            emailjs.send("service_ryr882u", "template_k52lz38", {
                from_name: name,
                from_email: email,
                service: service,
                message: message,
                to_email: config.site.email
            }).then(function(response) {
                alert("Message sent successfully!");
                contactForm.reset();
            }, function(error) {
                alert("Failed to send message: " + error.text);
            });
        });
    }

    // Set copyright year
    const copyrightElements = document.querySelectorAll('[data-content="copyright"]');
    copyrightElements.forEach(el => {
        if (config.site && config.site.established) {
            el.textContent = `© ${config.site.established} COCODRILIO.`;
        }
    });
}

function buildCarouselFromConfig() {
    const wrapper = document.querySelector('.carousel-item-wrapper');
    if (!wrapper) return;

    const configUrls = Array.isArray(config.carousel_images)
        ? config.carousel_images.map((entry) => {
            const value = String(entry || '').trim();
            if (!value) return '';
            if (/^(https?:|data:|\/|images\/)/i.test(value)) {
                return value;
            }
            return `images/gallery/${value}`;
        }).filter(Boolean)
        : [];

    const imageUrls = configUrls;

    if (imageUrls.length === 0) {
        console.warn('No images found in config.carousel_images.');
        return;
    }

    // update num-elements variable
    wrapper.style.setProperty('--_num-elements', imageUrls.length);

    // clear previously generated items and ground element
    const oldNodes = wrapper.querySelectorAll('.carousel-item, .carousel-ground');
    oldNodes.forEach((node) => node.remove());

    // build new items from gallery listing or config fallback
    imageUrls.forEach((url, index) => {
        const safeUrl = /^https?:|^data:|^\//i.test(url) ? url : encodeURI(url);
        const li = document.createElement('li');
        li.className = 'carousel-item';
        li.setAttribute('tabindex', '0');
        li.dataset.imageUrl = safeUrl;
        li.style.setProperty('--_index', index + 1);
        li.style.setProperty('--_image-url', `url('${safeUrl}')`);
        // Fallback for browsers/cases where CSS variable url() isn't applied as expected.
        li.style.backgroundImage = `url('${safeUrl}')`;
        wrapper.appendChild(li);
    });

    // add ground element back at the end
    const ground = document.createElement('li');
    ground.className = 'carousel-ground';
    wrapper.appendChild(ground);
}


function setLanguage(lang) {
    // Update Text Content
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (config.translations[lang] && config.translations[lang][key]) {
            el.textContent = config.translations[lang][key];
        }
    });

    // Update Active Button State
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.getElementById(`btn-${lang}`);
    if(activeBtn) activeBtn.classList.add('active');

    // Set HTML lang attribute
    document.documentElement.lang = lang;
}

// Initialize default language when DOM is loaded
function setupCarouselPreview() {
    const items = document.querySelectorAll('.carousel-item');
    // create overlay container once
    let overlay = document.getElementById('carousel-preview-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'carousel-preview-overlay';
        overlay.style.display = 'none';
        overlay.addEventListener('click', () => {
            overlay.style.display = 'none';
            overlay.innerHTML = '';
        });
        document.body.appendChild(overlay);
    }

    items.forEach(item => {
        if (item.dataset.previewBound === '1') {
            return;
        }
        item.dataset.previewBound = '1';

        item.addEventListener('click', () => {
            const url = item.dataset.imageUrl;
            if (!url) return;
            const img = document.createElement('img');
            img.alt = '';
            img.onload = () => {
                overlay.style.display = 'flex';
            };
            img.onerror = () => {
                overlay.innerHTML = '<p style="color:#fff;font-family:Inter,sans-serif">Preview failed to load image</p>';
                overlay.style.display = 'flex';
            };
            img.src = url;
            overlay.innerHTML = '';
            overlay.appendChild(img);
            if (img.complete) {
                overlay.style.display = 'flex';
            }
        });
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initializeContent();
    setLanguage('en');
    buildCarouselFromConfig();
    setupCarouselPreview();
});