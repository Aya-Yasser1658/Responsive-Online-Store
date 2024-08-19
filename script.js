/* Responsive code for menu-bar */
let menuBar = document.querySelector("#menu-bar");
let amenu = document.querySelector(".middel");

function showmenu() {
    menuBar.classList.toggle("fa-times");
    amenu.classList.toggle("active");
}

/* Form Handling */
const formOpenBtn = document.querySelector("#form-open"),
    home = document.querySelector(".home"),
    formContainer = document.querySelector(".form_container"),
    formCloseBtn = document.querySelector(".form_close"),
    signupBtn = document.querySelector("#signup"),
    loginBtn = document.querySelector("#login"),
    pwShowHide = document.querySelectorAll(".pw_hide");

formOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

pwShowHide.forEach((icon) => {
    icon.addEventListener("click", () => {
        let getPwInput = icon.parentElement.querySelector("input");
        if (getPwInput.type === "password") {
            getPwInput.type = "text";
            icon.classList.replace("uil-eye-slash", "uil-eye");
        } else {
            getPwInput.type = "password";
            icon.classList.replace("uil-eye", "uil-eye-slash");
        }
    });
});

signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.add("active");
});
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.remove("active");
});

/* Cart Handling */
const product = [
    {
        id: 0,
        image: 'image/image1.webp',
        title: 'Wooden furniture',
        price: 20000,
    },
    {
        id: 1,
        image: 'image/furniture-2.webp',
        title: 'Wooden Sofa set',
        price: 25000,
    },
    {
        id: 2,
        image: 'image/furniture_1.webp',
        title: 'Wooden Food trip',
        price: 30000,
    },
    {
        id: 3,
        image: 'image/image4.webp',
        title: 'Wooden cornerstone',
        price: 27000,
    },
];

const categories = [...new Set(product.map(item => item))];
let i = 0;

document.getElementById('root').innerHTML = categories.map((item) => {
    const { image, title, price } = item;
    return (
        `<div class='box'>
            <div class='img-box'>
                <img class='images' src="${image}" alt="${title}">
            </div>
            <div class='bottom'>
                <p>${title}</p>
                <h2>$ ${price}.00</h2>
                <button onclick='addtocart(${i++})'>Add To Cart</button>
            </div>
        </div>`
    );
}).join('');

let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount(); // Update cart count on page load
displaycart();

function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

function login() {
    localStorage.setItem('isLoggedIn', 'true');
    home.classList.remove("show");
}

function logout() {
    localStorage.setItem('isLoggedIn', 'false');
    cart = [];
    localStorage.removeItem('cart');
    updateCartCount();
    displaycart();
}

function addtocart(index) {
    if (!isLoggedIn()) {
        alert("You must be logged in to add items to the cart.");
        return;
    }
    const selectedItem = categories[index];
    cart.push(selectedItem);
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
    updateCartCount();
    displaycart();
}

function delElement(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage
    updateCartCount();
    displaycart();
}

function updateCartCount() {
    document.querySelector('.count').innerText = cart.length;
}

function displaycart() {
    let total = 0;

    if (cart.length === 0) {
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
        document.getElementById('total').innerHTML = "$ 0.00";
        return;
    }

    document.getElementById('cartItem').innerHTML = cart.map((item, index) => {
        total += item.price;
        return (
            `<div class='cart-item'>
                <div class='row-img'>
                    <img class='rowimg' src="${item.image}" alt="${item.title}">
                </div>
                <p style='font-size:12px;'>${item.title}</p>
                <h2 style='font-size: 15px;'>$ ${item.price}.00</h2>
                <button onclick='delElement(${index})'>Remove</button>
            </div>`
        );
    }).join('');

    document.getElementById('total').innerHTML = `$ ${total}.00`;
    updateCartCount();
}

/* Event Listener for Login */
document.querySelector(".login_form").addEventListener("submit", (e) => {
    e.preventDefault();
    login();
});

/* Event Listener for Logout */
document.querySelector(".logout").addEventListener("click", (e) => {
    e.preventDefault();
    logout();
});

