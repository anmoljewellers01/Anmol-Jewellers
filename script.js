// script.js – Full functionality with easy product addition

// ===== PRODUCT DATA – EASILY ADD NEW PRODUCTS HERE =====
// Just copy one block and change id, name, price, desc, category, image.
const products = [
  // Necklace / Haar
  { id:1, name:"Gold Plated Haar", price:1299, desc:"Long Necklace with pendant, party look.", category:"Necklace", image:"imagees/G300.png" },
  { id:2, name:"Mang Tika Set", price:1599, desc:"Necklace, Earrings and tika set.", category:"Necklace", image:"imagees/G301.png", },
  { id:3, name:"Choker Necklace", price:1349, desc:"Close-fitting design, light and elegant.", category:"Necklace", image:"imagees/G302.png" },

  // Rani Haar
  { id:4, name:"Gold Rani Haar with Earring Set", price:1650, desc:"Traditional design, best pieces set, gold plated.", category:"Rani Haar", image:"imagees/K401.png" },
  { id:5, name:"Rani Haar", price:1999, desc:"Lightweight and durable for wedding wear.", category:"Rani Haar", image:"imagees/K402.png" },
  { id:6, name:"Rani Haar  + Earring", price:1800, desc:"Modern Rani Haar and Earing set.", category:"Rani Haar", image:"imagees/K403.png" },

  // Bangles
  { id:7, name:"Gold Choodi Set", price:1200, desc:"Traditional design, 4 pieces set, gold plated.", category:"bangles", image:"imagees/H100.png" },
  { id:8, name:"Patli Choodiyan (12 pcs)", price:999, desc:"Lightweight and durable for everyday wear.", category:"bangles", image:"imagees/H101.png" },
  { id:9, name:"Bracelet + Choodi Combo", price:850, desc:"Modern kada and bangle set.", category:"bangles", image:"imagees/H108.png" },

  // Mangalsutra
  { id:10, name:"Simple Mangalsutra", price:1299, desc:"Gold plated with black beads, daily wear.", category:"mangalsutra", image:"imagees/S200.png" },
  { id:11, name:"Diamond Mangalsutra", price:1300, desc:"Studded with small stones.", category:"mangalsutra", image:"imagees/S201.png" },
  { id:12, name:"Heavy Mangalsutra", price:1450, desc:"Festival and wedding design.", category:"mangalsutra", image:"imagees/S203.png" },
  {id:13, name:"Heavy Mangalsutra", price:1350, desc:"Festival Daily use", category:"mangalsutra", image:"imagees/S204.png" },
  // Earrings / Nacklace

  { id:14, name:"Simple Earring", price:499, desc:"Gold plated  daily wear.", category:"Earring", image:"imagees/N502.png" },
  { id:15, name:"Earrings", price:599, desc:"Studded with small stones.", category:"Earring", image:"imagees/N505.png" },
  { id:16, name:"Heavy Earrings", price:550, desc:"Festival and wedding design.", category:"Earring", image:"imagees/N507.png" },
  {id:17, name:"beautyfull Earrings", price:699, desc:" Daily use", category:"Earring", image:"imagees/N507.png" },
  ]

// ===== CART =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Pulse the 3D star
function pulseStar() {
  const star = document.getElementById('star3d');
  if (star) {
    star.classList.add('star-pulse');
    setTimeout(() => star.classList.remove('star-pulse'), 500);
  }
}

// Render products by category
function renderProducts() {
  const ringsDiv = document.getElementById('Rani Haar-products');
  const banglesDiv = document.getElementById('bangles-products');
  const mangalsutraDiv = document.getElementById('mangalsutra-products');
  const NecklaceDiv = document.getElementById('Necklace-products');
  const EarringDiv = document.getElementById('Earring-products');

  if (ringsDiv) ringsDiv.innerHTML = '';
  if (banglesDiv) banglesDiv.innerHTML = '';
  if (mangalsutraDiv) mangalsutraDiv.innerHTML = '';
  if (NecklaceDiv) NecklaceDiv.innerHTML = '';
  if (EarringDiv) EarringDiv.innerHTML = '';

  products.forEach(p => {
    const card = `
      <div class="col-md-4 col-6">
        <div class="product-card" onclick="openQuickView(${p.id})">
          <img src="${p.image}" class="product-img" alt="${p.name}">
          <div class="product-body">
            <h3 class="product-title">${p.name}</h3>
            <div class="product-price">₹${p.price.toLocaleString()}</div>
            <p class="product-desc">${p.desc}</p>
            <button class="btn btn-gold btn-sm w-100 mb-2 add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${p.id}, event)">Add to Cart</button>
            <button class="btn btn-wa btn-sm w-100" onclick="event.stopPropagation(); orderNow(${p.id})"><i class="bi bi-whatsapp"></i> WhatsApp</button>
          </div>
        </div>
      </div>
    `;
    if (p.category === 'Rani Haar' && ringsDiv) ringsDiv.innerHTML += card;
    else if (p.category === 'bangles' && banglesDiv) banglesDiv.innerHTML += card;
    else if (p.category === 'mangalsutra' && mangalsutraDiv) mangalsutraDiv.innerHTML += card;
    else if (p.category === 'Necklace' && NecklaceDiv) NecklaceDiv.innerHTML += card;
    else if (p.category === 'Earring' && EarringDiv) EarringDiv.innerHTML += card;

  });
}

