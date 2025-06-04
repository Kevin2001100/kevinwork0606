// 產品資料
const products = [
    {
        img: "img/cup1.png",
        tag: "特價",
        title: "【貓咪柴犬2杯2袋組】速吸杯二代",
        desc: "900ml+720ml+飲料提袋包覆款和輕巧款",
        priceOld: "NT$3,100",
        price: "NT$1,799"
    },
    {
        img: "img/cup2.png",
        tag: "熱銷",
        title: "聯名環保杯組",
        desc: "插畫家聯名設計，限量發售",
        priceOld: "NT$2,000",
        price: "NT$1,500"
    },
    { img: "img/p1.webp", title: "商品3", price: "NT$1,460" },
    { img: "img/p2.webp", title: "商品4", price: "NT$1,200" },
    { img: "img/p3.webp", title: "商品5", price: "NT$1,180" },
    { img: "img/p4.webp", title: "商品6", price: "NT$1,160" },
    { img: "img/p5.webp", title: "商品7", price: "NT$1,140" },
    { img: "img/p6.webp", title: "商品8", price: "NT$1,120" },
    { img: "img/p7.webp", title: "商品9", price: "NT$1,100" },
    { img: "img/p8.webp", title: "商品10", price: "NT$1,080" },
    { img: "img/p9.webp", title: "商品11", price: "NT$1,060" },
    { img: "img/p10.webp", title: "商品12", price: "NT$1,040" }
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
                        <input type="number" min="1" value="1" class="form-control cart-qty-input text-center" data-idx="${idx}" style="max-width:48px;">
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

    // 數量加減按鈕功能
    document.querySelectorAll('.btn-qty-minus').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = this.getAttribute('data-idx');
            const input = document.querySelector(`.cart-qty-input[data-idx="${idx}"]`);
            let val = parseInt(input.value, 10) || 1;
            if (val > 1) input.value = val - 1;
        });
    });
    document.querySelectorAll('.btn-qty-plus').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = this.getAttribute('data-idx');
            const input = document.querySelector(`.cart-qty-input[data-idx="${idx}"]`);
            let val = parseInt(input.value, 10) || 1;
            input.value = val + 1;
        });
    });

    // 禁止輸入小於1
    document.querySelectorAll('.cart-qty-input').forEach(input => {
        input.addEventListener('input', function() {
            if (this.value === "" || parseInt(this.value, 10) < 1) this.value = 1;
        });
    });

    // 加入購物車功能（改為 select 取值）
    document.querySelectorAll('.add-cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = this.getAttribute('data-idx');
            const product = products[idx];
            // 取得對應的 select
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
            this.innerHTML = '<i class="bi bi-cart-check-fill"></i> 已加入';
            this.classList.remove('btn-outline-primary');
            this.classList.add('btn-success');
            setTimeout(() => {
                this.innerHTML = '<i class="bi bi-cart-plus"></i> 加入購物車';
                this.classList.remove('btn-success');
                this.classList.add('btn-outline-primary');
            }, 1200);
        });
    });
});

// 新增這個函式於 products.js
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    // 計算所有商品的總數量
    const total = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = total;
        cartCount.style.display = total > 0 ? 'inline-block' : 'none';
    }
}

// 頁面載入時同步顯示數量
window.addEventListener('DOMContentLoaded', updateCartCount);