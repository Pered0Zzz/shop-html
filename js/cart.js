var cart = {}; //Кошик

$.getJSON('products.json', function (data) {
    var products = data; //Всі товари
    checkCart();
    console.log(cart);
showCart(); //Вивід товарів на сторінку

    function showCart() {
        if ( $.isEmptyObject(cart) ) {
            //порожній кошик
            var out = 'Кошик порожній. Додайте товар у кошик <a href="index.html">головна сторінка</a>';
            $('#my-cart').html(out);
        }
        else {

        var out = '';
        for (var key in cart) {
            out += '<button class="delete" data-art="'+key+'">x</button>';
            out += '<img src="'+products[key].image+'" width="48">';
            out += products[key].name;
            out += '<button class="minus" data-art="'+key+'">-</button>';
            out += cart[key];
            out += '<button class="plus" data-art="'+key+'">+</button>';
            out += cart[key]*products[key].cost;
            out += '<br>';
        }
        $('#my-cart').html(out);
        $('.plus').on('click', plusProducts);
        $('.minus').on('click', minusProducts);
        $('.delete').on('click', deleteProducts);

        }
    }
    function plusProducts() {
        var articul = $(this).attr('data-art')
        cart[articul]++;
        saveCartToLS();
        showCart();
    }

    function minusProducts() {
                var articul = $(this).attr('data-art')
                if (cart[articul]>1) {
                    cart[articul]--;

        }
        else {
            delete cart[articul];
        }
        saveCartToLS();
        showCart();
    }

    function deleteProducts() {
        var articul = $(this).attr('data-art')
        delete cart[articul];
        saveCartToLS();
        showCart();
    }
});

function checkCart() {
    //Перевірка товарів кошика в localStorage
    if ( localStorage.getItem('cart') !=null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

function saveCartToLS() {
    localStorage.setItem('cart', JSON.stringify(cart));
}