// <!-- Count Increase button -->
        document.addEventListener("DOMContentLoaded", () => {
          document.querySelectorAll(".product-card").forEach(card => {
              const countElement = card.querySelector(".count");
              const decreaseBtn = card.querySelector(".decrease");
              const increaseBtn = card.querySelector(".increase");
              const addToCartBtn = card.querySelector(".add-to-cart");
      
              if (!countElement || !decreaseBtn || !increaseBtn || !addToCartBtn) {
                  console.error("Missing elements in", card);
                  return;
              }
      
              let count = parseInt(countElement.textContent) || 1;
              countElement.textContent = count;
      
              
              increaseBtn.addEventListener("click", () => {
                  if (count < 10) {
                      count++;
                      countElement.textContent = count;
                  }
              });
      
              
              decreaseBtn.addEventListener("click", () => {
                  if (count > 1) {  
                      count--;
                      countElement.textContent = count;
                  }
              });
      
             
              addToCartBtn.addEventListener("click", () => {
                  alert(`Added ${count} item(s) to cart`);
              });
          });
      });
      
    //   <!--Store Add To cart  -->
          document.addEventListener("DOMContentLoaded", () => {
          let cart = JSON.parse(localStorage.getItem("cart")) || [];
      
          document.querySelectorAll(".product-card").forEach(card => {
              const countElement = card.querySelector(".count");
              const decreaseBtn = card.querySelector(".decrease");
              const increaseBtn = card.querySelector(".increase");
              const addToCartBtn = card.querySelector(".add-to-cart");
              const productName = card.querySelector("h3").textContent;
              const productPrice = parseFloat(card.querySelector(".price").textContent.replace("₹", ""));
              const productImage = card.querySelector("img").src;
      
              if (!countElement || !decreaseBtn || !increaseBtn || !addToCartBtn) {
                  console.error("Missing elements in", card);
                  return;
              }
      
              let count = parseInt(countElement.textContent) || 1;
              countElement.textContent = count;
      
              increaseBtn.addEventListener("click", () => {
                  if (count < 10) {
                      count++;
                      countElement.textContent = count;
                  }
              });
      
              decreaseBtn.addEventListener("click", () => {
                  if (count > 1) {  
                      count--;
                      countElement.textContent = count;
                  }
              });
      
              addToCartBtn.addEventListener("click", () => {
                  const cartItem = {
                      name: productName,
                      price: productPrice,
                      quantity: count,
                      image: productImage
                  };
      
                  const existingItemIndex = cart.findIndex(item => item.name === productName);
                  if (existingItemIndex !== -1) {
                      cart[existingItemIndex].quantity += count;
                  } else {
                      cart.push(cartItem);
                  }
      
                  localStorage.setItem("cart", JSON.stringify(cart));
                  alert(`${count} ${productName}(s) added to cart`);
              });
          });
      });
      
      
     
    // <!-- Search -->

      
      document.addEventListener("DOMContentLoaded", () => {
          const searchInput = document.getElementById("search");
          const productCards = document.querySelectorAll(".product-card");
      
          searchInput.addEventListener("input", () => {
              let filter = searchInput.value.toLowerCase();
      
              productCards.forEach(card => {
                  let productName = card.querySelector("h3").textContent.toLowerCase();
                  if (productName.includes(filter)) {
                      card.style.display = "inline-block"; 
                  } else {
                      card.style.display = "none";
                  }
              });
          });
      });
      
    //   <!--  Update Cart Count -- -->
         
        document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartCount();

    function updateCartCount() {
        let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById("cart-count").textContent = totalItems;
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            updateCartCount();
        });
    });
});

   