const products=[
{id:1,name:'كشري أبو حنفي',cat:'كشري',desc:'كشري بطبقات غنية وإضافات على مزاجك.',img:'koshary-cups.jpg',label:'الأكثر طلبًا'},
{id:2,name:'كشري ميكس',cat:'كشري',desc:'تشكيلة كشري مناسبة لعشاق الطعم المصري.',img:'koshary-variety.jpg',label:'اختيار مميز'},
{id:3,name:'مكرونة بالصوص الأبيض',cat:'مكرونات',desc:'صوص كريمي مع قطع دجاج مشوية.',img:'pasta-white.jpg',label:'كريمي'},
{id:4,name:'مكرونة بالجبنة',cat:'مكرونات',desc:'مكرونة بالجبنة بطبقة ذهبية شهية.',img:'pasta-cheese.jpg',label:'مميز'},
{id:5,name:'طبق مشويات مشكل',cat:'مشويات',desc:'تشكيلة مشويات متقدمة مع الأرز.',img:'mixed-grill.jpg',label:'على الفحم'},
{id:6,name:'ريش ولحمة مشوية',cat:'مشويات',desc:'اختيار لمحبي المشويات بطعم غني.',img:'grilled-meat.jpg',label:'من الجريل'},
{id:7,name:'وجبة فراخ مع الأرز',cat:'مشويات',desc:'فراخ متبلة مع أرز أصفر شهي.',img:'yellow-rice.jpg',label:'وجبة'},
{id:8,name:'سندوتشات متنوعة',cat:'سندوتشات',desc:'سندوتشات طازة مناسبة لأي وقت.',img:'sandwiches.jpg',label:'سريع ولذيذ'},
{id:9,name:'برجر أبو حنفي',cat:'بيتزا وبرجر',desc:'برجر بصوص مميز وخبز طري.',img:'burgers.jpg',label:'جديد'},
{id:10,name:'بيتزا',cat:'بيتزا وبرجر',desc:'بيتزا بمكونات متنوعة وطعم غني.',img:'pizza.jpg',label:'من الفرن'},
{id:11,name:'ليمون منعش',cat:'مشروبات',desc:'مشروب ليمون بارد بالثلج.',img:'drinks-lemon.jpg',label:'منعش'},
{id:12,name:'مشروب فواكه',cat:'مشروبات',desc:'مشروب فاكهة بارد يكمل وجبتك.',img:'drinks-orange.jpg',label:'بارد'}
];
let currentCategory='الكل',cart={};const grid=document.getElementById('productGrid'),searchInput=document.getElementById('searchInput');
function renderProducts(){const q=searchInput.value.trim().toLowerCase();const list=products.filter(p=>(currentCategory==='الكل'||p.cat===currentCategory)&&(p.name+' '+p.cat+' '+p.desc).toLowerCase().includes(q));grid.innerHTML=list.length?list.map(p=>`<article class="product-card"><div class="product-img"><img src="assets/${p.img}" alt="${p.name}" loading="lazy"><span class="product-label">${p.label}</span></div><div class="product-info"><h3>${p.name}</h3><p>${p.desc}</p><div class="product-bottom"><span class="price">السعر عند المطعم</span><button class="add-btn" aria-label="إضافة ${p.name}" onclick="addToCart(${p.id})">+</button></div></div></article>`).join(''):'<p>ملقيناش الصنف ده، جرّب كلمة تانية.</p>'}
function addToCart(id){cart[id]=(cart[id]||0)+1;updateCart();showToast('اتضاف للسلة — دي تجربة عرض 👌')}
function updateCart(){let count=Object.values(cart).reduce((a,b)=>a+b,0);document.getElementById('cartCount').textContent=count;const items=document.getElementById('cartItems');const selected=products.filter(p=>cart[p.id]);items.innerHTML=selected.length?selected.map(p=>`<div class="cart-item"><img src="assets/${p.img}" alt=""><div class="cart-item-main"><b>${p.name}</b><small>السعر يتحدد مع المطعم</small></div><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><span>${cart[p.id]}</span><button onclick="changeQty(${p.id},1)">+</button></div></div>`).join(''):'<p class="empty-cart">لسه ما اخترتش حاجة 😄</p>';document.getElementById('cartTotal').textContent='يُحدد لاحقًا';}
function changeQty(id,n){cart[id]=(cart[id]||0)+n;if(cart[id]<=0)delete cart[id];updateCart()}
function openCart(){document.getElementById('cartDrawer').classList.add('show');document.getElementById('overlay').classList.add('show')};function closeCart(){document.getElementById('cartDrawer').classList.remove('show');document.getElementById('overlay').classList.remove('show')}
let toastTimer;function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),2200)}
document.querySelectorAll('.category').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.category').forEach(x=>x.classList.remove('active'));b.classList.add('active');currentCategory=b.dataset.category;renderProducts()}));searchInput.addEventListener('input',renderProducts);document.getElementById('openCart').addEventListener('click',openCart);document.getElementById('closeCart').addEventListener('click',closeCart);document.getElementById('overlay').addEventListener('click',closeCart);document.getElementById('menuToggle').addEventListener('click',()=>document.querySelector('.topbar nav').classList.toggle('open'));document.querySelectorAll('.topbar nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.topbar nav').classList.remove('open')));document.querySelector('[data-drinks]').addEventListener('click',()=>{currentCategory='مشروبات';document.querySelectorAll('.category').forEach(x=>x.classList.toggle('active',x.dataset.category===currentCategory));renderProducts()});document.getElementById('checkout').addEventListener('click',()=>showToast(document.getElementById('cartCount').textContent==='0'?'ضيف صنف للسلة الأول':'دي نسخة عرض؛ هنربط الطلبات بعد موافقة المطعم'));
renderProducts();