// Filter category (simple alert for demo)
function filterCategory(cat) {
  window.location.href = '#shop';
  alert(`Showing ${cat} products. Scroll to see the section.`);
}

// Add to cart
function addToCart(id, event) {
  event.stopPropagation();
  // Button animation
  const btn = event.target;
  btn.classList.add('cart-animation');
  setTimeout(() => btn.classList.remove('cart-animation'), 300);

  // Bounce cart icon
  const cartIcon = document.querySelector('.cart-icon');
  cartIcon.classList.add('bounce');
  setTimeout(() => cartIcon.classList.remove('bounce'), 300);

  const prod = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) existing.qty += 1;
  else { cart.push({...prod, qty:1}); }
  updateCart();
  pulseStar();

  setTimeout(() => {
    new bootstrap.Offcanvas(document.getElementById('cartOffcanvas')).show();
  }, 150);
}

// Remove from cart
function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCart();
  pulseStar();
}

// Change quantity
function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += delta;
    if (item.qty < 1) removeFromCart(id);
    else updateCart();
    pulseStar();
  }
}

// Update cart display
function updateCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  const cartDiv = document.getElementById('cart-items');
  if (!cartDiv) return;
  cartDiv.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    cartDiv.innerHTML += `
      <div class="cart-item">
        <div><strong>${item.name}</strong> x${item.qty} – ₹${(item.price*item.qty).toLocaleString()}</div>
        <div>
          <button class="cart-qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
          <button class="cart-qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
          <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      </div>`;
  });
  document.getElementById('cart-total').innerText = total.toLocaleString();

  // Recommendations
  const recDiv = document.getElementById('cart-recommendations');
  if (recDiv) {
    let other = products.filter(p => !cart.some(c => c.id === p.id)).slice(0,2);
    recDiv.innerHTML = other.map(p => `
      <div class="col-6">
        <img src="${p.image}" class="w-100">
        <small>${p.name}</small>
        <button class="btn btn-sm btn-gold w-100" onclick="addToCart(${p.id}, event)">Add</button>
      </div>`).join('');
  }
}

// Order on WhatsApp
function orderNow(id) {
  const prod = products.find(p => p.id === id);
  const msg = `Hello, I'm interested in: ${prod.name} (₹${prod.price}). Please confirm availability.`;
  window.open(`https://wa.me/+918006672595?text=${encodeURIComponent(msg)}`, '_blank');
}

// Checkout
function checkout() {
  if (cart.length === 0) { alert('Cart empty'); return; }
  const name = prompt('Your name:') || 'Customer';
  const address = prompt('Delivery address:') || 'Not provided';
  let itemsList = '';
  cart.forEach(i => { itemsList += `${i.name} (x${i.qty}) - ₹${i.price*i.qty}\n`; });
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const msg = `New Order from ${name}\nAddress: ${address}\nItems:\n${itemsList}\nTotal: ₹${total}`;
  window.open(`https://wa.me/+918006672595?text=${encodeURIComponent(msg)}`, '_blank');
}

// Search
function searchProducts() {
  const term = document.getElementById('searchInput').value.toLowerCase();
  if (!term) return;
  const results = products.filter(p => p.name.toLowerCase().includes(term) || p.desc.toLowerCase().includes(term));
  alert(`Found ${results.length} products. Check console.`);
  console.table(results);
}

// Quick View Modal
function openQuickView(id) {
  const prod = products.find(p => p.id === id);
  document.getElementById('modalTitle').innerText = prod.name;
  document.getElementById('modalImage').src = prod.image;
  document.getElementById('modalName').innerText = prod.name;
  document.getElementById('modalDesc').innerText = prod.desc;
  document.getElementById('modalPrice').innerText = prod.price.toLocaleString();

  document.getElementById('modalAddToCart').onclick = (e) => {
    e.preventDefault();
    addToCart(id, { target: document.getElementById('modalAddToCart') });
    bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
  };
  document.getElementById('modalWhatsApp').onclick = (e) => {
    e.preventDefault();
    orderNow(id);
    bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
  };

  new bootstrap.Modal(document.getElementById('productModal')).show();
}

// Subscribe newsletter
function subscribeNewsletter() {
  const email = document.getElementById('subscribeEmail').value.trim();
  if (!email) return alert('Please enter your email.');
  if (!/^\S+@\S+\.\S+$/.test(email)) return alert('Enter a valid email.');
  alert('Thank you! You are now subscribed.');
  document.getElementById('subscribeEmail').value = '';
}

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

function showSlide(index) {
  slides.forEach((s, i) => {
    s.classList.toggle('active', i === index);
  });
}

if (slides.length) {
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 1500);
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });
  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (window.scrollY > 50) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// Initial render
window.onload = function() {
  renderProducts();
  updateCart();
};
