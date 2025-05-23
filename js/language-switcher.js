document.addEventListener('DOMContentLoaded', () => {
    // Initialize language from localStorage or default to French
    let currentLang = localStorage.getItem('language') || 'fr';
    
    // Create language switcher button
    const createLanguageSwitcher = () => {
        const nav = document.querySelector('.hidden.md\\:flex');
        const languageSwitcher = document.createElement('div');
        languageSwitcher.className = 'language-switcher';
        languageSwitcher.innerHTML = `
            <button class="lang-btn">
                <i class="fas fa-globe"></i>
                <span>${currentLang.toUpperCase()}</span>
            </button>
            <div class="lang-dropdown">
                <div class="lang-option ${currentLang === 'fr' ? 'active' : ''}" data-lang="fr">
                    <img src="images/flags/fr.png" alt="Français">
                    <span>Français</span>
                </div>
                <div class="lang-option ${currentLang === 'en' ? 'active' : ''}" data-lang="en">
                    <img src="images/flags/eng.png" alt="English">
                    <span>English</span>
                </div>
            </div>
        `;
        nav.appendChild(languageSwitcher);

        // Add mobile version
        const mobileNav = document.querySelector('.mobile-menu');
        const mobileLanguageSwitcher = languageSwitcher.cloneNode(true);
        mobileNav.appendChild(mobileLanguageSwitcher);
    };

    // Toggle language dropdown
    const toggleDropdown = (e) => {
        const dropdown = e.currentTarget.nextElementSibling;
        dropdown.classList.toggle('active');
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.language-switcher')) {
                dropdown.classList.remove('active');
            }
        });
    };

    // Change language
    const changeLanguage = (lang) => {
        if (lang === currentLang) return;
        
        currentLang = lang;
        localStorage.setItem('language', lang);
        
        // Update UI
        document.querySelectorAll('.lang-btn span').forEach(span => {
            span.textContent = lang.toUpperCase();
        });
        
        document.querySelectorAll('.lang-option').forEach(option => {
            option.classList.toggle('active', option.dataset.lang === lang);
        });

        // Translate content
        translateContent();
    };

    // Translate content
    const translateContent = () => {
        const elements = document.querySelectorAll('[data-translate]');
        
        elements.forEach(element => {
            const key = element.dataset.translate;
            const keys = key.split('.');
            let translation = translations[currentLang];
            
            // Navigate through nested keys
            for (const k of keys) {
                translation = translation[k];
                if (!translation) break;
            }
            
            if (translation) {
                // Add animation class
                element.classList.add('translated-content');
                
                // Update content
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else if (element.tagName === 'SELECT') {
                    Array.from(element.options).forEach(option => {
                        const optionKey = option.dataset.translate;
                        if (optionKey) {
                            const optionKeys = optionKey.split('.');
                            let optionTranslation = translations[currentLang];
                            for (const k of optionKeys) {
                                optionTranslation = optionTranslation[k];
                                if (!optionTranslation) break;
                            }
                            if (optionTranslation) {
                                option.textContent = optionTranslation;
                            }
                        }
                    });
                } else {
                    element.textContent = translation;
                }
                
                // Remove animation class after animation ends
                element.addEventListener('animationend', () => {
                    element.classList.remove('translated-content');
                }, { once: true });
            }
        });
    };

    // Initialize
    createLanguageSwitcher();
    
    // Add event listeners
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', toggleDropdown);
    });
    
    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', (e) => {
            const lang = e.currentTarget.dataset.lang;
            changeLanguage(lang);
        });
    });

    // Initial translation
    translateContent();
}); 