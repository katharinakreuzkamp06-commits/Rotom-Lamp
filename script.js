const featureRows = document.querySelectorAll('.feature-row');
const heroVideo = document.querySelector('.hero-video');
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, {
    threshold: 0.2
});

featureRows.forEach(row => observer.observe(row));

// Observe accessory images so they slide in when visible
const accessoryImages = document.querySelectorAll('.accessories-row img');
accessoryImages.forEach(img => observer.observe(img));

// Observe animated images (description and student images)
const animatedImages = document.querySelectorAll('.animate-image');
animatedImages.forEach(img => observer.observe(img));

if (heroVideo) {
    const startVideo = () => heroVideo.play().catch(() => {});

    heroVideo.addEventListener('canplay', startVideo, { once: true });
    startVideo();
}

if (navbar && menuToggle) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navbar.classList.toggle('menu-open');

        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        menuToggle.setAttribute('aria-label', isOpen ? 'Navigation schließen' : 'Navigation öffnen');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Navigation öffnen');
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
            navbar.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Navigation öffnen');
        }
    });
}

const descriptionContainer = document.getElementById('description-container');
const descriptionTabs = document.querySelectorAll('.description-tab');
const descriptionImage = document.querySelector('.description-image');
const descriptionKicker = document.querySelector('.description-kicker');
const descriptionHeadline = document.querySelector('.description-info h2');
const descriptionText = document.querySelector('.description-info p:last-child');

const descriptionContent = {
    case: {
        image: 'Schweben.png',
        imageAlt: 'Rotom-Lampe im Schwebe-Modus',
        kicker: 'Schweben',
        headline: 'Levitationssystem für perfekte Schwebefreiheit',
        text: 'Die Lampe nutzt präzise elektromagnetische Kräfte, damit der Körper stabil und nahezu berührungslos über der Basis schwebt.'
    },
    window: {
        image: 'Dimmen.png',
        imageAlt: 'Rotom-Lampe im Dimmen-Modus',
        kicker: 'Dimmen',
        headline: 'Sanfte Helligkeitsregelung für jede Stimmung',
        text: 'Mit der Dimmer-Funktion passt du die Lichtintensität stufenlos an, damit die Atmosphäre jederzeit perfekt bleibt.'
    },
    handles: {
        image: 'InduktivesLeuchten.png',
        imageAlt: 'Rotom-Lampe mit induktivem Leuchten',
        kicker: 'Induktives Leuchten',
        headline: 'Induktive Lichtsteuerung ohne sichtbare Kabel',
        text: 'Das Licht wird elegant und kabellos über das Design des Produkts gesteuert, ohne den minimalistischen Look zu beeinträchtigen.'
    },
    seal: {
        image: 'PremiumMaterialien.png',
        imageAlt: 'Rotom-Lampe mit Premium-Materialien',
        kicker: 'Premium Materialien',
        headline: 'Hochwertige Materialien für langlebige Schönheit',
        text: 'Die Kombination aus edlen Oberflächen und robusten Komponenten sorgt für ein luxuriöses, langlebiges Produktgefühl.'
    }
};

if (descriptionContainer && descriptionTabs.length && descriptionImage && descriptionKicker && descriptionHeadline && descriptionText) {
    descriptionTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const selectedPart = tab.dataset.part;
            const selectedContent = descriptionContent[selectedPart];

            descriptionContainer.dataset.part = selectedPart;
            descriptionImage.src = selectedContent.image;
            descriptionImage.alt = selectedContent.imageAlt;
            descriptionKicker.textContent = selectedContent.kicker;
            descriptionHeadline.textContent = selectedContent.headline;
            descriptionText.textContent = selectedContent.text;

            descriptionTabs.forEach(item => {
                const isActive = item === tab;
                item.classList.toggle('active', isActive);
                item.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });
        });
    });
}

// The zoom popup is no longer used for the description image.
