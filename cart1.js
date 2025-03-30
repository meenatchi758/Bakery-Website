

//  <!-- Search -->
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



// Toggle Menu
function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("active");
}
//login popup
        // Modal Functions
        function openModal() {
            document.getElementById('loginModal').classList.add('active');
        }

        function closeModal() {
            document.getElementById('loginModal').classList.remove('active');
            clearErrors();
        }

        function clearErrors() {
            document.querySelectorAll('.error-message').forEach(el => {
                el.textContent = '';
            });
        }

        function showError(elementId, message) {
            document.getElementById(elementId).textContent = message;
        }

        // Login Form Submission
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            clearErrors();
            
            const name = document.getElementById('loginName').value.trim();
            const email = document.getElementById('loginEmail').value.trim();
            const mobile = document.getElementById('loginMobile').value.trim();
            const password = document.getElementById('loginPassword').value.trim();
            
            let isValid = true;
            
            if (!name) {
                showError('loginNameError', 'Name is required');
                isValid = false;
            }
            
            if (!email) {
                showError('loginEmailError', 'Email is required');
                isValid = false;
            } else if (!/^\S+@\S+\.\S+$/.test(email)) {
                showError('loginEmailError', 'Invalid email format');
                isValid = false;
            }
            
            if (!mobile) {
                showError('loginMobileError', 'Mobile number is required');
                isValid = false;
            } else if (!/^\d{10}$/.test(mobile)) {
                showError('loginMobileError', 'Enter a valid 10-digit number');
                isValid = false;
            }
            
            if (!password) {
                showError('loginPasswordError', 'Password is required');
                isValid = false;
            } else if (password.length < 6) {
                showError('loginPasswordError', 'Password must be at least 6 characters');
                isValid = false;
            }
            
            if (isValid) {
                // Show success popup
                document.getElementById('popup').style.display = 'block';
                setTimeout(() => {
                    document.getElementById('popup').style.display = 'none';
                    closeModal();
                }, 3000);
                this.reset();
            }
        });

        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === document.getElementById('loginModal')) {
                closeModal();
            }
        });
        function openModal() {
    document.getElementById("loginModal").style.display = "flex";
}

// Close Modal Function
function closeModal() {
    document.getElementById("loginModal").style.display = "none";
}

// Close modal when clicking outside the box
window.onclick = function(event) {
    let modal = document.getElementById("loginModal");
    if (event.target === modal) {
        closeModal();
    }
};
//enquiry form

document.addEventListener("DOMContentLoaded", function () {
    let savedData = JSON.parse(localStorage.getItem("savedData")) || {}; // Retrieve saved data or empty object

    // Ensure elements exist before setting values
    if (document.getElementById("name")) {
        document.getElementById("name").value = savedData.name || "";
        document.getElementById("eggType").value = savedData.eggType || "";
        document.getElementById("contact").value = savedData.contact || "";
        document.getElementById("flour").value = savedData.flour || "";
        document.getElementById("mail").value = savedData.mail || "";
        document.getElementById("occasionText").value = savedData.occasionText || "";
        document.getElementById("occasion").value = savedData.occasion || "";
    }
});

document.getElementById("enquiryForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    let name = document.getElementById("name").value.trim();
    let eggType = document.getElementById("eggType").value.trim();
    let contact = document.getElementById("contact").value.trim();
    let flour = document.getElementById("flour").value.trim();
    let mail = document.getElementById("mail").value.trim();
    let occasionText = document.getElementById("occasionText").value.trim();
    let occasion = document.getElementById("occasion").value.trim();

    // Regular expressions for validation
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let phonePattern = /^[0-9]{10}$/;

    // Clear previous errors
    clearErrors();

    // Validate fields
    let isValid = true;

    if (!name) {
        showError("name", "Please enter your name.");
        isValid = false;
    }

    if (eggType !== "Egg" && eggType !== "Eggless") {
        showError("eggType", "Please select Egg or Eggless.");
        isValid = false;
    }

    if (!contact) {
        showError("contact", "Please enter your contact number.");
        isValid = false;
    } else if (!phonePattern.test(contact)) {
        showError("contact", "Please enter a valid 10-digit phone number.");
        isValid = false;
    }

    if (!flour) {
        showError("flour", "Please specify which flour to use.");
        isValid = false;
    }

    if (!mail) {
        showError("mail", "Please enter your email address.");
        isValid = false;
    } else if (!emailPattern.test(mail)) {
        showError("mail", "Please enter a valid email address.");
        isValid = false;
    }

    if (!occasionText) {
        showError("occasionText", "Please describe the occasion.");
        isValid = false;
    }

    if (!occasion) {
        showError("occasion", "Please specify the occasion.");
        isValid = false;
    }

    if (isValid) {
        alert("Form submitted successfully!");
        this.submit(); // Submits the form after successful validation
    }
});

// Function to clear previous error messages
function clearErrors() {
    document.querySelectorAll(".error").forEach(el => el.remove());
}

// Function to show error messages
function showError(fieldId, message) {
    let field = document.getElementById(fieldId);
    let existingError = field.parentNode.querySelector(".error");
    
    if (!existingError) { // Prevent duplicate error messages
        let errorMessage = document.createElement("span");
        errorMessage.className = "error";
        errorMessage.style.color = "red";
        errorMessage.textContent = message;
        field.parentNode.appendChild(errorMessage);
    }
}






