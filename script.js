// Store cart data and current product
let cart = {};
let currentProduct = {};  // Holds current product data

// Open modal and set product details
function openModal(productElement) {
    const name = productElement.querySelector('.name').textContent;  // Product name
    const priceText = productElement.querySelector('.Price').innerText.match(/₹([\d,]+)/);
    const price = priceText ? parseFloat(priceText[1].replace(/,/g, '')) : 0;

    // Store current product details
    currentProduct = { name, price };

    // Update modal content
    document.getElementById('modalProductName').textContent = name;
    document.getElementById('modalProductPrice').textContent = price;  // Set the original price
    document.getElementById('modalQuantity').textContent = cart[name]?.quantity || 1;  // Quantity (default 1)
    document.getElementById('modalTotal').textContent = price * (cart[name]?.quantity || 1);  // Calculate total price based on quantity

    // Show the modal
    document.getElementById('cartModal').style.display = 'flex';
}

// Close the modal
function closeModal() {
    document.getElementById('cartModal').style.display = 'none';
}

// Increase quantity and update total price
function increaseQuantity() {
    let qty = parseInt(document.getElementById('modalQuantity').textContent);
    qty++;
    document.getElementById('modalQuantity').textContent = qty;
    updateTotalPrice(qty);  // Update total price based on new quantity
}

// Decrease quantity and update total price
function decreaseQuantity() {
    let qty = parseInt(document.getElementById('modalQuantity').textContent);
    if (qty > 1) {
        qty--;
        document.getElementById('modalQuantity').textContent = qty;
        updateTotalPrice(qty);  // Update total price based on new quantity
    }
}

// Update total price based on quantity
function updateTotalPrice(quantity) {
    const total = quantity * currentProduct.price;
    document.getElementById('modalTotal').textContent = total;
}

// Confirm and add product to cart
function confirmAddToCart() {
    const qty = parseInt(document.getElementById('modalQuantity').textContent);
    cart[currentProduct.name] = { price: currentProduct.price, quantity: qty };
    updateCartUI();
    closeModal();  // Close the modal after adding to cart
}

// Update the cart UI with the total number of items
function updateCartUI() {
    let count = 0;
    for (let item in cart) {
        count += cart[item].quantity;  // Update cart count based on quantity
    }
    document.querySelector('.count').textContent = count;  // Update the cart count
}

// Event listener for "Add to Cart" buttons
const addCartButtons = document.querySelectorAll('.btn-2');
addCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.closest('.products');
        openModal(product);  // Open the modal with the product details
    });
});

// Search Logic
function searchProducts() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const products = document.querySelectorAll('.products');
    products.forEach(product => {
        const productName = product.querySelector('.name').textContent.toLowerCase();
        if (productName.includes(searchInput)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}
document.getElementById('search').addEventListener('input', searchProducts);
