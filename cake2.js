document.addEventListener("DOMContentLoaded", function () {
    // Create cart preview container
    const cartPreviewContainer = document.createElement("div");
    cartPreviewContainer.classList.add("cart-preview-container");
    document.body.appendChild(cartPreviewContainer);
    
    // Initialize cart from localStorage or empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCountElement = document.getElementById("cart-count");

    function updateCartCount() {
        cartCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }

    function saveCartToStorage() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function showCartPreview(product, initialQuantity = 1) {
        cartPreviewContainer.style.display = "flex";
        cartPreviewContainer.innerHTML = `
            <div class="cart-container">
              <button class="close-cart">X</button>
                <div class="cart-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="cart-details">
                    <h2>${product.name}</h2><br>
                    <label>Type:</label>
                    <div class="type-selection">
                        <button class="type-btn" data-type="Egg">Egg</button>
                        <button class="type-btn active" data-type="Eggless">Eggless</button>
                    </div>

                    <label>Piece:</label>
                    <div class="piece-selection">
                        <button class="piece-btn active" data-piece="1">1 PC</button>
                        <button class="piece-btn" data-piece="2">2 PC</button>
                        <button class="piece-btn" data-piece="3">3 PC</button>
                        <button class="piece-btn" data-piece="4">4 PC</button>
                        <button class="piece-btn" data-piece="5">5 PC</button>
                    </div>

                    <label>Quantity:</label>
                    <div class="quantity-selection">
                        <button class="decrease">-</button>
                        <span class="quantity">${initialQuantity}</span>
                        <button class="increase">+</button>
                    </div>

                    <p class="price">Price: ₹<span id="total-price">${(product.price * initialQuantity).toFixed(2)}</span></p>

                    <a href="addtocart.html"><button class="add-to-cart-btn">ADD TO CART</button></a>
                </div>
            </div>
        `;

        let quantity = initialQuantity;
        let selectedPieces = 1;
        let selectedType = "Eggless";
        const basePrice = product.price;

        const quantitySpan = cartPreviewContainer.querySelector(".quantity");
        const totalPriceSpan = cartPreviewContainer.querySelector("#total-price");
        const decreaseBtn = cartPreviewContainer.querySelector(".decrease");
        const increaseBtn = cartPreviewContainer.querySelector(".increase");
        const pieceButtons = cartPreviewContainer.querySelectorAll(".piece-btn");
        const typeButtons = cartPreviewContainer.querySelectorAll(".type-btn");
        const closeCartBtn = cartPreviewContainer.querySelector(".close-cart");
        const addToCartBtn = cartPreviewContainer.querySelector(".add-to-cart-btn");

        function updatePrice() {
            totalPriceSpan.textContent = (basePrice * selectedPieces * quantity).toFixed(2);
        }

        decreaseBtn.addEventListener("click", function () {
            if (quantity > 1) {
                quantity--;
                quantitySpan.textContent = quantity;
                updatePrice();
            }
        });

        increaseBtn.addEventListener("click", function () {
            quantity++;
            quantitySpan.textContent = quantity;
            updatePrice();
        });

        pieceButtons.forEach(button => {
            button.addEventListener("click", function () {
                selectedPieces = parseInt(this.dataset.piece);
                pieceButtons.forEach(btn => btn.classList.remove("active"));
                this.classList.add("active");
                updatePrice();
            });
        });

        typeButtons.forEach(button => {
            button.addEventListener("click", function () {
                selectedType = this.dataset.type;
                typeButtons.forEach(btn => btn.classList.remove("active"));
                this.classList.add("active");
            });
        });

        addToCartBtn.addEventListener("click", function () {
            // Create cart item object
            const cartItem = {
                id: `${product.name}-${selectedType}-${selectedPieces}`,
                name: product.name,
                image: product.image,
                price: basePrice * selectedPieces,
                type: selectedType,
                pieces: selectedPieces,
                quantity: quantity
            };

            // Check if item already exists in cart
            const existingItemIndex = cart.findIndex(
                item => item.id === cartItem.id
            );

            if (existingItemIndex !== -1) {
                // Update quantity if item exists
                cart[existingItemIndex].quantity += quantity;
            } else {
                // Add new item to cart
                cart.push(cartItem);
            }

            // Save to localStorage and update UI
            saveCartToStorage();
            updateCartCount();
            
            // Close the preview
            cartPreviewContainer.style.display = "none";
        });

        closeCartBtn.addEventListener("click", function () {
            cartPreviewContainer.style.display = "none";
        });
    }

    // Initialize cart count on page load
    updateCartCount();

    // Add event listeners to product cards
    document.querySelectorAll(".cart").forEach(button => {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            const productCard = this.closest(".product-card");
            const currentQuantity = parseInt(productCard.querySelector(".count").textContent);
            
            const product = {
                name: productCard.querySelector("h3").textContent,
                image: productCard.querySelector("img").src,
                price: parseFloat(productCard.querySelector(".price").textContent.replace("₹", ""))
            };
            
            showCartPreview(product, currentQuantity);
        });
    });

    // Quantity controls on product cards
    document.querySelectorAll(".product-card").forEach(card => {
        const decreaseBtn = card.querySelector(".decrease");
        const increaseBtn = card.querySelector(".increase");
        const countSpan = card.querySelector(".count");
        let quantity = 1;

        decreaseBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            if (quantity > 1) {
                quantity--;
                countSpan.textContent = quantity;
            }
        });

        increaseBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            quantity++;
            countSpan.textContent = quantity;
        });
    });

    // Close preview when clicking outside
    cartPreviewContainer.addEventListener("click", function (e) {
        if (e.target === cartPreviewContainer) {
            cartPreviewContainer.style.display = "none";
        }
    });
});