// Auto-rotating 3D carousel controls
const carousel=document.getElementById('heroCarousel');
const carouselDots=[...document.querySelectorAll('#carouselDots button')];
let carouselIndex=0,carouselPause=false,carouselInterval;
function setCarousel(index){carouselIndex=(index+5)%5;carousel.style.transform=`rotateY(${-carouselIndex*72}deg)`;carouselDots.forEach((dot,i)=>dot.classList.toggle('active',i===carouselIndex));}
document.getElementById('carouselNext')?.addEventListener('click',()=>setCarousel(carouselIndex+1));
document.getElementById('carouselPrev')?.addEventListener('click',()=>setCarousel(carouselIndex-1));
carouselDots.forEach((dot,i)=>dot.addEventListener('click',()=>setCarousel(i)));
const carouselScene=document.querySelector('.carousel-scene');
carouselScene?.addEventListener('mouseenter',()=>carouselPause=true);carouselScene?.addEventListener('mouseleave',()=>carouselPause=false);
carouselInterval=setInterval(()=>{if(!carouselPause&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches)setCarousel(carouselIndex+1)},3200);

// Demo contact: open WhatsApp with a prefilled message. User reviews are stored locally in this browser.
const contactForm=document.getElementById('contactForm');
contactForm?.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(contactForm);const name=(data.get('name')||'').toString().trim();const kind=(data.get('kind')||'استفسار').toString();const message=(data.get('message')||'').toString().trim();const text=`أهلًا أبو حنفي، معاك ${name}.\nنوع الرسالة: ${kind}\nالتفاصيل: ${message}`;window.open('https://wa.me/?text='+encodeURIComponent(text),'_blank','noopener');showToast('فتحنا واتساب برسالتك الجاهزة ✨')});
let selectedRating=0;
const ratingButtons=[...document.querySelectorAll('.rating-picker button')];
function paintRating(){ratingButtons.forEach((button,i)=>button.classList.toggle('active',i<selectedRating))}
ratingButtons.forEach(button=>button.addEventListener('click',()=>{selectedRating=Number(button.dataset.rating);paintRating()}));
function getReviews(){try{return JSON.parse(localStorage.getItem('abuhanffy_demo_reviews')||'[]')}catch{return []}}
function renderReviews(){const reviews=getReviews();const list=document.getElementById('reviewsList');const count=reviews.length;const avg=count?reviews.reduce((sum,r)=>sum+r.rating,0)/count:0;document.getElementById('averageRating').textContent=count?avg.toFixed(1):'—';document.getElementById('averageStars').textContent=count?'★'.repeat(Math.round(avg))+'☆'.repeat(5-Math.round(avg)):'☆☆☆☆☆';document.getElementById('reviewCountText').textContent=count?`${count} تقييم تجريبي`:'لسه مفيش تقييمات';list.innerHTML=count?reviews.slice().reverse().slice(0,4).map(r=>`<article class="review-item"><div class="review-item-head"><b>${escapeReview(r.name||'زائر')}</b><span>${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</span></div>${r.comment?`<p>${escapeReview(r.comment)}</p>`:''}</article>`).join(''):'<p class="no-reviews">كن أول واحد يشاركنا رأيه ❤️</p>'}
function escapeReview(value){return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]))}
document.getElementById('reviewForm')?.addEventListener('submit',event=>{event.preventDefault();if(!selectedRating){showToast('اختار عدد النجوم الأول ⭐');return}const data=new FormData(event.currentTarget);const reviews=getReviews();reviews.push({rating:selectedRating,name:(data.get('reviewer')||'').toString().trim(),comment:(data.get('comment')||'').toString().trim(),createdAt:new Date().toISOString()});localStorage.setItem('abuhanffy_demo_reviews',JSON.stringify(reviews));event.currentTarget.reset();selectedRating=0;paintRating();renderReviews();showToast('شكرًا على تقييمك! اتحفظ على الجهاز ❤️')});
renderReviews();
