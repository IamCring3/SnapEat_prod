import express from 'express';
const router = express.Router();

// Mock database
let orders = [
    {
        id: '1001',
        customer: 'John Doe',
        date: '2024-03-15',
        amount: 24999,
        status: 'Completed'
    },
    {
        id: '1002',
        customer: 'Jane Smith',
        date: '2024-03-14',
        amount: 15999,
        status: 'Processing'
    },
    {
        id: '1003',
        customer: 'Bob Johnson',
        date: '2024-03-13',
        amount: 39999,
        status: 'Pending'
    }
];

let products = [
    {
        id: '1',
        name: 'Gaming Mouse',
        price: 4999,
        stock: 100,
        image: '/images/gaming-mouse.jpg'
    },
    {
        id: '2',
        name: 'Mechanical Keyboard',
        price: 9999,
        stock: 50,
        image: '/images/mechanical-keyboard.jpg'
    },
    {
        id: '3',
        name: 'Gaming Headset',
        price: 6999,
        stock: 75,
        image: '/images/gaming-headset.jpg'
    }
];

let users = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        joinedDate: '2024-01-15',
        status: 'Active'
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        joinedDate: '2024-02-01',
        status: 'Active'
    },
    {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        joinedDate: '2024-03-10',
        status: 'Inactive'
    }
];

// Get dashboard statistics
router.get('/api/dashboard/stats', async (req, res) => {
    try {
        const stats = {
            totalOrders: orders.length,
            totalRevenue: orders.reduce((sum, order) => sum + order.amount, 0),
            activeUsers: users.filter(user => user.status === 'Active').length,
            totalProducts: products.length
        };
        
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dashboard statistics' });
    }
});

// Get recent orders
router.get('/api/orders/recent', async (req, res) => {
    try {
        const recentOrders = orders
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);
        
        res.json(recentOrders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch recent orders' });
    }
});

// Get all orders
router.get('/api/orders', async (req, res) => {
    try {
        const sortedOrders = orders.sort((a, b) => new Date(b.date) - new Date(a.date));
        res.json(sortedOrders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// Update order status
router.put('/api/orders/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const order = orders.find(o => o.id === id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        order.status = status;
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update order status' });
    }
});

// Get all products
router.get('/api/products', async (req, res) => {
    try {
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Create new product
router.post('/api/products', async (req, res) => {
    try {
        const { name, price, stock, image } = req.body;
        const newProduct = {
            id: (products.length + 1).toString(),
            name,
            price,
            stock,
            image
        };
        
        products.push(newProduct);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product' });
    }
});

// Update product
router.put('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        
        const product = products.find(p => p.id === id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        Object.assign(product, updates);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// Delete product
router.delete('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const index = products.findIndex(p => p.id === id);
        
        if (index === -1) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        products.splice(index, 1);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

// Get all users
router.get('/api/users', async (req, res) => {
    try {
        const sortedUsers = users.sort((a, b) => new Date(b.joinedDate) - new Date(a.joinedDate));
        res.json(sortedUsers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Update user
router.put('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        
        const user = users.find(u => u.id === id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        Object.assign(user, updates);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

export default router; 