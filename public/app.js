let products = [];
let currentProduct = null;

const sessionId = getSessionId();


// ===============================
// CREATE SESSION ID
// ===============================

function getSessionId() {

    let id = localStorage.getItem("storeSessionId");

    if (!id) {
        id = "session-" + crypto.randomUUID();

        localStorage.setItem(
            "storeSessionId",
            id
        );
    }

    return id;
}


// ===============================
// LOAD PRODUCTS
// ===============================

async function loadProducts() {

    try {

        const response = await fetch(
            "/api/products"
        );

        if (!response.ok) {
            throw new Error("Failed to load products");
        }

        products = await response.json();

        displayProducts(products);

        document.getElementById(
            "product-count"
        ).textContent =
            `${products.length} pieces`;

    } catch (error) {

        console.error(error);

        showToast(
            "Unable to load products."
        );
    }
}


// ===============================
// DISPLAY PRODUCTS
// ===============================

function displayProducts(products) {

    const container =
        document.getElementById(
            "products-container"
        );

    container.innerHTML = "";

    products.forEach(product => {

        const card =
            document.createElement("article");

        card.className =
            "product-card";


        const stockText =
            product.stock > 0
                ? `${product.stock} in stock`
                : "Out of stock";


        const stockClass =
            product.stock <= 5
                ? "low"
                : "";


        card.innerHTML = `

            <div
                class="product-image-wrapper"
                onclick="openProductModal('${product._id}')">

                <img
                    src="${product.image}"
                    alt="${product.name}">

                <span
                    class="product-stock ${stockClass}">

                    ${stockText}

                </span>

            </div>


            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.description}
                </p>


                <div class="product-bottom">

                    <span class="product-price">
                        EGP ${product.price.toLocaleString()}
                    </span>


                    <button
                        class="add-button"
                        onclick="addToCart('${product._id}', event)"
                        ${product.stock === 0 ? "disabled" : ""}>

                        ${
                            product.stock === 0
                                ? "Sold Out"
                                : "Add to cart"
                        }

                    </button>

                </div>

            </div>
        `;


        container.appendChild(card);

    });
}


// ===============================
// OPEN PRODUCT MODAL
// ===============================

function openProductModal(productId) {

    const product =
        products.find(
            item => item._id === productId
        );

    if (!product) return;

    currentProduct = product;


    document.getElementById(
        "modal-image"
    ).src = product.image;


    document.getElementById(
        "modal-name"
    ).textContent = product.name;


    document.getElementById(
        "modal-description"
    ).textContent =
        product.description;


    document.getElementById(
        "modal-price"
    ).textContent =
        `EGP ${product.price.toLocaleString()}`;


    document.getElementById(
        "modal-stock"
    ).textContent =
        product.stock > 0
            ? `${product.stock} available`
            : "Currently out of stock";


    const button =
        document.getElementById(
            "modal-add-button"
        );


    button.disabled =
        product.stock === 0;


    button.textContent =
        product.stock === 0
            ? "Out of stock"
            : "Add to cart";


    button.onclick = () => {

        if (currentProduct) {

            addToCart(
                currentProduct._id
            );

        }

    };


    document
        .getElementById("product-modal")
        .classList.add("active");
}


// ===============================
// CLOSE PRODUCT MODAL
// ===============================

function closeProductModal() {

    document
        .getElementById("product-modal")
        .classList.remove("active");
}


// ===============================
// ADD TO CART
// ===============================

async function addToCart(
    productId,
    event
) {

    if (event) {
        event.stopPropagation();
    }


    try {

        const response =
            await fetch(
                `/api/cart/${sessionId}/add`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        productId: productId,
                        quantity: 1
                    })
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            showToast(
                data.message ||
                "Unable to add product."
            );

            return;
        }


        showToast(
            "Added to your cart ✓"
        );


        await loadCart();


    } catch (error) {

        console.error(error);

        showToast(
            "Something went wrong."
        );
    }
}


// ===============================
// LOAD CART
// ===============================

async function loadCart() {

    try {

        const response =
            await fetch(
                `/api/cart/${sessionId}`
            );


        if (!response.ok) {
            throw new Error(
                "Failed to load cart"
            );
        }


        const cart =
            await response.json();


        displayCart(cart);


    } catch (error) {

        console.error(error);

        showToast(
            "Unable to load cart."
        );
    }
}


// ===============================
// DISPLAY CART
// ===============================

function displayCart(cart) {

    const container =
        document.getElementById(
            "cart-items"
        );


    const count =
        document.getElementById(
            "cart-count"
        );


    const total =
        document.getElementById(
            "cart-total"
        );


    container.innerHTML = "";


    const totalItems =
        cart.items.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    count.textContent =
        totalItems;


    if (cart.items.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <p>
                    Your cart is waiting
                    for something beautiful.
                </p>

            </div>

        `;


        total.textContent =
            "EGP 0";

        return;
    }


    let cartTotal = 0;


    cart.items.forEach(item => {

        const product =
            item.productId;


        const itemTotal =
            product.price *
            item.quantity;


        cartTotal += itemTotal;


        const element =
            document.createElement("div");


        element.className =
            "cart-item";


        element.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}">


            <div class="cart-item-info">

                <h4>
                    ${product.name}
                </h4>


                <p>
                    ${item.quantity} ×
                    EGP ${product.price.toLocaleString()}
                </p>


                <button
                    class="remove-button"
                    onclick="removeFromCart('${product._id}')">

                    Remove

                </button>

            </div>

        `;


        container.appendChild(element);

    });


    total.textContent =
        `EGP ${cartTotal.toLocaleString()}`;
}


// ===============================
// REMOVE FROM CART
// ===============================

async function removeFromCart(
    productId
) {

    try {

        const response =
            await fetch(
                `/api/cart/${sessionId}/remove/${productId}`,
                {
                    method: "DELETE"
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            showToast(
                data.message ||
                "Unable to remove product."
            );

            return;
        }


        showToast(
            "Removed from your cart"
        );


        await loadCart();


    } catch (error) {

        console.error(error);

        showToast(
            "Something went wrong."
        );
    }
}


// ===============================
// TOGGLE CART
// ===============================

function toggleCart() {

    document
        .getElementById("cart-sidebar")
        .classList.toggle("active");


    document
        .getElementById("cart-overlay")
        .classList.toggle("active");


    loadCart();
}


// ===============================
// TOAST MESSAGE
// ===============================

function showToast(message) {

    const toast =
        document.getElementById("toast");


    toast.textContent =
        message;


    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

    }, 2500);
}


// ===============================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// ===============================

document
    .getElementById("product-modal")
    .addEventListener(
        "click",
        event => {

            if (
                event.target.id ===
                "product-modal"
            ) {

                closeProductModal();

            }

        }
    );


// ===============================
// CHECKOUT BUTTON
// ===============================

document
    .querySelector(".checkout-button")
    .addEventListener("click", () => {

        showToast(
            "Checkout is not available in this demo."
        );

    });


// ===============================
// START APPLICATION
// ===============================

loadProducts();

loadCart();