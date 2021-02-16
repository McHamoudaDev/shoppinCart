let cart = document.querySelector(".count");
let cartItems = document.querySelector(".cart_items");
let addToCart = document.querySelectorAll(".products .add_to_cart");
let cartCount = document.querySelector("#total_cost");
let CurrentCartItems = [];

cart.addEventListener("click", () => {
    cartItems.classList.toggle('active');
});

addToCart.forEach(btn => {
    btn.addEventListener('click', (event) => {
        let product_id = event.target.getAttribute("product_id");
        let product_name = event.target.parentElement.querySelector(".product_name").innerText;
        let product_price = event.target.parentElement.querySelector("#product_price").innerText;
        let product_image = event.target.parentElement.querySelector("#product_image").getAttribute("src");

        let clickedProduct = {
            "product_id": product_id,
            "product_name": product_name,
            "product_price": product_price,
            "product_image": product_image,
            "count": 1
        }

        addItemsToTheCart(clickedProduct);
        calculateTheTotal(clickedProduct.product_price);
        showCartItems();

    })
})



function addItemsToTheCart(product) {

    let oldItemsInTheCart = localStorage.getItem("products");
    oldItemsInTheCart = JSON.parse(oldItemsInTheCart);

    if (oldItemsInTheCart != null) {

        if (oldItemsInTheCart[product.product_id] == undefined) {
            oldItemsInTheCart = {
                // spread Operator
                ...oldItemsInTheCart,
                [product.product_id]: product
            }
        }
        oldItemsInTheCart[product.product_id].count += 1;

    } else {
        // for the first Time
        product.count = 1;
        oldItemsInTheCart = {
            [product.product_id]: product
        }

    }

    localStorage.setItem("products", JSON.stringify(oldItemsInTheCart));

}

function calculateTheTotal(product_price){

    console.log(product_price);
    let oldPrice = localStorage.getItem("total_price");
    oldPrice = JSON.parse(oldPrice);

    product_price = parseFloat(product_price);

    if(oldPrice != null) {

        oldPrice += product_price;
    }else{
        oldPrice = product_price
    }
    localStorage.setItem("total_price", JSON.stringify(oldPrice));


}

function showCartItems() {

    let allCartItems = localStorage.getItem("products");
    allCartItems = JSON.parse(allCartItems);
    let cartHtml = '';
    let count = 0;
    cartItems.innerHTML = '';
    if(allCartItems != null){

       
        
       for(let product in allCartItems){
           count++;
            cartHtml += ` <div class="item">
            <img id="product_image" src="${allCartItems[product]['product_image']}" alt="" srcset="">
            <h4 class="product_name">${allCartItems[product]['product_name']}</h4>
            <h4 class="quantity"><i class="fa fa-angle-left"></i> ${allCartItems[product]['count']} <i class="fa fa-angle-right"></i></h4>
            <span id="product_price">$ ${allCartItems[product]['count'] * allCartItems[product]['product_price']}</span>
            <a class="btn_remove remove_from_cart"><i class="fa fa-trash"></i></a>
        </div>`
        
       }

    }

    console.log(count)

    

    cartCount.innerHTML = count;

    cartItems.innerHTML += cartHtml;



}

showCartItems();
function updateCartUi(){

}
// console.log(pro);