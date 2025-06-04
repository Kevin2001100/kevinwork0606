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
    products.forEach(p => {
        const col = document.createElement('div');
        col.className = 'col-12 col-sm-6 col-md-4 col-lg-3';
        col.innerHTML = `
            <div class="card h-100">
                <div class="position-relative">
                    <img src="${p.img}" class="card-img-top bg-light" alt="${p.title}" style="height:200px;object-fit:contain;">
                    ${p.tag ? `<span class="badge bg-dark position-absolute bottom-0 start-0 m-2">${p.tag}</span>` : ""}
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title mb-1" style="font-size:1rem;">${p.title}</h5>
                    <p class="card-text mb-2" style="font-size:0.95rem;color:#666;">${p.desc || ""}</p>
                    <div class="mt-auto">
                        ${p.priceOld ? `<span class="text-muted text-decoration-line-through me-2">${p.priceOld}</span>` : ""}
                        <span class="fw-bold text-danger">${p.price}</span>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(col);
    });
});