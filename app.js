class StorageManager {
    static getUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    }

    static saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    static getCurrentUser() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    }

    static setCurrentUser(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    static clearCurrentUser() {
        localStorage.removeItem('currentUser');
    }

    static getCart() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }

    static saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    static clearCart() {
        localStorage.removeItem('cart');
    }
}

class AuthManager {
    static register(email, password, name) {
        const users = StorageManager.getUsers();

        if (users.find(u => u.email === email)) {
            return { success: false, message: 'User already exists' };
        }

        const user = {
            id: Date.now(),
            email,
            password,
            name,
            createdAt: new Date().toISOString()
        };

        users.push(user);
        StorageManager.saveUsers(users);

        return { success: true, message: 'Registration successful' };
    }

    static login(email, password) {
        const users = StorageManager.getUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            const userWithoutPassword = { ...user };
            delete userWithoutPassword.password;
            StorageManager.setCurrentUser(userWithoutPassword);
            return { success: true, user: userWithoutPassword };
        }

        return { success: false, message: 'Invalid credentials' };
    }

    static logout() {
        StorageManager.clearCurrentUser();
        StorageManager.clearCart();
    }

    static isLoggedIn() {
        return StorageManager.getCurrentUser() !== null;
    }

    static getCurrentUser() {
        return StorageManager.getCurrentUser();
    }
}

