document.addEventListener('DOMContentLoaded', function() {
    const products = [
        { id: 1, name: '商品A', price: 100, img: 'img/a.jpg' },
        { id: 2, name: '商品B', price: 200, img: 'img/b.jpg' }
        // ...可自行增加更多商品
    ];
    const list = document.getElementById('product-list');
    if (!list) return;
    list.innerHTML = products.map(p => `
        <div class="card m-2" style="width: 16rem; display:inline-block;">
            <img src="${p.img}" class="card-img-top" alt="${p.name}">
            <div class="card-body">
                <h5 class="card-title">${p.name}</h5>
                <p class="card-text">NT$${p.price}</p>
                <a href="product-detail.html?id=${p.id}" class="btn btn-primary">查看商品</a>
            </div>
        </div>
    `).join('');
});