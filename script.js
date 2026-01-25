// Sélection des éléments du modal
const modal = document.getElementById('book-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalSummary = document.getElementById('modal-summary');
const modalPrice = document.getElementById('modal-price');
const closeBtn = document.querySelector('.modal .close');
const modalBuyBtn = document.getElementById('modal-buy-btn');

// Ton numéro WhatsApp
const whatsappNumber = '+21656187082';

// Tableau des livres avec leurs infos
const books = [
  {
    img: 'images/ChatGPT Image 19 janv. 2026, 15_43_00.png',
    title: 'أحمد ومدينة الغيوم',
    summary: 'Une aventure magique où Ahmed voyage dans le temps.',
    price: '48 dt',
    id: '1'
  },
  {
    img: 'images/ChatGPT Image 19 janv. 2026, 14_49_42.png',
    title: 'أحمد مع القراصنة',
    summary: 'Ahmed vit une aventure intelligente avec des pirates.',
    price: '48 dt',
    id: '2'
  },
  {
    img: 'images/Gemini_Generated_Image_mvht8kmvht8kmvht.png',
    title: 'أحمد وبلّورة الزمن',
    summary: 'Ahmed voyage à travers différentes époques.',
    price: '48 dt',
    id: '3'
  },
  {
    img: 'images/Gemini_Generated_Image_akyuk8akyuk8akyu.png',
    title: 'أحمد مبرمج المستقبل',
    summary: 'Ahmed apprend la programmation dès son enfance.',
    price: '48 dt',
    id: '4'
  },
  {
    img: 'images/Gemini_Generated_Image_2oz26e2oz26e2oz2.png',
    title: 'أحمد الطبيب الصغير',
    summary: 'Ahmed découvre le monde médical.',
    price: '48 dt',
    id: '5'
  },
  {
    img: 'images/Gemini_Generated_Image_3stgiw3stgiw3stg.png',
    title: 'أحمد و كرة الأحلام',
    summary: 'Ahmed poursuit son rêve de footballeur.',
    price: '48 dt',
    id: '6'
  },
  {
    img: 'images/Gemini_Generated_Image_bi8rq7bi8rq7bi8r.png',
    title: 'ريم ومرآة الأمنيات',
    summary: 'Une belle histoire sur la confiance en soi.',
    price: '48 dt',
    id: '7'
  },
  {
    img: 'images/Gemini_Generated_Image_9jvup39jvup39jvu.png',
    title: 'أحمد والروبوت الصغير',
    summary: 'Ahmed apprend la robotique.',
    price: '48 dt',
    id: '8'
  },
  {
    img: 'images/Gemini_Generated_Image_omvl1somvl1somvl.png',
    title: 'أحمد والعائلة بلا هواتف',
    summary: 'Une journée sans écrans pleine de bonheur.',
    price: '48 dt',
    id: '9'
  }
];

// Sélection de toutes les cartes
const bookCards = document.querySelectorAll('.book-card');

// Ouvrir le modal avec infos dynamiques et lien WhatsApp
bookCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        const book = books[index];
        modalImg.src = book.img;
        modalTitle.textContent = book.title;
        modalSummary.textContent = book.summary;
        modalPrice.textContent = book.price;

        // Meta Pixel - Track ViewContent (vue d'un produit spécifique)
        if (typeof fbq !== 'undefined') {
            fbq('track', 'ViewContent', {
                content_name: book.title,
                content_ids: [book.id],
                content_type: 'product',
                value: 48,
                currency: 'TND'
            });
        }

        // Générer lien WhatsApp pour le livre spécifique
        const message = `Bonjour! Je veux acheter le livre "${book.title}" au prix de ${book.price}.`;
        const url = `https://wa.me/${whatsappNumber.replace(/\D/g,'')}?text=${encodeURIComponent(message)}`;
        modalBuyBtn.href = url;

        modal.style.display = 'block';
    });
});

// Meta Pixel - Track AddToCart quand l'utilisateur clique sur le bouton Acheter
modalBuyBtn.addEventListener('click', function() {
    const bookTitle = modalTitle.textContent;
    const bookId = books.find(b => b.title === bookTitle)?.id || '0';
    
    if (typeof fbq !== 'undefined') {
        fbq('track', 'AddToCart', {
            content_name: bookTitle,
            content_ids: [bookId],
            content_type: 'product',
            value: 48,
            currency: 'TND'
        });
    }
});

