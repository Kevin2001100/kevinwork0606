// 產品資料
const products = [
    {
        img: "img/p1.webp",
        tag: "特價",
        title: "【貓咪柴犬2杯2袋組】速吸杯二代",
        desc: "900ml+720ml+飲料提袋包覆款和輕巧款",
        priceOld: "NT$3,100",
        price: "NT$1,799"
    },
    {
        img: "img/p2.webp",
        tag: "熱銷",
        title: "【速吸杯二代】",
        desc: "1200ml (內膽陶瓷層) - 柴犬/貓咪",
        priceOld: "NT$2,000",
        price: "NT$1,500"
    },
    {
        img: "img/p3.webp",
        tag: "特價",
        title: "【媽祖1杯1袋組】蓋賀杯",
        desc: "700ml+飲料提袋高大款",
        priceOld: "NT$1,500",
        price: "NT$799"
    },
     {
        img: "img/p4.webp",
        tag: "特價",
        title: "【速吸杯二代】+【蓋賀杯】",
        desc: "900ml+700ml+飲料提袋包覆款和高大款",
        priceOld: "NT$3,100",
        price: "NT$1,499"
    },
     {
        img: "img/p5.webp",
        tag: "特價",
        title: "【速吸杯二代】",
        desc: "1200ml (內膽陶瓷層) - 龍",
        priceOld: "NT$1,500",
        price: "NT$1,380"
    },

     {
        img: "img/p6.webp",
        tag: "特價",
        title: "【蓋賀杯】",
        desc: "700ml - 微醺粉",
        priceOld: "NT$1,200",
        price: "NT$1,180"
    },
    
     {
        img: "img/p7.webp",
        tag: "特價",
        title: "【速吸杯二代】",
        desc: "900ml (內膽陶瓷層) - 大象",
        priceOld: "NT$2,160",
        price: "NT$1,960"
    },

     {
        img: "img/p8.webp",
        tag: "特價",
        title: "【啵啵杯】",
        desc: "710ml-2入組",
        priceOld: "NT$1320",
        price: "NT$1,120"
    },
    
    
    
];

// 動態產生產品卡片
window.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('product-grid');
    products.forEach((p, idx) => {
        const col = document.createElement('div');
        col.className = 'col-12 col-sm-6 col-md-4 col-lg-3 mb-4';
        col.innerHTML = `
            <div class="card h-100 shadow-sm product-card" style="transition:box-shadow .2s;">
                <div class="position-relative">
                    <img src="${p.img}" class="card-img-top bg-light" alt="${p.title}" style="height:200px;object-fit:contain;">
                    ${p.tag ? `<span class="badge bg-danger position-absolute top-0 start-0 m-2">${p.tag}</span>` : ""}
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title mb-1" style="font-size:1rem;">${p.title}</h5>
                    <p class="card-text mb-2" style="font-size:0.95rem;color:#666;">${p.desc || ""}</p>
                    <div class="mb-2">
                        ${p.priceOld ? `<span class="text-muted text-decoration-line-through me-2">${p.priceOld}</span>` : ""}
                        <span class="fw-bold text-danger fs-5">${p.price}</span>
                    </div>
                    <div class="input-group mb-2 quantity-group" style="width: 140px;">
                        <button class="btn btn-outline-secondary btn-qty-minus" type="button" data-idx="${idx}">-</button>
                        <select class="form-select cart-qty-select text-center" data-idx="${idx}" style="max-width:60px;">
                            ${[...Array(10)].map((_,i)=>`<option value="${i+1}">${i+1}</option>`).join('')}
                        </select>
                        <button class="btn btn-outline-secondary btn-qty-plus" type="button" data-idx="${idx}">+</button>
                    </div>
                    <button class="btn btn-outline-primary mt-auto add-cart-btn" data-idx="${idx}">
                        <i class="bi bi-cart-plus"></i> 加入購物車
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(col);
    });

    // 卡片 hover 陰影效果
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', () => card.classList.add('shadow-lg'));
        card.addEventListener('mouseleave', () => card.classList.remove('shadow-lg'));
    });

    // 數量加減按鈕功能（配合 select）
    document.querySelectorAll('.btn-qty-minus').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = this.getAttribute('data-idx');
            const select = document.querySelector(`.cart-qty-select[data-idx="${idx}"]`);
            let val = parseInt(select.value, 10) || 1;
            if (val > 1) select.value = val - 1;
        });
    });
    document.querySelectorAll('.btn-qty-plus').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = this.getAttribute('data-idx');
            const select = document.querySelector(`.cart-qty-select[data-idx="${idx}"]`);
            let val = parseInt(select.value, 10) || 1;
            if (val < 10) select.value = val + 1;
        });
    });

    // 加入購物車功能
    document.querySelectorAll('.add-cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = this.getAttribute('data-idx');
            const product = products[idx];
            const qtySelect = this.parentElement.querySelector('.cart-qty-select');
            let qty = parseInt(qtySelect.value, 10);
            if (isNaN(qty) || qty < 1) qty = 1;

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let found = cart.find(item => item.title === product.title);
            if (found) {
                found.qty = (found.qty || 1) + qty;
            } else {
                cart.push({...product, qty: qty});
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();

            // 動畫提示
            this.innerHTML = '<i class="bi bi-cart-check-fill"></i> 已加入';
            this.classList.remove('btn-outline-primary');
            this.classList.add('btn-success');
            this.disabled = true;
            setTimeout(() => {
                this.innerHTML = '<i class="bi bi-cart-plus"></i> 加入購物車';
                this.classList.remove('btn-success');
                this.classList.add('btn-outline-primary');
                this.disabled = false;
            }, 1200);
        });
    });
});

// 購物車徽章數量
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = total;
        cartCount.style.display = total > 0 ? 'inline-block' : 'none';
    }
}
window.addEventListener('DOMContentLoaded', updateCartCount);