class CartManager {
    static addToCart(product, quantity = 1) {
        const cart = StorageManager.getCart();
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ ...product, quantity });
        }

        StorageManager.saveCart(cart);
        this.updateCartBadge();
        return cart;
    }

    static removeFromCart(productId) {
        let cart = StorageManager.getCart();
        cart = cart.filter(item => item.id !== productId);
        StorageManager.saveCart(cart);
        this.updateCartBadge();
        return cart;
    }

    static updateQuantity(productId, quantity) {
        const cart = StorageManager.getCart();
        const item = cart.find(item => item.id === productId);

        if (item) {
            if (quantity <= 0) {
                return this.removeFromCart(productId);
            }
            item.quantity = quantity;
            StorageManager.saveCart(cart);
            this.updateCartBadge();
        }

        return cart;
    }

    static getCart() {
        return StorageManager.getCart();
    }

    static getCartTotal() {
        const cart = StorageManager.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    static getCartCount() {
        const cart = StorageManager.getCart();
        return cart.reduce((count, item) => count + item.quantity, 0);
    }

    static updateCartBadge() {
        const badge = document.getElementById('cart-badge');
        const count = this.getCartCount();

        if (badge) {
            if (count > 0) {
                badge.textContent = count;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }
    }

    static clearCart() {
        StorageManager.clearCart();
        this.updateCartBadge();
    }
}

class UIManager {
    static showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    static updateAuthUI() {
        const user = AuthManager.getCurrentUser();
        const loginBtn = document.getElementById('login-btn');
        const userMenu = document.getElementById('user-menu');

        if (user) {
            loginBtn.classList.add('hidden');
            userMenu.classList.remove('hidden');
            document.getElementById('user-name').textContent = user.name || user.email;
        } else {
            loginBtn.classList.remove('hidden');
            userMenu.classList.add('hidden');
        }
    }

    static renderProducts(products, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = products.map(product => `
            <div class="product-card group" onclick="App.viewProduct(${product.id})">
                <div class="aspect-square w-full overflow-hidden rounded-lg bg-gray-800">
                    <img alt="${product.name}"
                         class="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
                         src="${product.image}"/>
                </div>
                <div class="mt-4">
                    <h3 class="text-base font-medium">${product.name}</h3>
                    <p class="text-sm text-gray-400">${product.description.substring(0, 50)}...</p>
                    <p class="mt-1 font-semibold">$${product.price.toFixed(2)} / ${product.unit}</p>
                </div>
            </div>
        `).join('');
    }

    static renderCategories() {
        const container = document.getElementById('categories-grid');
        if (!container) return;

        container.innerHTML = CATEGORIES.map(category => `
            <a class="group" href="#products?category=${encodeURIComponent(category.name)}">
                <div class="aspect-square w-full flex items-center justify-center bg-gray-800 rounded-lg overflow-hidden relative">
                    <img class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                         src="${category.image}"/>
                    <div class="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <h3 class="text-lg font-semibold">${category.name}</h3>
                    </div>
                </div>
            </a>
        `).join('');
    }

    static renderCart() {
        const cart = CartManager.getCart();
        const cartItems = document.getElementById('cart-items');
        const cartEmpty = document.getElementById('cart-empty');
        const cartSummary = document.getElementById('cart-summary');

        if (cart.length === 0) {
            cartEmpty.classList.remove('hidden');
            cartSummary.classList.add('hidden');
            cartItems.innerHTML = '';
            return;
        }

        cartEmpty.classList.add('hidden');
        cartSummary.classList.remove('hidden');

        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4 class="font-semibold">${item.name}</h4>
                    <p class="text-sm text-gray-400">$${item.price.toFixed(2)} / ${item.unit}</p>
                    <p class="text-sm font-semibold mt-1">$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="App.updateCartQuantity(${item.id}, ${item.quantity - 1})">
                            <span class="material-symbols-outlined">remove</span>
                        </button>
                        <span class="font-medium">${item.quantity}</span>
                        <button class="quantity-btn" onclick="App.updateCartQuantity(${item.id}, ${item.quantity + 1})">
                            <span class="material-symbols-outlined">add</span>
                        </button>
                    </div>
                    <button class="quantity-btn" onclick="App.removeFromCart(${item.id})">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </div>
            </div>
        `).join('');

        const total = CartManager.getCartTotal();
        document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
    }
}

class App {
    static init() {
        this.setupEventListeners();
        UIManager.updateAuthUI();
        CartManager.updateCartBadge();
        UIManager.renderCategories();
        this.loadHomePage();
        this.handleHashChange();
    }

    static setupEventListeners() {
        document.getElementById('login-form')?.addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('register-form')?.addEventListener('submit', (e) => this.handleRegister(e));
        document.getElementById('logout-btn')?.addEventListener('click', () => this.handleLogout());
        document.getElementById('search-input')?.addEventListener('input', (e) => this.handleSearch(e));
        document.getElementById('search-input-hero')?.addEventListener('input', (e) => this.handleSearch(e));
        document.getElementById('cart-btn')?.addEventListener('click', () => this.openCart());
        document.getElementById('user-menu-btn')?.addEventListener('click', () => this.toggleUserMenu());
        document.getElementById('checkout-btn')?.addEventListener('click', () => this.handleCheckout());

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.user-menu')) {
                document.getElementById('user-dropdown')?.classList.add('hidden');
            }
        });

        window.addEventListener('hashchange', () => this.handleHashChange());
    }

    static handleHashChange() {
        const hash = window.location.hash;

        if (hash.includes('#products')) {
            const params = new URLSearchParams(hash.split('?')[1]);
            const category = params.get('category');
            this.loadProductsPage(category);
        } else if (hash === '#categories') {
            this.loadCategoriesPage();
        }
    }

    static loadHomePage() {
        UIManager.renderProducts(PRODUCTS.slice(0, 8), 'featured-products');
    }

    static loadProductsPage(category = null) {
        let products = PRODUCTS;

        if (category) {
            products = PRODUCTS.filter(p => p.category === category);
        }

        const container = document.getElementById('all-products');
        if (container) {
            UIManager.renderProducts(products, 'all-products');
        }
    }

    static loadCategoriesPage() {
        UIManager.renderCategories();
    }

    static handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const result = AuthManager.login(email, password);

        if (result.success) {
            UIManager.showNotification('Login successful!');
            UIManager.updateAuthUI();
            window.location.hash = '#home';
        } else {
            UIManager.showNotification(result.message, 'error');
        }
    }

    static handleRegister(e) {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        const result = AuthManager.register(email, password, name);

        if (result.success) {
            UIManager.showNotification('Registration successful! Please login.');
            document.getElementById('show-login').click();
        } else {
            UIManager.showNotification(result.message, 'error');
        }
    }

    static handleLogout() {
        AuthManager.logout();
        UIManager.updateAuthUI();
        CartManager.updateCartBadge();
        UIManager.showNotification('Logged out successfully');
        window.location.hash = '#home';
    }

    static handleSearch(e) {
        const query = e.target.value.toLowerCase();

        if (query.length < 2) {
            this.loadHomePage();
            return;
        }

        const results = PRODUCTS.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );

        UIManager.renderProducts(results, 'featured-products');

        if (results.length === 0) {
            document.getElementById('featured-products').innerHTML =
                '<p class="text-center text-gray-400 col-span-full">No products found</p>';
        }
    }

    static viewProduct(productId) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return;

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="text-2xl font-bold">${product.name}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div class="space-y-4">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover rounded-lg">
                    <p class="text-gray-300">${product.description}</p>
                    <p class="text-2xl font-bold text-green-400">$${product.price.toFixed(2)} / ${product.unit}</p>
                    <p class="text-sm text-gray-400">Farmer: ${product.farmer}</p>
                    <div class="flex items-center gap-2">
                        <input type="number" id="product-quantity" value="1" min="1"
                               class="w-20 px-3 py-2 bg-gray-800 rounded-lg text-white">
                        <button onclick="App.addToCart(${product.id})"
                                class="flex-1 px-6 py-3 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    static addToCart(productId) {
        if (!AuthManager.isLoggedIn()) {
            UIManager.showNotification('Please login to add items to cart', 'error');
            window.location.hash = '#login';
            return;
        }

        const product = PRODUCTS.find(p => p.id === productId);
        const quantityInput = document.getElementById('product-quantity');
        const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

        CartManager.addToCart(product, quantity);
        UIManager.showNotification(`${product.name} added to cart!`);

        document.querySelector('.modal-overlay')?.remove();
    }

    static openCart() {
        if (!AuthManager.isLoggedIn()) {
            UIManager.showNotification('Please login to view cart', 'error');
            window.location.hash = '#login';
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'cart-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="text-2xl font-bold">Shopping Cart</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div id="cart-empty" class="cart-empty">
                    <span class="material-symbols-outlined" style="font-size: 64px;">shopping_cart</span>
                    <p class="mt-4">Your cart is empty</p>
                </div>
                <div id="cart-items"></div>
                <div id="cart-summary" class="cart-summary hidden">
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-xl font-bold">Total:</span>
                        <span id="cart-total" class="text-2xl font-bold text-green-400">$0.00</span>
                    </div>
                    <button id="checkout-btn"
                            class="w-full px-6 py-3 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        UIManager.renderCart();

        document.getElementById('checkout-btn')?.addEventListener('click', () => this.handleCheckout());

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    static updateCartQuantity(productId, quantity) {
        CartManager.updateQuantity(productId, quantity);
        UIManager.renderCart();
    }

    static removeFromCart(productId) {
        CartManager.removeFromCart(productId);
        UIManager.renderCart();
        UIManager.showNotification('Item removed from cart');
    }

    static toggleUserMenu() {
        const dropdown = document.getElementById('user-dropdown');
        dropdown.classList.toggle('hidden');
    }

    static handleCheckout() {
        const cart = CartManager.getCart();
        if (cart.length === 0) return;

        UIManager.showNotification('Order placed successfully!');
        CartManager.clearCart();
        UIManager.renderCart();

        setTimeout(() => {
            document.querySelector('.modal-overlay')?.remove();
        }, 1000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
