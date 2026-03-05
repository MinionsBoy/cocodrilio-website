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

    // Set copyright year
    const copyrightElements = document.querySelectorAll('[data-content="copyright"]');
    copyrightElements.forEach(el => {
        if (config.site && config.site.established) {
            el.textContent = `© ${config.site.established} COCODRILIO.`;
        }
    });
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
document.addEventListener('DOMContentLoaded', function() {
    initializeContent();
    setLanguage('en');
});