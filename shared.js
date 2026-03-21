/* ── SHARED DATA & UTILITIES ── */
const PRODUCTS = [
  { id:1,  name:'Void Oversized Tee',       cat:'Tops',       price:2499,  emoji:'🖤', desc:'A 100% organic cotton tee with an intentionally oversized silhouette. Pre-washed for a lived-in feel from the very first wear. Drop shoulder seams, ribbed crew neck, and a slightly elongated back hem.',       sizes:['XS','S','M','L','XL'], colors:['Onyx','Slate','Bone'],   featured:true  },
  { id:2,  name:'Mineral Linen Trousers',   cat:'Bottoms',    price:5999,  emoji:'🤍', desc:'Hand-loomed linen with a wide, relaxed leg. Elastic waist, deep side seam pockets, and an ankle-grazing hem. Gets softer and more beautiful with every wash.',                                            sizes:['XS','S','M','L'],       colors:['Ecru','Stone','Rust'],   featured:true  },
  { id:3,  name:'Dusk Knit Cardigan',       cat:'Layers',     price:7499,  emoji:'🌑', desc:'A loose-knit merino wool cardigan with dropped shoulders, ribbed cuffs, and a clean V-neck. The kind of piece you reach for every single day.',                                                            sizes:['S','M','L','XL'],       colors:['Charcoal','Ivory'],      featured:true  },
  { id:4,  name:'Silk Slip Dress',          cat:'Dresses',    price:8999,  emoji:'🪨', desc:'Bias-cut recycled silk slip. Adjustable spaghetti straps and a fluid hem that moves like water. Wear alone or layered under a knit or blazer.',                                                             sizes:['XS','S','M','L'],       colors:['Fog','Obsidian','Blush'],featured:true  },
  { id:5,  name:'Cargo Wide-Leg Pants',     cat:'Bottoms',    price:6499,  emoji:'⬛', desc:'Technical cotton twill with multiple utility pockets. Relaxed through the thigh and slightly tapered at the ankle. A utilitarian foundation that pairs with everything.',                                   sizes:['S','M','L','XL'],       colors:['Black','Olive','Sand'], featured:false },
  { id:6,  name:'Raw Hem Denim Jacket',     cat:'Layers',     price:9999,  emoji:'🔲', desc:'Unfinished hem denim jacket in a vintage 12oz Japanese selvedge wash. Chest pockets, clean interior, and a boxy cut that looks intentional on every body.',                                                sizes:['XS','S','M','L','XL'], colors:['Indigo','Black'],        featured:false },
  { id:7,  name:'Minimalist Bucket Hat',    cat:'Accessories',price:2299,  emoji:'◉',  desc:'Structured cotton bucket hat with a subtle tonal logo embroidered at the front. Packable, UV-protective, and genuinely stylish.',                                                                           sizes:['One Size'],             colors:['Black','Beige','Olive'], featured:false },
  { id:8,  name:'Woven Leather Belt',       cat:'Accessories',price:3499,  emoji:'◈',  desc:'Handwoven full-grain leather belt with a matte gunmetal pin buckle. Develops a rich patina over time and ages better than anything else in your wardrobe.',                                                 sizes:['S/M','M/L'],            colors:['Black','Tan'],           featured:false },
  { id:9,  name:'Ribbed Cami',              cat:'Tops',       price:1899,  emoji:'🩶', desc:'Fine-rib stretch cotton cami with clean straps and a slim, body-skimming fit. The perfect layer base — wear under an open shirt, a blazer, or alone.',                                                     sizes:['XS','S','M','L'],       colors:['White','Black','Clay'],  featured:false },
  { id:10, name:'Structured Canvas Tote',   cat:'Accessories',price:5499,  emoji:'🖤', desc:'Heavyweight canvas tote with reinforced leather handles and contrast linen interior. Holds a 15" laptop, a full shop, or everything you need for the day.',                                                  sizes:['One Size'],             colors:['Ecru','Black'],          featured:false },
];

function getCart() {
  try { return JSON.parse(localStorage.getItem('obsidian_cart') || '[]'); } catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem('obsidian_cart', JSON.stringify(cart));
}
function cartCount() {
  return getCart().reduce((s, i) => s + i.qty, 0);
}
function addToCart(productId, size, color) {
  const cart = getCart();
  const existing = cart.find(i => i.id === productId && i.size === size && i.color === color);
  if (existing) existing.qty++;
  else {
    const p = PRODUCTS.find(x => x.id === productId);
    cart.push({ ...p, size, color, qty: 1 });
  }
  saveCart(cart);
}
function cartTotal() {
  return getCart().reduce((s, i) => s + i.price * i.qty, 0);
}
function updateNavCount() {
  const el = document.getElementById('cart-count');
  if (el) el.textContent = cartCount();
}
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2400);
}
