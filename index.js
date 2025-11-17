const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');

const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

// Session middleware for /customer routes
app.use("/customer", session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true
}));

// JWT authentication middleware for /customer/auth/*
app.use("/customer/auth/*", (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>
    if (!token) return res.status(401).json({ message: "Token missing" });

    jwt.verify(token, "secretkey", (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user; // attach user info to request
        next();
    });
});

// Mount routers
app.use("/customer", customer_routes); // Authenticated user routes
app.use("/", genl_routes);             // General user routes

// Test root route
app.get("/", (req, res) => {
    res.send("Welcome to the Online Book Review Application");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