// Fermer le modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fermer si clic à l'extérieur
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// WhatsApp Floating Button Functionality
const whatsappFloat = document.getElementById('whatsapp-float');

// Function to generate WhatsApp message for general inquiry
function generateWhatsAppMessage() {
    const defaultMessage = "Bonjour! Je suis intéressé(e) par vos livres pour enfants. Pouvez-vous m'aider à choisir?";
    return `https://wa.me/${whatsappNumber.replace(/\D/g,'')}?text=${encodeURIComponent(defaultMessage)}`;
}

// Function to generate WhatsApp message for specific book
function generateWhatsAppMessageForBook(bookTitle, bookPrice) {
    const message = `Bonjour! Je veux acheter le livre "${bookTitle}" au prix de ${bookPrice}.`;
    return `https://wa.me/${whatsappNumber.replace(/\D/g,'')}?text=${encodeURIComponent(message)}`;
}

// Set WhatsApp link for floating button
whatsappFloat.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Meta Pixel - Track Contact button click
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Contact');
    }
    
    window.open(generateWhatsAppMessage(), '_blank');
});

// Smooth scroll effect for WhatsApp button on scroll
let lastScrollTop = 0;
let scrollTimeout;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Hide button when scrolling down, show when scrolling up
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down and past 100px
        whatsappFloat.style.transform = 'translateY(100px)';
    } else {
        // Scrolling up
        whatsappFloat.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
    
    // Clear any existing timeout
    clearTimeout(scrollTimeout);
    
    // Smooth reappearance when scrolling stops
    scrollTimeout = setTimeout(() => {
        whatsappFloat.style.transform = 'translateY(0)';
    }, 150);
});

// Optional: Add keyboard shortcut for WhatsApp (Alt + W)
document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key === 'w') {
        e.preventDefault();
        window.open(generateWhatsAppMessage(), '_blank');
        
        // Visual feedback
        whatsappFloat.style.animation = 'none';
        setTimeout(() => {
            whatsappFloat.style.animation = 'pulse 2s infinite, bounce 3s infinite';
        }, 100);
    }
});

// Make sure WhatsApp button is visible on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        whatsappFloat.style.opacity = '1';
    }, 500);
});

// Add touch feedback for mobile
whatsappFloat.addEventListener('touchstart', () => {
    whatsappFloat.style.transform = 'scale(0.95)';
});

whatsappFloat.addEventListener('touchend', () => {
    whatsappFloat.style.transform = 'scale(1)';
});

// Meta Pixel - Track scroll depth (engagement)
let scrollDepthTracked = {
    25: false,
    50: false,
    75: false,
    100: false
};

window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    
    if (typeof fbq !== 'undefined') {
        if (scrolled >= 25 && !scrollDepthTracked[25]) {
            fbq('trackCustom', 'ScrollDepth25');
            scrollDepthTracked[25] = true;
        }
        if (scrolled >= 50 && !scrollDepthTracked[50]) {
            fbq('trackCustom', 'ScrollDepth50');
            scrollDepthTracked[50] = true;
        }
        if (scrolled >= 75 && !scrollDepthTracked[75]) {
            fbq('trackCustom', 'ScrollDepth75');
            scrollDepthTracked[75] = true;
        }
        if (scrolled >= 100 && !scrollDepthTracked[100]) {
            fbq('trackCustom', 'ScrollDepth100');
            scrollDepthTracked[100] = true;
        }
    }
});

// Meta Pixel - Track time on page (engagement)
let timeOnPage = 0;
setInterval(() => {
    timeOnPage += 10;
    
    if (typeof fbq !== 'undefined') {
        // Track at 30 seconds
        if (timeOnPage === 30) {
            fbq('trackCustom', 'TimeOnPage30Seconds');
        }
        // Track at 1 minute
        if (timeOnPage === 60) {
            fbq('trackCustom', 'TimeOnPage1Minute');
        }
        // Track at 3 minutes
        if (timeOnPage === 180) {
            fbq('trackCustom', 'TimeOnPage3Minutes');
        }
    }
}, 10000); // Check every 10 seconds
