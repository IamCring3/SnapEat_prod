// Navigation
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');
const searchInput = document.querySelector('.search-bar input');

// Initialize state
let currentOrders = [];
let currentProducts = [];
let currentUsers = [];

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const targetPage = item.dataset.page;
        
        // Update active states
        navItems.forEach(nav => nav.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));
        
        item.classList.add('active');
        document.getElementById(`${targetPage}-content`).classList.add('active');
        
        // Load data based on the active page
        loadPageData(targetPage);
    });
});

// Search functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const activePage = document.querySelector('.page.active').id.replace('-content', '');
    
    switch(activePage) {
        case 'orders':
            filterOrders(searchTerm);
            break;
        case 'products':
            filterProducts(searchTerm);
            break;
        case 'users':
            filterUsers(searchTerm);
            break;
    }
});

// Filter functions
function filterOrders(searchTerm) {
    const filteredOrders = currentOrders.filter(order => 
        order.id.toLowerCase().includes(searchTerm) ||
        order.customer.toLowerCase().includes(searchTerm) ||
        order.status.toLowerCase().includes(searchTerm)
    );
    renderOrders(filteredOrders);
}

function filterProducts(searchTerm) {
    const filteredProducts = currentProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.price.toString().includes(searchTerm)
    );
    renderProducts(filteredProducts);
}

function filterUsers(searchTerm) {
    const filteredUsers = currentUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.status.toLowerCase().includes(searchTerm)
    );
    renderUsers(filteredUsers);
}

// Data loading functions
async function loadPageData(page) {
    switch(page) {
        case 'dashboard':
            await loadDashboardStats();
            await loadRecentOrders();
            break;
        case 'orders':
            await loadOrders();
            break;
        case 'products':
            await loadProducts();
            break;
        case 'users':
            await loadUsers();
            break;
    }
}

// Dashboard functions
async function loadDashboardStats() {
    try {
        const response = await fetch('/api/dashboard/stats');
        const stats = await response.json();
        
        document.getElementById('total-orders').textContent = stats.totalOrders;
        document.getElementById('total-revenue').textContent = formatCurrency(stats.totalRevenue);
        document.getElementById('active-users').textContent = stats.activeUsers;
        document.getElementById('total-products').textContent = stats.totalProducts;
    } catch (error) {
        showNotification('Error loading dashboard stats', 'error');
    }
}

async function loadRecentOrders() {
    try {
        const response = await fetch('/api/orders/recent');
        const orders = await response.json();
        
        const tbody = document.querySelector('#recent-orders tbody');
        tbody.innerHTML = '';
        
        orders.forEach(order => {
            tbody.innerHTML += `
                <tr>
                    <td>#${order.id}</td>
                    <td>${order.customer}</td>
                    <td>${formatCurrency(order.amount)}</td>
                    <td><span class="status-${order.status.toLowerCase()}">${order.status}</span></td>
                </tr>
            `;
        });
    } catch (error) {
        showNotification('Error loading recent orders', 'error');
    }
}

// Orders functions
async function loadOrders() {
    try {
        const response = await fetch('/api/orders');
        currentOrders = await response.json();
        renderOrders(currentOrders);
    } catch (error) {
        showNotification('Error loading orders', 'error');
    }
}

function renderOrders(orders) {
    const tbody = document.querySelector('#orders-table tbody');
    tbody.innerHTML = '';
    
    orders.forEach(order => {
        tbody.innerHTML += `
            <tr>
                <td>#${order.id}</td>
                <td>${order.customer}</td>
                <td>${formatDate(order.date)}</td>
                <td>${formatCurrency(order.amount)}</td>
                <td><span class="status-${order.status.toLowerCase()}">${order.status}</span></td>
                <td>
                    <button onclick="updateOrderStatus('${order.id}')" class="btn-primary">
                        <span class="material-icons">edit</span>
                        Update Status
                    </button>
                </td>
            </tr>
        `;
    });
}

async function updateOrderStatus(orderId) {
    const newStatus = prompt('Enter new status (Completed, Processing, Pending):');
    if (!newStatus) return;
    
    try {
        // TODO: Implement actual API call
        const order = currentOrders.find(o => o.id === orderId);
        if (order) {
            order.status = newStatus;
            renderOrders(currentOrders);
            showNotification('Order status updated successfully', 'success');
        }
    } catch (error) {
        showNotification('Error updating order status', 'error');
    }
}

// Products functions
async function loadProducts() {
    try {
        const response = await fetch('/api/products');
        currentProducts = await response.json();
        renderProducts(currentProducts);
    } catch (error) {
        showNotification('Error loading products', 'error');
    }
}

function renderProducts(products) {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        productsGrid.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=Product+Image'">
                <div class="product-card-content">
                    <h3>${product.name}</h3>
                    <p class="price">${formatCurrency(product.price)}</p>
                    <p class="stock">Stock: ${product.stock}</p>
                    <div class="product-actions">
                        <button onclick="editProduct('${product.id}')" class="btn-primary">
                            <span class="material-icons">edit</span>
                            Edit
                        </button>
                        <button onclick="deleteProduct('${product.id}')" class="btn-danger">
                            <span class="material-icons">delete</span>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

async function editProduct(productId) {
    const product = currentProducts.find(p => p.id === productId);
    if (!product) return;
    
    // TODO: Implement edit modal
    showNotification('Edit product functionality coming soon', 'info');
}

async function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
        // TODO: Implement actual API call
        currentProducts = currentProducts.filter(p => p.id !== productId);
        renderProducts(currentProducts);
        showNotification('Product deleted successfully', 'success');
    } catch (error) {
        showNotification('Error deleting product', 'error');
    }
}

// Users functions
async function loadUsers() {
    try {
        const response = await fetch('/api/users');
        currentUsers = await response.json();
        renderUsers(currentUsers);
    } catch (error) {
        showNotification('Error loading users', 'error');
    }
}

function renderUsers(users) {
    const tbody = document.querySelector('#users-table tbody');
    tbody.innerHTML = '';
    
    users.forEach(user => {
        tbody.innerHTML += `
            <tr>
                <td>#${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${formatDate(user.joinedDate)}</td>
                <td><span class="status-${user.status.toLowerCase()}">${user.status}</span></td>
                <td>
                    <button onclick="editUser('${user.id}')" class="btn-primary">
                        <span class="material-icons">edit</span>
                        Edit
                    </button>
                </td>
            </tr>
        `;
    });
}

async function editUser(userId) {
    const user = currentUsers.find(u => u.id === userId);
    if (!user) return;
    
    // TODO: Implement edit modal
    showNotification('Edit user functionality coming soon', 'info');
}


function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="material-icons">${getNotificationIcon(type)}</span>
        <p>${message}</p>
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success':
            return 'check_circle';
        case 'error':
            return 'error';
        case 'warning':
            return 'warning';
        default:
            return 'info';
    }
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 20px;
        border-radius: 8px;
        background: white;
        box-shadow: var(--card-shadow);
        animation: slideIn 0.3s ease-out;
        z-index: 1000;
    }
    
    .notification p {
        margin: 0;
    }
    
    .notification-success {
        background: #dcfce7;
        color: #166534;
    }
    
    .notification-error {
        background: #fee2e2;
        color: #991b1b;
    }
    
    .notification-warning {
        background: #fef9c3;
        color: #854d0e;
    }
    
    .notification-info {
        background: #dbeafe;
        color: #1e40af;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Initialize dashboard
loadPageData('dashboard'); 