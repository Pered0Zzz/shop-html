var cart = {}; //кошик

$('document').ready(function() {
    loadProducts();
    checkCart();
    showMiniCart();
});

function  loadProducts() {
    //Завантаження товарів на сторінку
    $.getJSON('products.json', function (data){
        var out = '';
        for (var key in data) {
                out+='<div class="singl-products">';
                out+='<img src="'+data[key].image+'">';
                out+='<h3>'+data[key] ['name']+'</h3>';
                out+='<p>Ціна: '+data[key] ['cost']+'</p>';
                out+='<button class="add-to-cart" data-art="'+key+'">Купити</button>';
                out+='</div>';
        }
        $('#products').html(out);
        $('button.add-to-cart').on('click', addToCart);
    });
}

function addToCart() {
    //Додавання товару до кошика
    var  articul = $(this).attr('data-art');
    if (cart[articul]!=undefined) {
        cart[articul]++;
    }
    else {
        cart [articul] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
        showMiniCart();
}

function checkCart() {
    //Перевірка товарів кошика в localStorage
    if ( localStorage.getItem('cart') !=null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

function showMiniCart() {
    //Відображення змісту кошика
    var out ='';
    for (var w in cart){
        out += w + ' --- '+cart[w]+',<br>';
    }
    out+='<br><a href="cart.html">Кошик</a>';
    $('#mini-cart').html(out);
}