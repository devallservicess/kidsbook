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
    price: '12€'
  },
  {
    img: 'images/ChatGPT Image 19 janv. 2026, 14_49_42.png',
    title: 'أحمد مع القراصنة',
    summary: 'Ahmed vit une aventure intelligente avec des pirates.',
    price: '12€'
  },
  {
    img: 'images/Gemini_Generated_Image_mvht8kmvht8kmvht.png',
    title: 'أحمد وبلّورة الزمن',
    summary: 'Ahmed voyage à travers différentes époques.',
    price: '12€'
  },
  {
    img: 'images/Gemini_Generated_Image_akyuk8akyuk8akyu.png',
    title: 'أحمد مبرمج المستقبل',
    summary: 'Ahmed apprend la programmation dès son enfance.',
    price: '13€'
  },
  {
    img: 'images/Gemini_Generated_Image_2oz26e2oz26e2oz2.png',
    title: 'أحمد الطبيب الصغير',
    summary: 'Ahmed découvre le monde médical.',
    price: '12€'
  },
  {
    img: 'images/Gemini_Generated_Image_3stgiw3stgiw3stg.png',
    title: 'أحمد و كرة الأحلام',
    summary: 'Ahmed poursuit son rêve de footballeur.',
    price: '15€'
  },
  {
    img: 'images/Gemini_Generated_Image_bi8rq7bi8rq7bi8r.png',
    title: 'ريم ومرآة الأمنيات',
    summary: 'Une belle histoire sur la confiance en soi.',
    price: '12€'
  },
  {
    img: 'images/Gemini_Generated_Image_9jvup39jvup39jvu.png',
    title: 'أحمد والروبوت الصغير',
    summary: 'Ahmed apprend la robotique.',
    price: '12€'
  },
  {
    img: 'images/Gemini_Generated_Image_omvl1somvl1somvl.png',
    title: 'أحمد والعائلة بلا هواتف',
    summary: 'Une journée sans écrans pleine de bonheur.',
    price: '12€'
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

        // Générer lien WhatsApp
        const message = `Bonjour! Je veux acheter le livre "${book.title}" au prix de ${book.price}.`;
        const url = `https://wa.me/${whatsappNumber.replace(/\D/g,'')}?text=${encodeURIComponent(message)}`;
        modalBuyBtn.href = url;

        modal.style.display = 'block';
    });
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


