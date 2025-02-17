const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "admin"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to the database');
});


app.post('/', (req, res) => {
    const sql = "SELECT * FROM users WHERE `email` = ? AND `password` = ?";
    const values = [req.body.email, req.body.password];
    db.query(sql, values, (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    const sql = "SELECT * FROM users WHERE id = ?";
    const values = [userId];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error fetching user details:', err);
            return res.json({ error: 'Error fetching user details' });
        }
        if (data.length === 0) {
            return res.json({ error: 'User not found' });
        }
        return res.json(data[0]);
    });
});

app.get('/menu', (req, res) => {
    const sql = "SELECT * FROM products";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.json({ error: 'An error occurred while fetching products' });
        }
        return res.json(data);
    });
});


app.get('/menu/:id', (req, res) => {
    const sql = "SELECT * FROM products WHERE id = ?";
    const values = [req.params.id];
    db.query(sql, values, (err, data) => {
        if (err) return res.json({ error: 'Error fetching product details' });
        return res.json(data[0]);
    });
});

  app.delete('/menu/:id', (req, res) => {
    const productId = req.params.id;
    const sql = "DELETE FROM products WHERE id = ?";
    db.query(sql, [productId], (err, result) => {
        if (err) {
            console.error('Error deleting menu item:', err);
            return res.status(500).json({ error: 'Error deleting menu item' });
        }
        res.status(200).json({ message: 'Menu item deleted successfully' });
    });
});

app.post('/menu/:id/comment', (req, res) => {
    const { comment, userId, rating } = req.body;
    const productId = req.params.id;
    const sql = "INSERT INTO comments (product_id, user_id, comment, rating) VALUES (?, ?, ?, ?)";
    const values = [productId, userId, comment, rating];
    
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error posting comment:', err);
            return res.status(500).json({ error: 'Error posting comment' });
        }
        return res.status(201).json({ success: true, commentId: data.insertId });
    });
});


app.get('/menu/:id/comments', (req, res) => {
    const productId = req.params.id;
    const sql = "SELECT users.username, comments.comment, comments.rating FROM comments JOIN users ON comments.user_id = users.id WHERE comments.product_id = ?";
    
    db.query(sql, [productId], (err, results) => {
        if (err) {
            console.error('Error fetching comments:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json(results);
    });
});


app.post('/menu/add', (req, res) => {
    const { id, name, price, img, category, description } = req.body;
    const sql = "INSERT INTO products (id, name, price, img, category, description) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [id, name, price, img, category, description];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error adding product:', err);
            return res.status(500).json({ error: 'Error adding product' });
        }
        res.status(200).json({ message: 'Product added successfully', productId: result.insertId });
    });
});

app.post('/menu/:id/order', (req, res) => {
    const { userId, quantity } = req.body;
    const productId = req.params.id;
    const sql = "INSERT INTO orders (product_id, user_id, quantity) VALUES (?, ?, ?)";
    const values = [productId, userId, quantity];
    db.query(sql, values, (err, data) => {
        if (err) return res.json({ error: 'Error placing order' });
        return res.json({ success: true, orderId: data.insertId });
    });
});

app.post('/feedback', (req, res) => {
    const { name, email, phoneNumber, feedback } = req.body;
    const query = `INSERT INTO feedback (name, email, phone_number, feedback) VALUES (?, ?, ?, ?)`;
    db.query(query, [name, email, phoneNumber, feedback], (err, result) => {
        if (err) {
            console.error('Error inserting feedback:', err);
            res.status(500).json({ message: 'Error submitting feedback' });
            return;
        }
        res.status(200).json({ message: 'Feedback submitted successfully' });
    });
});

app.get('/api/feedback', (req, res) => {
    const query = 'SELECT * FROM feedback';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching feedback data:', err);
            res.status(500).json({ message: 'Error fetching feedback data' });
            return;
        }
        res.json(results);
    });
});

app.delete('/menu/comments/:commentId', (req, res) => {
    const commentId = req.params.commentId;
    const sql = "DELETE FROM comments WHERE id = ?";
    db.query(sql, [commentId], (err, result) => {
        if (err) {
            console.error('Error deleting comment:', err);
            return res.status(500).json({ error: 'Error deleting comment' });
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
    });
});


app.post('/api/track-page-view', (req, res) => {
    const { path } = req.body;
    const sql = "INSERT INTO page_views (path) VALUES (?)";
    const values = [path];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error tracking page view:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.status(200).send('Page view tracked');
    });
});

app.get('/api/page-views', (req, res) => {
    const sql = "SELECT path, COUNT(*) as count FROM page_views GROUP BY path";
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving page views:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.status(200).json(results);
    });
});

app.get('/comments', (req, res) => {
    const sql = `
        SELECT 
            comments.id, 
            users.username, 
            products.name as product_name, 
            comments.comment 
        FROM comments 
        JOIN users ON comments.user_id = users.id 
        JOIN products ON comments.product_id = products.id
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching comments:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.status(200).json(results);
    });
});

app.delete('/comments/:commentId', (req, res) => {
    const commentId = req.params.commentId;
    const sql = "DELETE FROM comments WHERE id = ?";
    db.query(sql, [commentId], (err, result) => {
        if (err) {
            console.error('Error deleting comment:', err);
            return res.status(500).json({ error: 'Error deleting comment' });
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
