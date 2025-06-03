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
    { img: "img/p1.png", title: "商品3", price: "NT$1,460" },
    { img: "img/p2.png", title: "商品4", price: "NT$1,200" },
    { img: "img/p3.png", title: "商品5", price: "NT$1,180" },
    { img: "img/p4.png", title: "商品6", price: "NT$1,160" },
    { img: "img/p5.png", title: "商品7", price: "NT$1,140" },
    { img: "img/p6.png", title: "商品8", price: "NT$1,120" },
    { img: "img/p7.png", title: "商品9", price: "NT$1,100" },
    { img: "img/p8.png", title: "商品10", price: "NT$1,080" },
    { img: "img/p9.png", title: "商品11", price: "NT$1,060" },
    { img: "img/p10.png", title: "商品12", price: "NT$1,040" }
];

// 動態產生產品卡片
window.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('product-grid');
    products.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-img-wrap">
                <img src="${p.img}" alt="${p.title}">
                <span class="product-tag">${p.tag || ""}</span>
            </div>
            <div class="product-title">${p.title}</div>
            <div class="product-desc">${p.desc}</div>
            <div class="product-price-wrap">
                <span class="product-price-old">${p.priceOld}</span>
                <span class="product-price">${p.price}</span>
            </div>
        `;
        grid.appendChild(card);
    });
});