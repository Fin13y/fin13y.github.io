// Shopping Basket Functionality for Abundance Seedlings
// Pre-order system with email checkout

class ShoppingBasket {
  constructor() {
    this.items = this.loadBasket();
    this.updateBasketDisplay();
  }

  // Load basket from localStorage
  loadBasket() {
    const saved = localStorage.getItem('abundanceBasket');
    return saved ? JSON.parse(saved) : [];
  }

  // Save basket to localStorage
  saveBasket() {
    localStorage.setItem('abundanceBasket', JSON.stringify(this.items));
    this.updateBasketDisplay();
  }

  // Add item to basket
  addItem(id, name, price, quantity = 1) {
    const existingItem = this.items.find(item => item.id === id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({
        id,
        name,
        price,
        quantity
      });
    }

    this.saveBasket();
    this.showNotification(`Added ${name} to basket!`);
  }

  // Remove item from basket
  removeItem(id) {
    this.items = this.items.filter(item => item.id !== id);
    this.saveBasket();
  }

  // Update item quantity
  updateQuantity(id, quantity) {
    const item = this.items.find(item => item.id === id);
    if (item) {
      item.quantity = Math.max(1, parseInt(quantity));
      this.saveBasket();
    }
  }

  // Get total price
  getTotal() {
    return this.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  // Get total items count
  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  // Update basket display in header
  updateBasketDisplay() {
    const basketLinks = document.querySelectorAll('.basket-link');
    const count = this.getItemCount();

    basketLinks.forEach(link => {
      const badge = link.querySelector('.cart-count');
      if (count > 0) {
        if (!badge) {
          const newBadge = document.createElement('span');
          newBadge.className = 'cart-count';
          newBadge.textContent = count;
          link.appendChild(newBadge);
        } else {
          badge.textContent = count;
        }
      } else if (badge) {
        badge.remove();
      }
    });

    // Update basket page if we're on it
    if (document.getElementById('basket-items')) {
      this.renderBasketPage();
    }
  }

  // Render basket page
  renderBasketPage() {
    const container = document.getElementById('basket-items');
    const totalElement = document.getElementById('basket-total');
    const checkoutSection = document.getElementById('checkout-section');

    if (!container) return;

    if (this.items.length === 0) {
      container.innerHTML = `
        <div class="card" style="text-align: center; padding: var(--space-xxl);">
          <h3>Your basket is empty</h3>
          <p>Browse our selection and add some seedlings to get started!</p>
          <a href="store.html" class="btn btn-primary" style="margin-top: var(--space-md);">Browse Seedlings</a>
        </div>
      `;
      if (checkoutSection) checkoutSection.style.display = 'none';
      return;
    }

    if (checkoutSection) checkoutSection.style.display = 'block';

    container.innerHTML = this.items.map(item => `
      <div class="basket-item">
        <div style="flex: 1;">
          <h4 style="margin-bottom: 0.5rem;">${item.name}</h4>
          <p style="color: var(--color-text-light); margin: 0;">£${item.price.toFixed(2)} each</p>
        </div>
        <div style="display: flex; align-items: center; gap: var(--space-md);">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <label for="qty-${item.id}" class="visually-hidden">Quantity</label>
            <input
              type="number"
              id="qty-${item.id}"
              min="1"
              value="${item.quantity}"
              onchange="basket.updateQuantity('${item.id}', this.value)"
              style="width: 70px; text-align: center;"
            >
          </div>
          <div style="font-weight: 700; min-width: 70px; text-align: right;">
            £${(item.price * item.quantity).toFixed(2)}
          </div>
          <button
            onclick="basket.removeItem('${item.id}')"
            class="btn btn-secondary"
            style="min-width: auto; padding: 0.5rem 1rem;"
            aria-label="Remove ${item.name}"
          >
            Remove
          </button>
        </div>
      </div>
    `).join('');

    if (totalElement) {
      totalElement.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>Total:</span>
          <span style="font-size: 1.5rem;">£${this.getTotal().toFixed(2)}</span>
        </div>
      `;
    }
  }

  // Show notification
  showNotification(message) {
    // Remove existing notification
    const existing = document.querySelector('.basket-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'basket-notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: linear-gradient(135deg, var(--color-accent), var(--color-accent-light));
      color: white;
      padding: 1rem 1.5rem;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-xl);
      z-index: 1000;
      animation: slideInRight 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Handle checkout
  checkout(formData) {
    const total = this.getTotal();
    const itemsList = this.items.map(item =>
      `${item.quantity}x ${item.name} @ £${item.price.toFixed(2)}`
    ).join(', ');

    // In a real application, this would send to a backend
    console.log('Pre-order submitted:', {
      email: formData.email,
      name: formData.name,
      items: this.items,
      total: total
    });

    // Show success message
    const checkoutSection = document.getElementById('checkout-section');
    if (checkoutSection) {
      checkoutSection.innerHTML = `
        <div class="card" style="text-align: center; padding: var(--space-xxl); background: linear-gradient(135deg, var(--color-accent), var(--color-accent-light)); color: white;">
          <h2 style="color: white;">Pre-Order Received! 🎉</h2>
          <p style="font-size: 1.2rem; margin: var(--space-lg) 0;">
            Thank you, ${formData.name}! We've received your pre-order for £${total.toFixed(2)}.
          </p>
          <p style="font-size: 1.1rem;">
            A confirmation email has been sent to <strong>${formData.email}</strong> with details about collection or delivery.
          </p>
          <p style="margin-top: var(--space-lg);">
            Order summary: ${itemsList}
          </p>
          <a href="store.html" class="btn btn-secondary" style="margin-top: var(--space-lg); background: white; color: var(--color-primary);">
            Continue Shopping
          </a>
        </div>
      `;

      // Clear the basket
      this.items = [];
      this.saveBasket();
    }
  }
}

// Initialize basket
const basket = new ShoppingBasket();

// Add checkout form handler
document.addEventListener('DOMContentLoaded', () => {
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = {
        name: document.getElementById('checkout-name').value,
        email: document.getElementById('checkout-email').value
      };
      basket.checkout(formData);
    });
  }

  // Initialize basket page if we're on it
  if (document.getElementById('basket-items')) {
    basket.renderBasketPage();
  }
});

// Add fadeOut animation to CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeOut {
    from { opacity: 1; transform: translateX(0); }
    to { opacity: 0; transform: translateX(20px); }
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;
document.head.appendChild(style);
