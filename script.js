const cartSidebar = document.getElementById("cartSidebar");
const openCartBtn = document.getElementById("openCart");
const closeCartBtn = document.getElementById("closeCart");
const cartOverlay = document.getElementById("cartOverlay");
const cartItemsSection = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

const cartItems = [
  {
    id: 1,
    name: "Helio Pet Device",
    originalPrice: 299.99,
    discountedPrice: 249.99,
    image: "./asset/product_main.png",
    quantity: 1,
    
  }
];

function openCart() {
  cartSidebar.classList.add("open");
  cartOverlay.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeCart() {
  cartSidebar.classList.remove("open");
  cartOverlay.style.display = "none";
  document.body.style.overflow = "auto";
}

function formatPrice(price) {
  return `$${price.toFixed(2)} `;
}

function updateCartTotal() {
  let total = 0;
  cartItems.forEach((item) => {
    total += item.discountedPrice * item.quantity;
  });
  cartTotal.textContent = formatPrice(total);
}

function renderCartItems() {
  cartItemsSection.innerHTML = "";

  cartItems.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.className = "cart-item";
    cartItemElement.dataset.id = item.id;

    cartItemElement.innerHTML = `
      <div class="item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="item-details">
        <div class="item-name">${item.name}</div>
        <div class="item-price">
          <span class="original-price">${formatPrice(item.originalPrice * item.quantity)}</span>
          <span class="discounted-price">${formatPrice(item.discountedPrice * item.quantity)}</span>
        </div>
        
        <div class="item-actions">
          <div class="quantity-selector">
            <button class="quantity-btn decrease-qty">−</button>
            <input type="number" class="quantity-value" value="${item.quantity}" min="1" max="99" readonly>
            <button class="quantity-btn increase-qty">+</button>
          </div>
       
        </div>
      </div>
    `;

    cartItemsSection.appendChild(cartItemElement);

    const decreaseBtn = cartItemElement.querySelector(".decrease-qty");
    const increaseBtn = cartItemElement.querySelector(".increase-qty");
    const inputQuantity = cartItemElement.querySelector(".quantity-value");
    const removeBtn = cartItemElement.querySelector(".remove-item");
    const orginalPrice = cartItemElement.querySelector(".original-price");
    const discountPrice = cartItemElement.querySelector(".discounted-price");

    decreaseBtn.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
        inputQuantity.value = item.quantity;
        orginalPrice.textContent = formatPrice(item.originalPrice * item.quantity);
        discountPrice.textContent = formatPrice(item.discountedPrice * item.quantity);
        updateCartTotal();
      }
    });

    increaseBtn.addEventListener("click", () => {
      item.quantity++;
      inputQuantity.value = item.quantity;
      orginalPrice.textContent = formatPrice(item.originalPrice * item.quantity);
      discountPrice.textContent = formatPrice(item.discountedPrice * item.quantity);
      updateCartTotal();
    });

    removeBtn.addEventListener("click", () => {
      const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);
      if (index !== -1) {
        cartItems.splice(index, 1);
        renderCartItems();
        updateCartTotal();
      }
    });
  });
}

openCartBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

renderCartItems();
updateCartTotal();
